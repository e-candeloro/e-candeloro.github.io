export type Accent = "primary" | "secondary" | "tertiary";

export type ButtonLink = {
  href: string;
  label: string;
  ariaLabel: string;
  variant: "primary" | "secondary";
};

export type CardVariant = "project-1" | "project-2" | "cv-card" | "contact-card";

export const siteMeta = {
  title: "Ettore Candeloro",
  description: "Hello I'm Ettore, a developer. I like to build things.",
};

export const navLinks: Array<{
  href: string;
  label: string;
  ariaLabel: string;
  accent: Accent;
}> = [
  {
    href: "#projects",
    label: "Projects",
    ariaLabel: "link to scroll down to my projects section",
    accent: "primary",
  },
  {
    href: "#curriculum",
    label: "Curriculum",
    ariaLabel: "link to scroll down to my curriculum section",
    accent: "secondary",
  },
  {
    href: "#contactme",
    label: "Contact Me",
    ariaLabel: "link to scroll down to the contact me section",
    accent: "tertiary",
  },
];

export const hero = {
  titlePrefix: "Hello, I'm",
  titleAccent: "Ettore",
  subtitlePrefix: "I like to build",
  subtitleAccent: "things",
  cta: {
    href: "#projects",
    label: "See my Projects",
    ariaLabel: "link to scroll down to my projects section",
    variant: "primary",
  } satisfies ButtonLink,
};

export const contact = {
  socials: [
    {
      href: "https://github.com/e-candeloro",
      label: "GitHub",
      ariaLabel: "link to my GitHub profile",
      icon: "github",
    },
    {
      href: "https://linkedin.com/in/ettore-candeloro-900081162",
      label: "LinkedIn",
      ariaLabel: "link to my LinkedIn profile",
      icon: "linkedin",
    },
    {
      href: "mailto:candeloroettore@gmail.com",
      label: "Email",
      ariaLabel: "link to my email",
      icon: "email",
    },
  ],
};

export const footer = {
  textBeforeHeart: "Made with",
  textAfterHeart: "by Ettore Candeloro",
};
