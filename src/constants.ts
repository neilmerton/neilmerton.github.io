// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const ICON_PATHS = {
  about: `<path fill="currentColor" d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z"/><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z"/>`,
  experience: `<path fill="currentColor" d="M25.798 10a10 10 0 0 0-19.62.124A7.496 7.496 0 0 0 7.5 25H8v-2h-.5a5.496 5.496 0 0 1-.377-10.98l.837-.057l.09-.833A7.993 7.993 0 0 1 23.737 10Z"/><path fill="currentColor" d="M28 12H18a2.002 2.002 0 0 0-2 2v4h-4a2.002 2.002 0 0 0-2 2v10h20V14a2.002 2.002 0 0 0-2-2ZM12 28v-8h4v8Zm16 0H18V14h10Z"/><path fill="currentColor" d="M20 16h2v4h-2zm4 0h2v4h-2zm-4 6h2v4h-2zm4 0h2v4h-2z"/>`,
  github: `<path fill="currentColor" d="M16 .396c-8.839 0-16 7.167-16 16c0 7.073 4.584 13.068 10.937 15.183c.803.151 1.093-.344 1.093-.772c0-.38-.009-1.385-.015-2.719c-4.453.964-5.391-2.151-5.391-2.151c-.729-1.844-1.781-2.339-1.781-2.339c-1.448-.989.115-.968.115-.968c1.604.109 2.448 1.645 2.448 1.645c1.427 2.448 3.744 1.74 4.661 1.328c.14-1.031.557-1.74 1.011-2.135c-3.552-.401-7.287-1.776-7.287-7.907c0-1.751.62-3.177 1.645-4.297c-.177-.401-.719-2.031.141-4.235c0 0 1.339-.427 4.4 1.641a15.436 15.436 0 0 1 4-.541c1.36.009 2.719.187 4 .541c3.043-2.068 4.381-1.641 4.381-1.641c.859 2.204.317 3.833.161 4.235c1.015 1.12 1.635 2.547 1.635 4.297c0 6.145-3.74 7.5-7.296 7.891c.556.479 1.077 1.464 1.077 2.959c0 2.14-.02 3.864-.02 4.385c0 .416.28.916 1.104.755c6.4-2.093 10.979-8.093 10.979-15.156c0-8.833-7.161-16-16-16z"/>`,
  home: `<path fill="currentColor" d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z"/>`,
  mastodon: `<path fill="currentColor" d="M30.921 10.505c0-6.943-4.547-8.975-4.547-8.975C24.082.473 20.145.03 16.051-.001h-.099C11.863.03 7.925.472 5.635 1.53c0 0-4.553 2.032-4.553 8.975c0 1.588-.031 3.489.021 5.505c.167 6.792 1.245 13.479 7.521 15.14c2.896.767 5.38.928 7.38.819c3.631-.204 5.667-1.297 5.667-1.297l-.12-2.636s-2.593.819-5.505.719c-2.885-.099-5.932-.307-6.396-3.853a7.018 7.018 0 0 1-.067-.995s2.832.692 6.427.859c2.192.099 4.249-.129 6.344-.38c4.005-.473 7.5-2.948 7.937-5.203c.687-3.552.629-8.677.629-8.677zm-5.364 8.948h-3.328v-8.161c0-1.719-.724-2.595-2.172-2.595c-1.599 0-2.401 1.037-2.401 3.084v4.469h-3.312v-4.469c0-2.047-.803-3.084-2.401-3.084c-1.448 0-2.172.876-2.172 2.595v8.156H6.443v-8.401c0-1.719.437-3.083 1.317-4.093c.907-1.011 2.089-1.532 3.563-1.532c1.704 0 2.995.657 3.849 1.969L16 8.782l.828-1.391c.855-1.312 2.145-1.969 3.849-1.969c1.473 0 2.661.521 3.568 1.532c.875 1.011 1.312 2.375 1.312 4.093z"/>`,
  uses: `<path fill="currentColor" d="m8.914 24.5l4.257-4.257l-1.414-1.414L7.5 23.086l-.793-.793a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414l3 3a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 0-1.414ZM5 28.586L3.414 27L6 24.414L7.586 26Z"/><path fill="currentColor" d="M24 30a6.007 6.007 0 0 1-6-6a5.84 5.84 0 0 1 .21-1.547L9.548 13.79A5.848 5.848 0 0 1 8 14a5.976 5.976 0 0 1-5.577-8.184l.558-1.421l3.312 3.312a1.023 1.023 0 0 0 1.414 0a.999.999 0 0 0 0-1.414L4.393 2.979l1.423-.557A5.977 5.977 0 0 1 14 8a5.84 5.84 0 0 1-.21 1.547l8.663 8.663A5.855 5.855 0 0 1 24 18a5.976 5.976 0 0 1 5.577 8.184l-.557 1.421l-3.313-3.312a1.023 1.023 0 0 0-1.413 0a.999.999 0 0 0-.001 1.414l3.313 3.313l-1.422.558A5.96 5.96 0 0 1 24 30ZM10.063 11.476l10.46 10.462l-.239.609a3.975 3.975 0 0 0 3.466 5.445l-.871-.87a3 3 0 0 1 0-4.243a3.072 3.072 0 0 1 4.243 0l.87.871a3.976 3.976 0 0 0-5.446-3.466l-.609.239l-10.46-10.46l.24-.61A3.976 3.976 0 0 0 8.25 4.008l.87.87a3 3 0 0 1 0 4.243a3.072 3.072 0 0 1-4.243 0l-.87-.871a3.975 3.975 0 0 0 5.445 3.466Z"/><path fill="currentColor" d="M29.123 2.85a3.072 3.072 0 0 0-4.243 0l-7.48 7.48l1.414 1.414l7.48-7.48a1.024 1.024 0 0 1 1.414 0a1.002 1.002 0 0 1 0 1.414l-7.48 7.48l1.414 1.415l7.48-7.48a3.003 3.003 0 0 0 0-4.243Z"/>`,
};

