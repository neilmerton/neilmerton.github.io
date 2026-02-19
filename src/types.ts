type TechItemCategory = 'language' | 'framework' | 'tool' | 'platform' | 'other';
type TechItemProficiency = 'expert' | 'proficient' | 'familiar';

export interface TechItem {
  category: TechItemCategory;
  iconUrl?: string;
  name: string;
  proficiency: TechItemProficiency;
}

export interface UsesItem {
  description: string;
  title: string;
}

export interface UsesItemWithHref extends UsesItem {
  href: string;
}

export interface Role {
  company: string;
  companyUrl?: string;
  description: string;
  endDate?: string;        // undefined = current role
  highlights: string[];
  location: string;
  startDate: string;       // ISO date string, e.g. "2021-03"
  technologies: string[];
  title: string;
}

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'mastodon'
  | 'bluesky'
  | 'instagram'
  | 'youtube'
  | 'twitch'
  | 'dribbble'
  | 'codepen'
  | 'dev.to'
  | 'hashnode'
  | 'other';

export interface SocialLink {
  label: string;
  platform: SocialPlatform;
  url: string;
}

export interface SiteConfig {
  description: string;
  email: string;
  fediverseHandle?: string; // e.g. "@neilmerton@mas.to"
  name: string;
  openGraphImage?: string;
  socials: SocialLink[];
  title: string;
  url: string;
}

export interface NavItem {
  href: string;
  label: string;
}
