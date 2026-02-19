import type { SiteConfig, Role, TechItem, NavItem, UsesItem, UsesItemWithHref } from './types';

export const siteConfig: SiteConfig = {
  name: 'Neil Merton',
  title: 'Neil Merton / Frontend Developer',
  description: 'Frontend developer and product engineer specialising in accessible, performant web experiences.',
  url: 'https://neil.merton.dev',
  email: 'neilmerton@gmail.com',
  fediverseHandle: '@neilmerton@mas.to',
  socials: [
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/neilmerton',
      label: 'LinkedIn',
    },
    {
      platform: 'mastodon',
      url: 'https://mas.to/@neilmerton',
      label: 'Mastodon',
    },
    {
      platform: 'github',
      url: 'https://github.com/neilmerton',
      label: 'GitHub',
    },
    {
      platform: 'codepen',
      url: 'https://codepen.io/neilmerton',
      label: 'CodePen',
    },
  ],
};

export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reading', href: '/reading' },
  { label: 'Contact', href: '/contact' },
];

export const navItemsAbout: NavItem[] = [
  { label: 'Overview', href: '/about' },
  { label: 'Uses', href: '/about/uses' },
  { label: 'Colophon', href: '/about/colophon' },
];

export const techStack: TechItem[] = [
  // Languages
  { name: 'CSS', category: 'language', proficiency: 'expert' },
  { name: 'HTML', category: 'language', proficiency: 'expert' },
  { name: 'JavaScript', category: 'language', proficiency: 'expert' },
  { name: 'T-SQL', category: 'language', proficiency: 'familiar' },
  { name: 'TypeScript', category: 'language', proficiency: 'expert' },
  // Frameworks
  { name: 'Astro', category: 'framework', proficiency: 'proficient' },
  { name: 'Nuxt.js', category: 'framework', proficiency: 'familiar' },
  { name: 'Node.js', category: 'framework', proficiency: 'proficient' },
  { name: 'Vue.js', category: 'framework', proficiency: 'expert' },
  { name: 'Svelte', category: 'framework', proficiency: 'familiar' },
  // Tools
  { name: 'Figma', category: 'tool', proficiency: 'expert' },
  { name: 'Git / GitHub', category: 'tool', proficiency: 'proficient' },
  { name: 'Playwright', category: 'tool', proficiency: 'familiar' },
  { name: 'Vite', category: 'tool', proficiency: 'proficient' },
  { name: 'Vitest', category: 'tool', proficiency: 'proficient' },
  // Platforms
  { name: 'AWS', category: 'platform', proficiency: 'familiar' },
  { name: 'Azure', category: 'platform', proficiency: 'familiar' },
  { name: 'Sentry', category: 'platform', proficiency: 'proficient' },
  { name: 'Supabase', category: 'platform', proficiency: 'familiar' },
  { name: 'Vercel', category: 'platform', proficiency: 'proficient' },
];

export const professionalSummary = `
I'm a frontend developer and product engineer with over 10 years experience building accessible, 
performant web applications. I care deeply about the craft of frontend; from semantic HTML and 
progressive enhancement to design systems and developer experience. I thrive at the intersection 
of engineering rigour and thoughtful design.
`.trim();

