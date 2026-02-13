// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

type ConceptItem = {
  label: string;
  title?: string;
};

export const CONCEPTS_LIST: ConceptItem[] = [
  {
    label: "WCAG",
    title: "Web Content Accessibility Guidelines",
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
