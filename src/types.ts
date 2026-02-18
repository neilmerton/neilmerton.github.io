// ─── Technology Stack ────────────────────────────────────────────────────────

export interface TechItem {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'platform' | 'other';
  proficiency: 'expert' | 'proficient' | 'familiar';
  iconUrl?: string;
}

// ─── Work Experience ─────────────────────────────────────────────────────────

export interface Role {
  title: string;
  company: string;
  companyUrl?: string;
  startDate: string;       // ISO date string, e.g. "2021-03"
  endDate?: string;        // undefined = current role
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

// ─── Contact / Social ────────────────────────────────────────────────────────

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
  platform: SocialPlatform;
  url: string;
  label: string;
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  fediverseHandle?: string; // e.g. "@neilmerton@mas.to"
  url: string;
  email: string;
  socials: SocialLink[];
  openGraphImage?: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}