export const roles: Role[] = [
  {
    title: 'Lead Frontend Engineer',
    company: 'enee.io',
    companyUrl: 'https://enee.io',
    startDate: '2023-03',
    location: 'Remote',
    description: 'Lead frontend development for cutting-edge SaaS Energy Monitoring platform.',
    highlights: [
      'Architected and maintained a design system in Figma, extending PrimeVue components.',
      'Frontend architecture including PWA, TanStack Query, i18n, and performance optimisations.',
      'Unit testing with Vitest and end-to-end testing with Playwright.',
      'Maintained Lighthouse accessibility score in the 90s site-wide.',
      'Maintained CI/CD pipelines and error monitoring in Sentry.',
    ],
    technologies: ['TypeScript', 'Vue.js', 'PWA', 'SCSS', 'Vite', 'Figma', 'PrimeVue', 'TanStack Query', 'Highcharts'],
  },
  {
    title: 'Lead Frontend Engineer',
    company: 'StaffCircle',
    companyUrl: 'https://staffcircle.com',
    startDate: '2017-10',
    endDate: '2023-02',
    location: 'Remote',
    description: 'Led frontend development for SaaS HR platform, including features like performance management, employee engagement and time-off.',
    highlights: [
      'Delivered MVP of platform in 6 months, leading to successful seed funding round.',
      'Migrated MVP from ASP.NET WebApp to modern frontend stack, including offline capabilities through Workbox.',
      'Reduced average page load time by 35% through image optimisation and code splitting.',
      'Implemented interactive, context-aware help guides, improving user onboarding and reducing support tickets by 20%.',
    ],
    technologies: ['JavaScript', 'Vue.js', 'SCSS', 'Sketch', 'Vuetify', 'Chart.js'],
  },
  {
    title: 'Head of Innovation',
    company: 'Citation Professional Services',
    companyUrl: 'https://www.citation.co.uk',
    startDate: '2015-01',
    endDate: '2017-10',
    location: 'Wilmslow, UK',
    description: 'Managed innovation projects and led the development of new digital solutions, including off-shore collaborations.',
    highlights: [
      'Led multiple innovation projects, driving digital transformation and process improvements.',
      'Led UX design and frontend development for a new client portal, improving user experience and client satisfaction.',
      'Implemented design system (fractal.build) to standardise UI components across projects.',
    ],
    technologies: ['Leadership', 'Design System', 'JavaScript', 'Angular'],
  },
];

const snippets: string[] = [
  `Declarative programming allows you to describe what you want to happen, rather than the steps to make it happen.`,
  `JSX is a syntax extension for JavaScript, but browsers don't understand JSX out of the box, so you'll need a JavaScript compiler to transform your JSX code into regular JavaScript.`,
  `JavaScript's dynamic typing makes it easy to introduce runtime errors. TypeScript catches errors at compile time, preventing common mistakes before they even run in the browser.`,
  `In JavaScript, repeating the same calculation multiple times inside a loop can degrade performance. If a value is constant across loop iterations, compute it outside the loop instead.`,
  `Make sure there is a visible focus style for interactive elements that are navigated to via keyboard input. This is crucial for accessibility, as it allows users who rely on keyboard navigation to see where they are on the page and interact with elements effectively.`,
  `Remove animations when the “reduce motion” setting is activated. This respects users' preferences and can help prevent motion sickness or discomfort for those sensitive to motion.`,
]

export function getRandomSnippet(): string {
  const randomIndex = Math.floor(Math.random() * snippets.length);
  return snippets[randomIndex];
}

export const usesHardware: UsesItem[] = [
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
      "Only recently started using a mouse again, previously I was a trackpad user. I'm not yet 100% sold on this mouse, the thumb button seems a little hit and miss.",
    title: "Logitech MX Master 3S for Mac Mouse",
  },
  {
    description:
      "This replicates the Mac keyboard nicely and have no complaints about it. Maybe I'll try one of the more clicky ones next time.",
    title: "Logitech MX Keys for Mac Keyboard",
  },
  {
    description:
      "I enjoy listening to music, and this system works for me. I'm sure it wouldn't if you're an audiophile though.",
    title: "Logitech Z333 2.1 Speaker System",
  },
  {
    description:
      "My first iPhone was the 3GS. After the iPhone 4 I switched over to Android. I've been back on iOS since the iPhone 8 Pro, I can't see myself going back to Android any time soon.",
    title: "Apple iPhone 15 Pro Max",
  },
];

export const usesSoftware: UsesItemWithHref[] = [
  {
    description:
      "I use this relatively new comer to the browser market. It has some great features and is worth checking out if you're a Mac user.",
    href: "https://arc.net/",
    title: "Arc Browser",
  },
  {
    description:
      "For creating mockups of websites and apps. I have started dabbling with PenPot recently, but it's not quite there yet.",
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
      "My chosen Spotlight alternative. I use this to launch apps and search for files and perform various tasks efficiently.",
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
    href: "https://code.visualstudio.com/",
    title: "Visual Studio Code",
  },
];
