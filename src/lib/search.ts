import { asc } from "drizzle-orm";
import { lines, schedules } from "../../db/schema";
import { db } from "./db";

export interface Stop {
	town: string;
	name: string;
	time: string;
	lat: number | null;
	lon: number | null;
}

export interface Departure {
	departureTime: string;
	arrivalTime: string;
}

export interface LineSummary {
	id: number;
	name: string;
	pdfUrl: string;
	origin: string;
	destination: string;
	stops: Stop[];
	departures: Departure[];
	departureCount: number;
	firstDeparture: string;
	lastDeparture: string;
}

export interface TransferOption {
	hub: string;
	firstLeg: LineSummary;
	secondLeg: LineSummary;
}

export interface SearchResults {
	direct: LineSummary[];
	transfers: TransferOption[];
}

const MAX_DEPARTURES_SHOWN = 24;
const MAX_DEPARTURES_PER_LEG = 6;
const MAX_TRANSFERS = 6;

function normalize(value: string): string {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

interface LoadedSchedule {
	lineId: number;
	stops: Stop[];
}

function matchLeg(stops: Stop[], normOrigin: string, normDest: string) {
	const idxO = stops.findIndex((stop) => normalize(stop.town) === normOrigin);
	if (idxO === -1) return null;
	const idxD = stops.findIndex((stop, i) => i > idxO && normalize(stop.town) === normDest);
	if (idxD === -1) return null;
	return { idxO, idxD };
}

function buildSummary(
	lineId: number,
	lineName: string,
	pdfUrl: string,
	origin: string,
	destination: string,
	stops: Stop[],
	departures: Departure[],
	cap: number,
): LineSummary {
	const sorted = [...departures].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
	const shown = sorted.slice(0, cap);
	return {
		id: lineId,
		name: lineName,
		pdfUrl,
		origin,
		destination,
		stops,
		departures: shown,
		departureCount: sorted.length,
		firstDeparture: sorted[0]?.departureTime ?? "",
		lastDeparture: sorted[sorted.length - 1]?.departureTime ?? "",
	};
}

export async function searchRoutes(origin: string, destination: string, withTransfers = false): Promise<SearchResults> {
	const normOrigin = normalize(origin);
	const normDest = normalize(destination);

	const lineInfo = new Map<number, { name: string; pdfUrl: string }>();
	for (const row of await db.select({ id: lines.id, name: lines.name, pdfUrl: lines.pdfUrl }).from(lines)) {
		lineInfo.set(row.id, { name: row.name, pdfUrl: row.pdfUrl });
	}

	const rows = await db.select().from(schedules).orderBy(asc(schedules.departureTime));
	const loaded: LoadedSchedule[] = rows.map((row) => ({
		lineId: row.lineId,
		stops: JSON.parse(row.stopsJson) as Stop[],
	}));

	const directMap = new Map<number, LineSummary>();
	for (const schedule of loaded) {
		const match = matchLeg(schedule.stops, normOrigin, normDest);
		if (!match) continue;
		const dep = schedule.stops[match.idxO].time;
		const arr = schedule.stops[match.idxD].time;
		const existing = directMap.get(schedule.lineId);
		if (existing) {
			existing.departures.push({ departureTime: dep, arrivalTime: arr });
		} else {
			const info = lineInfo.get(schedule.lineId);
			directMap.set(
				schedule.lineId,
				buildSummary(
					schedule.lineId,
					info?.name ?? `Línea ${schedule.lineId}`,
					info?.pdfUrl ?? "",
					origin,
					destination,
					schedule.stops.slice(match.idxO, match.idxD + 1),
					[{ departureTime: dep, arrivalTime: arr }],
					MAX_DEPARTURES_SHOWN,
				),
			);
		}
	}
	for (const summary of directMap.values()) {
		summary.departures = [...summary.departures]
			.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
			.slice(0, MAX_DEPARTURES_SHOWN);
	}
	const direct = [...directMap.values()].sort((a, b) => a.name.localeCompare(b.name, "es"));

	const transfers: TransferOption[] = [];
	if (withTransfers && normOrigin !== normDest) {
		const townOriginal = new Map<string, string>();
		for (const schedule of loaded) {
			for (const stop of schedule.stops) {
				const norm = normalize(stop.town);
				if (!townOriginal.has(norm)) townOriginal.set(norm, stop.town);
			}
		}

		const hubsFromOrigin = new Map<string, { schedule: LoadedSchedule; idxO: number }[]>();
		const hubsToDestination = new Map<string, { schedule: LoadedSchedule; idxD: number }[]>();

		for (const schedule of loaded) {
			if (matchLeg(schedule.stops, normOrigin, normDest)) continue;
			const idxO = schedule.stops.findIndex((stop) => normalize(stop.town) === normOrigin);
			if (idxO !== -1) {
				const hubs = [...new Set(schedule.stops.slice(idxO + 1).map((stop) => normalize(stop.town)))];
				for (const hub of hubs) {
					const list = hubsFromOrigin.get(hub) ?? [];
					list.push({ schedule, idxO });
					hubsFromOrigin.set(hub, list);
				}
			}
			const idxD = schedule.stops.findIndex((stop) => normalize(stop.town) === normDest);
			if (idxD !== -1) {
				const hubs = [...new Set(schedule.stops.slice(0, idxD).map((stop) => normalize(stop.town)))];
				for (const hub of hubs) {
					const list = hubsToDestination.get(hub) ?? [];
					list.push({ schedule, idxD });
					hubsToDestination.set(hub, list);
				}
			}
		}

		for (const [hub, fromList] of hubsFromOrigin) {
			const toList = hubsToDestination.get(hub);
			if (!toList || transfers.length >= MAX_TRANSFERS) continue;
			const legA = fromList[0];
			const legB = toList[0];
			const infoA = lineInfo.get(legA.schedule.lineId);
			const infoB = lineInfo.get(legB.schedule.lineId);
			const hubIdxA = legA.schedule.stops.findIndex((stop, i) => i > legA.idxO && normalize(stop.town) === hub);
			const hubIdxB = legB.schedule.stops.findIndex((stop, i) => i < legB.idxD && normalize(stop.town) === hub);
			if (hubIdxA === -1 || hubIdxB === -1) continue;
			const hubDisplay = townOriginal.get(hub) ?? hub;
			const legADepartures = legA.schedule.stops.slice(legA.idxO, hubIdxA + 1);
			const legBDepartures = legB.schedule.stops.slice(hubIdxB, legB.idxD + 1);
			transfers.push({
				hub: hubDisplay,
				firstLeg: buildSummary(
					legA.schedule.lineId,
					infoA?.name ?? `Línea ${legA.schedule.lineId}`,
					infoA?.pdfUrl ?? "",
					origin,
					hubDisplay,
					legADepartures,
					[{ departureTime: legADepartures[0].time, arrivalTime: legADepartures[legADepartures.length - 1].time }],
					MAX_DEPARTURES_PER_LEG,
				),
				secondLeg: buildSummary(
					legB.schedule.lineId,
					infoB?.name ?? `Línea ${legB.schedule.lineId}`,
					infoB?.pdfUrl ?? "",
					hubDisplay,
					destination,
					legBDepartures,
					[{ departureTime: legBDepartures[0].time, arrivalTime: legBDepartures[legBDepartures.length - 1].time }],
					MAX_DEPARTURES_PER_LEG,
				),
			});
		}
	}

	return { direct, transfers };
}
