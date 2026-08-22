import type { About } from "./about";
import type { BusTracking } from "./bus-tracking";
import type { Common, Locale } from "./common";
import type { Discretionary } from "./discretionary";
import type { Home } from "./home";
import type { HomeVariant1, HomeVariant2 } from "./booking";
import type { Legal } from "./legal";
import type { Locations, LocationsMobile } from "./locations";
import type { MobileApp } from "./mobile-app";
import type { Routes } from "./routes";
export interface I18nDictionary {
	common: Common;
	home: Home;
	routes: Routes;
	mobileApp: MobileApp;
	locations: Locations;
	homeVariant1: HomeVariant1;
	locationsMobile: LocationsMobile;
	homeVariant2: HomeVariant2;
	discretionary: Discretionary;
	about: About;
	legal: Legal;
	busTracking: BusTracking;
}
export interface LocalizedPageProps {
	locale: Locale;
}
export interface DictionaryProps {
	dict: I18nDictionary;
}
