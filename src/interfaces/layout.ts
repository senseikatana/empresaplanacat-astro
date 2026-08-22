import type { Locale } from "./common";

export interface MetatagsProps {
	title: string;
	lang?: Locale | string;
	bodyClass?: string;
	description?: string;
	author?: string;
	keywords?: string[];
	themeColor?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogType?: string;
	canonicalUrl?: string;
}
