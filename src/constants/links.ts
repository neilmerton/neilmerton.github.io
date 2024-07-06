import { ICON_PATHS } from "./icons";
import { SITE_TITLE } from "./site";

export type SocialLink = {
  description: string;
  href: string;
  icon: keyof typeof ICON_PATHS;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    description: `Follow ${SITE_TITLE} on last.fm`,
    href: "https://www.last.fm/user/botboi",
    icon: "lastFm",
  },
  {
    description: `Follow ${SITE_TITLE} on Mastodon`,
    href: "https://mas.to/@neilmerton",
    icon: "mastodon",
  },
  {
    description: `Go to ${SITE_TITLE}'s GitHub profile`,
    href: "https://github.com/neilmerton",
    icon: "github",
  },
  {
    description: `Go to ${SITE_TITLE}'s LinkedIn profile`,
    href: "https://linkedin.com/in/neilmerton",
    icon: "linkedIn",
  },
];
