/** aria-label / title strings. Mirrors content.md §8. The site has no images, so no alt text. */

export const a11y = {
  intro: {
    wrapper: 'UnValor Brand Reveal',
    skip: 'Skip intro to homepage',
    wordmark: 'UnValor°',
    controls: 'Animation controls',
    replayTitle: 'Replay animation (or press Space / R)',
  },
  navbar: {
    brand: 'UnValor home',
    nav: 'Main Navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    dropdownClose: 'Close contact dropdown',
  },
  hero: {
    section: 'Introduction to UnValor',
    focusCards: 'UnValor Focus Areas',
  },
  services: {
    section: 'Services & Capabilities',
    resetTitle: 'Reset cards to default layout',
    grid: 'Rearrangeable services cards',
    grip: (title: string) => `Drag to reorder ${title}. Use arrow keys to reorder when focused.`,
    gripTitle: 'Drag grip or use arrow keys to reorder',
    orderControls: 'Card order controls',
    moveBackTitle: 'Move card backward',
    moveBack: (title: string) => `Move ${title} backward`,
    moveForwardTitle: 'Move card forward',
    moveForward: (title: string) => `Move ${title} forward`,
  },
  about: {
    section: 'About UnValor Studio',
    principles: 'Studio Principles',
  },
  contact: {
    section: 'Contact and Inquiries',
    chipGroup: 'What are you working on?',
    emailTitle: 'Compose email to hello@unvalor.com',
    primaryTitle: 'Send email via your email client',
    copy: 'Copy email address',
  },
  footer: {
    replayTitle: 'Replay the animated brand-reveal intro sequence',
  },
} as const
