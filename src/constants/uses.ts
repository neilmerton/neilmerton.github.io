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
    href: "https://code.visualstudio.com/",
    title: "Visual Studio Code",
  },
];
