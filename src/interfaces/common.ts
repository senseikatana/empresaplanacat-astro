export type Locale =
	| "ca"
	| "es"
	| "en"
	| "fr"
	| "de"
	| "it"
	| "pt"
	| "nl"
	| "sv"
	| "no"
	| "da"
	| "fi"
	| "pl"
	| "cs"
	| "sk"
	| "hu"
	| "ro"
	| "bg"
	| "el"
	| "tr"
	| "ru"
	| "uk"
	| "ar"
	| "he"
	| "ja"
	| "ko"
	| "zh-CN"
	| "zh-TW";
export interface CommonNav {
	services: string;
	locations: string;
	downloads: string;
	contact: string;
	bookNow: string;
}
export interface CommonLang {
	ca: string;
	es: string;
	en: string;
}
export interface CommonFooter {
	privacy: string;
	terms: string;
	cookies: string;
	contact: string;
	fleet: string;
	sitemap: string;
	copyright: string;
}
export interface Common {
	brand: string;
	nav: CommonNav;
	lang: CommonLang;
	phone: string;
	footer: CommonFooter;
}
