/** sessionStorage key marking that the intro already played in this browser session. */
export const INTRO_SEEN_KEY = 'unvalor_intro_seen'

/** The intro is skipped when the visitor prefers reduced motion or has already seen it this session. */
export function readShouldShowIntro(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return sessionStorage.getItem(INTRO_SEEN_KEY) !== 'true'
  } catch {
    return true
  }
}

/**
 * Inlined into <head> (layout.tsx) so it runs before first paint. Same rule as
 * `readShouldShowIntro`: marks html[data-intro="skip"], which globals.css uses to
 * hide the server-rendered intro so it never flashes for visitors who skip it.
 */
export const INTRO_GATE_SCRIPT = `try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('${INTRO_SEEN_KEY}')==='true'){document.documentElement.dataset.intro='skip'}}catch(e){}`
