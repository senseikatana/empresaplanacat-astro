import { BusRoute, RouteStop, CompanyAnnouncement, BusNode } from '../types';

export const INITIAL_ROUTES: BusRoute[] = [
  {
    id: 'r-45-1',
    number: 'Route 45',
    origin: 'Girona',
    destination: 'Aeroport',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'On Time',
    price: 6.50
  },
  {
    id: 'r-45-2',
    number: 'Route 45',
    origin: 'Barcelona',
    destination: 'Tarragona',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'On Time',
    price: 9.80
  },
  {
    id: 'r-23',
    number: 'Route 23',
    origin: 'Girona',
    destination: 'Tarragona',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'Delayed',
    delayMinutes: 12,
    price: 11.20
  },
  {
    id: 'r-22',
    number: 'Route 22',
    origin: 'Girona',
    destination: 'Tarragona',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'On Time',
    price: 11.20
  },
  {
    id: 'r-88',
    number: 'Route 88',
    origin: 'Girona',
    destination: 'Tarragona',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'On Time',
    price: 10.50
  },
  {
    id: 'r-30',
    number: 'Route 30',
    origin: 'Prante',
    destination: 'Girona',
    departureTime: '10:28 AM',
    arrivalTime: '11:15 AM',
    duration: '47 min',
    status: 'On Time',
    price: 5.40
  },
  {
    id: 'r-12a',
    number: 'Route 12A',
    origin: 'Plaza España',
    destination: 'Estación Sur',
    departureTime: '14:30 PM',
    arrivalTime: '18:00 PM',
    duration: '3h 30m',
    status: 'On Time',
    price: 14.00
  }
];

export const CAMBRILS_ROUTE_STOPS: RouteStop[] = [
  { id: 's1', name: "Cambrils - Passeig d'Albert I, 16-21 (Palmarq. Mercadillo)", time: '06:50', isMainStation: true },
  { id: 's2', name: "Cambrils - Cambrils estació d'autobusos", time: '06:55', isMainStation: true },
  { id: 's3', name: "Cambrils - Av. Països Catalans (marq. passada Pl.Creu)", time: '06:56' },
  { id: 's4', name: "Cambrils - Av. Països Catalans (Ajuntament)", time: '06:56' },
  { id: 's5', name: "Cambrils - Av. Adelaida (marquesina- darrera Pavelló)", time: '06:57' },
  { id: 's6', name: "Cambrils - N-340 Càmping Capfun Mirmanda, Km 1145,5 (antic Àmfora)", time: '06:58' },
  { id: 's7', name: "Cambrils - Av. Vilafortuny, 88 (Urb. Els Tallats)", time: '07:02' },
  { id: 's8', name: "Cambrils - Av. Vilafortuny (divertipark)", time: '07:06' },
  { id: 's9', name: "Cambrils - N-340 (pal parada Mas Gallau)", time: '07:07' },
  { id: 's10', name: "Salou - Estació d'Autobusos", time: '07:15', isMainStation: true },
  { id: 's11', name: "Tarragona - Estació d'Autobusos Central", time: '07:35', isMainStation: true }
];

export const COMPANY_ANNOUNCEMENTS: CompanyAnnouncement[] = [
  { id: 'a1', title: 'Recordatorio de Seguridad Vial', date: '24 Oct', content: 'Uso obligatorio del cinturón de seguridad y revisiones antes de cada turno.' },
  { id: 'a2', title: 'Actualización de Rutas Nocturnas', date: '22 Oct', content: 'Nuevas paradas añadidas en el trayecto Salou - Tarragona durante el fin de semana.' },
  { id: 'a3', title: 'Nuevo Uniforme Disponible', date: '20 Oct', content: 'Pasa por las oficinas centrales de Empresa Plana para recoger las prendas de invierno.' }
];

export const FLEET_MAP_NODES: BusNode[] = [
  { id: 'b1', label: 'B-45', route: 'Route 45', top: '18%', left: '22%', status: 'active', capacityPct: 70 },
  { id: 'b2', label: 'B-102', route: 'Route 22', top: '32%', left: '55%', status: 'warning', capacityPct: 95 },
  { id: 'b3', label: 'B-6', route: 'Route 6', top: '42%', left: '48%', status: 'active', capacityPct: 45 },
  { id: 'b4', label: 'B-32', route: 'Route 32', top: '25%', left: '60%', status: 'active', capacityPct: 60 },
  { id: 'b5', label: 'B-93', route: 'Route 93', top: '48%', left: '62%', status: 'active', capacityPct: 30 },
  { id: 'b6', label: 'B-102', route: 'Route 102', top: '46%', left: '72%', status: 'active', capacityPct: 80 },
  { id: 'b7', label: 'B-88', route: 'Route 88', top: '78%', left: '38%', status: 'active', capacityPct: 55 },
  { id: 'b8', label: 'B-78', route: 'Route 78', top: '65%', left: '12%', status: 'active', capacityPct: 40 },
  { id: 'b9', label: 'B-45', route: 'Route 45', top: '22%', left: '80%', status: 'delayed', capacityPct: 88 }
];
