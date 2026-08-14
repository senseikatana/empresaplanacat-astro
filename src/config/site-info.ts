export interface SiteInfoProps {
  title: string;
  description?: string;
}

const SITE_INFO = {
  title: "",
  description: "",
} satisfies SiteInfoProps;

export const { title = "", description = "" } = SITE_INFO;
