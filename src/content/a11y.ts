/** aria-label / title strings. Mirrors content.md §9. */

export const a11y = {
  intro: {
    wrapper: 'UnValor Brand Reveal',
    skip: 'Skip intro to homepage',
    wordmark: 'UnValor°',
    controls: 'Animation controls',
    replayTitle: 'Replay animation (or press Space / R)',
  },
  skipLink: 'Skip to content',
  navbar: {
    brand: 'UnValor, home',
    nav: 'Primary',
    drawer: 'Menu',
  },
  hero: {
    playFilm: 'Play film',
    pauseFilm: 'Pause film',
    orbitTags: "What runs once we're done",
  },
  work: {
    scroller: 'Work slots. Drag, scroll, or use the arrow buttons.',
    prev: 'Show previous work',
    next: 'Show next work',
    open: (title: string) => `Open ${title}`,
    close: 'Close preview',
  },
  contact: {
    copy: 'Copy email address',
  },
} as const
