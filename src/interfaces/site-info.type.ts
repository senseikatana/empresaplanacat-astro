import type { Locale } from "./common";

export interface SiteInfoProps {
	title: string;
	description?: string;
	lang?: Locale;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogType?: string;
	canonicalUrl?: string;
	author?: string;
	keywords?: string[];
	themeColor?: string;
}