export const SITE_TITLE = "Neil Merton";
export const SITE_DESCRIPTION =
  "A Frontend Developer based in Cheshire, UK, focused on accessibility and performance.";

type ConceptItem = {
  label: string;
  title?: string;
};

export const CONCEPTS_LIST: ConceptItem[] = [
  {
    label: "Accessibility",
  },
  {
    label: "Design",
  },
  {
    label: "Performance",
  },
  {
    label: "PWA",
    title: "Progressive Web Apps",
  },
  {
    label: "RWD",
    title: "Responsive Web Design",
  },
  {
    label: "UX",
    title: "User Experience",
  },
  {
    label: "Web Standards",
  },
];

type SkillsItem = {
  label: string;
};

export const SKILLS_LIST: SkillsItem[] = [
  {
    label: "CSS",
  },
  {
    label: "HTML",
  },
  {
    label: "JavaScript",
  },
  {
    label: "TypeScript",
  },
];

export type SocialLink = {
  description: string;
  href: string;
  icon: keyof typeof ICON_PATHS;
};

export const SOCIAL_LINKS: SocialLink[] = [
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
];

export type UsesItem = {
  description: string;
  title: string;
};

export const USES_HARDWARE_LIST: UsesItem[] = [
  {
    description: "I've been a Mac user for a long time now and I love it.",
    title: "Apple MacBook M1 Pro 16",
  },
  {
    description: "Pairs nicely with my MacBook Pro.",
    title: "LG 27UK850-W 27 Inch 4K Monitor",
  },
  {
    description:
      "Only recently started using a mouse again, previously I was a trackpad user. So it's taking some getting used to, gestures especially.",
    title: "Logitech MX Anywhere 2S Mouse",
  },
  {
    description:
      "This replicates the Mac keyboard nicely and have no complaints about it. Maybe I'll try one of the more clicky ones next time.",
    title: "Logitech MX Key for Mac Keyboard",
  },
];

export type UsesItemWithHref = UsesItem & {
  href: string;
};

export const USES_SOFTWARE_LIST: UsesItemWithHref[] = [
  {
    description:
      "I use this relatively new comer to the browser market. It has some great features and is worth checking out if you're a Mac user.",
    href: "https://arc.net/",
    title: "Arc Browser",
  },
  {
    description: "For creating mockups of websites and apps.",
    href: "https://figma.com/",
    title: "Figma",
  },
  {
    description:
      "Whilst the built in terminal is great, I prefer iTerm2. Especially when combined with useful plugins and helpful themes.",
    href: "https://iterm2.com/",
    title: "iTerm2",
  },
  {
    description:
      "My chosen Spotlight alternative. I use this to launch apps and search for files.",
    href: "https://www.raycast.com/",
    title: "Raycast",
  },
  {
    description:
      "My favourite coding font. I use this in both my editor and terminals.",
    href: "https://rubjo.github.io/victor-mono/",
    title: "Victor Mono Font",
  },
  {
    description:
      "This has been my goto choice for a while now. I love the simplicity of it and the fact that it just works.",
    href: "https://www.jetbrains.com/webstorm/",
    title: "Visual Studio Code",
  },
];
