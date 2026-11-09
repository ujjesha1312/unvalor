# UnValor° — Site Content

All user-facing copy on the site, in page order, extracted verbatim from the source.
The typed modules in `src/content/` mirror this file exactly — change both together.
`{title}`-style placeholders mark values interpolated at runtime.

---

## 1. Site meta & navigation

Module: `src/content/site.ts`

- **Page title:** UnValor°
- **Meta description:** We turn thoughtful ideas into digital products built for real life.
  _(No description existed before the migration; this reuses the Hero subhead verbatim.)_

### Brand

- **Wordmark:** UnValor
- **Degree mark:** °

### Nav items

| Label | Anchor |
|---|---|
| Home | `#hero` |
| Services | `#services` |
| Our Approach | `#approach` |
| About | `#about` |
| Contact | `#contact` (opens the contact dropdown) |

### Calls to action

- **Desktop CTA:** Let's talk
- **Mobile CTA:** Let's talk
- **Mobile drawer CTA:** Let's talk ↗
- **Mobile drawer replay button:** Replay Brand Reveal

### Contact dropdown (Navbar)

- **Eyebrow:** START A CONVERSATION
- **Option 1 title:** Send an Email
- **Option 1 description:** Have a project, product idea, or question? Write to us.
- **Option 1 action (when email verified):** Compose Email
- **Option 1 mailto subject (when email verified):** UnValor Inquiry
- **Option 1 unverified tag:** Setup in progress · Email pending
- **Option 2 title:** Explore UnValor
- **Option 2 description:** See what we're building and the problems we want to solve.
- **Option 2 action:** Explore the Studio
- **Footer link:** Go to inquiry section ↓
- **Status pill:** _uses Contact config `statusNote`_ (see §6)

---

## 2. Brand intro

Module: `src/content/intro.ts`

- **Animated wordmark (SVG letters):** U · n · V · a · l · o · r, followed by the degree symbol
- **Signature:** BY UJJESHA
- **Skip button:** Skip intro →
- **Replay button:** Replay
- **Hold indicator:** Hold 4s Active
- **Keyboard hints:** Space or R replays the animation; Escape skips to the homepage
  _(not rendered as visible text — exposed through the Replay button's `title`, see §8)_

---

## 3. Hero

Module: `src/content/hero.ts`

- **Headline:** Ideas, / made tangible.
  - Line 1: Ideas,
  - Line 2: made tangible.
- **Subhead:** We turn thoughtful ideas into digital products built for real life.
- **Primary button:** Explore our work
- **Secondary button:** Let's talk

### Focus cards

| # | Tag | Title | Body |
|---|---|---|---|
| 01 | Small Business Tools | Everyday Operations | Practical digital tools and simple workflows built to eliminate friction and solve routine operational headaches for small businesses. |
| 02 | Startup MVPs | Practical Software | Fast, dependable web applications and digital tools for early-stage founders looking to test real ideas with real people, not bloated roadmaps. |
| 03 | Our Approach | Human-Centered Utility | Digital craft stripped of tech jargon. We design software around existing user habits, multi-language needs, and genuine daily usefulness. |

- **Status line:** We're actively building at UnValor. · Direct founder collaboration

---

## 4. Services

Module: `src/content/services.ts`

- **Eyebrow:** Services & Focus
- **Heading:** Capabilities crafted for everyday utility.
- **Intro:** We build practical digital tools for small businesses and focused software for startups. Drag cards to reorganize your view.
- **Drag hint:** Drag grip to rearrange
- **Reset button:** ↺ Reset layout _(shown only after the cards are rearranged)_

### Cards (default order)

#### Card 1 — `card-tools`

- **Tag:** SMALL BUSINESS SOFTWARE
- **Title:** Practical Business Tools
- **Body:** Practical digital tools that help small businesses streamline daily operations.
- **Mini visual (operations board):**
  - Header: Operations · Workflow
  - Row 1: Order Processing — Active — pill: Live
  - Row 2: Task Schedule — Synced — pill: OK

#### Card 2 — `card-web`

- **Tag:** WEB DEVELOPMENT
- **Title:** Websites & MVPs
- **Body:** Fast, thoughtful websites and useful first versions of digital products.
- **Mini visual (browser wireframe):**
  - Address bar: studio.unvalor.com

#### Card 3 — `card-ai`

- **Tag:** AI & AUTOMATION
- **Title:** AI & Workflow Automation
- **Body:** Practical automation that reduces repetitive work and makes information easier to use.
- **Mini visual (pipeline):**
  - Step 1: Input — "New task"
  - Step 2: Automation — Workflow active
  - Step 3: Summary — Clear update

#### Card 4 — `card-collab`

- **Tag:** EARLY-STAGE COLLABORATION
- **Title:** Build With UnValor
- **Body:** Have a real problem to solve? Let's explore a practical first version together.
- **Mini visual (collaboration):**
  - Status chip: Direct Founder Collaboration
  - Button: Start a project

---

## 5. About

Module: `src/content/about.ts`

- **Eyebrow:** ABOUT UNVALOR°
- **Heading:** We believe useful software starts with understanding the problem.
- **Paragraph:** We're building UnValor around a simple idea: technology should make everyday work easier, not add another layer of complexity.
- **Principles label:** Studio Principles
- **Expand hint:** Click cards to expand detail

### Principles

| # | Title | Summary | Expanded detail |
|---|---|---|---|
| 01 | Understand | Find the real problem. | We start by understanding the everyday problem, the people experiencing it, and the way they already work. |
| 02 | Simplify | Remove unnecessary steps. | We look for simpler workflows that reduce friction instead of adding more tools, complicated dashboards, or unnecessary processes. |
| 03 | Build | Make something useful. | We turn practical ideas into thoughtful digital products, then refine them around what people actually need. |

---

## 6. Contact

Module: `src/content/contact.ts`

- **Eyebrow:** LET'S CONNECT
- **Heading:** Have an idea? / Let's make it real.
  - Line 1: Have an idea?
  - Line 2: Let's make it real.
- **Paragraph:** Tell us what you're building. Let's figure out the next step.
- **Studio badge:** U° · UNVALOR° · EARLY-STAGE STUDIO
  - Badge mark: U°
  - Badge label: UNVALOR° · EARLY-STAGE STUDIO
- **Prompt:** What are you working on?

### Chips

| Id | Label | Mailto subject |
|---|---|---|
| `idea` (default) | A new idea | UnValor Inquiry: A new idea |
| `product` | A website or product | UnValor Inquiry: A website or product |
| `other` | Something else | UnValor Inquiry: Project conversation |

- **Message shown under the chips (same for every chip):** Great. Tell us a little about it in your email.

### Email channel

- **Channel label:** DIRECT EMAIL
- **Email:** hello@unvalor.com
- **Primary button:** Send us an email
- **Copy button:** Copy email
- **Copy button (after copying):** Copied!

### Contact config

- **email:** hello@unvalor.com
- **isVerified:** false
- **unverifiedNotice:** Direct inbox setup in progress — official address pending verification.
- **statusNote:** We're actively building at UnValor.

---

## 7. Footer

Module: `src/content/footer.ts`

- **Brand:** UnValor°
- **Signature:** BY UJJESHA
- **Tagline:** Digital product studio for founders, creators, and engineering teams.

### Navigation column

- **Heading:** Navigation

| Label | Anchor |
|---|---|
| Home | `#hero` |
| Services | `#services` |
| Our Approach | `#approach` |
| About Studio | `#about` |
| Contact | `#contact` |

### Experience column

- **Heading:** Experience
- **Replay button:** Replay Brand Reveal
- **Back to top button:** ↑ Back to Top

### Bottom bar

- **Copyright:** © {year} UnValor. All rights reserved.
- **Colophon:** Midnight Navy · Deep Navy · Slate Blue · Warm Cream

---

## 8. Accessibility strings

Module: `src/content/a11y.ts`. These are `aria-label`, `title` and accessible-name strings. There are no images, so the site has no `alt` text.

### Brand intro

- **Wrapper aria-label:** UnValor Brand Reveal
- **Skip button aria-label:** Skip intro to homepage
- **Wordmark SVG aria-label:** UnValor°
- **Controls aria-label:** Animation controls
- **Replay button title:** Replay animation (or press Space / R)

### Navbar

- **Brand link aria-label:** UnValor home
- **Nav aria-label:** Main Navigation
- **Menu toggle aria-label (closed):** Open menu
- **Menu toggle aria-label (open):** Close menu
- **Dropdown close aria-label:** Close contact dropdown

### Hero

- **Section aria-label:** Introduction to UnValor
- **Focus cards aria-label:** UnValor Focus Areas

### Services

- **Section aria-label:** Services & Capabilities
- **Reset button title:** Reset cards to default layout
- **Grid aria-label:** Rearrangeable services cards
- **Grip aria-label:** Drag to reorder {title}. Use arrow keys to reorder when focused.
- **Grip title:** Drag grip or use arrow keys to reorder
- **Order controls aria-label:** Card order controls
- **Move back title:** Move card backward
- **Move back aria-label:** Move {title} backward
- **Move forward title:** Move card forward
- **Move forward aria-label:** Move {title} forward

### About

- **Section aria-label:** About UnValor Studio
- **Principles aria-label:** Studio Principles

### Contact

- **Section aria-label:** Contact and Inquiries
- **Chip group aria-label:** What are you working on?
- **Email link title:** Compose email to hello@unvalor.com
- **Primary button title:** Send email via your email client
- **Copy button aria-label:** Copy email address

### Footer

- **Replay button title:** Replay the animated brand-reveal intro sequence

---

## 9. Design reference (non-copy)

From `src/index.css` before the migration. Now defined in `src/app/globals.css` (`@theme`).

### Palette

| Token | Value |
|---|---|
| Midnight | `#010736` |
| Deep Navy | `#0D1C42` |
| Slate Blue | `#22396F` |
| Warm Cream | `#FCF1D0` |

### Semantic tokens

| Token | Value |
|---|---|
| bg-primary | Midnight `#010736` |
| bg-surface | Deep Navy `#0D1C42` |
| bg-surface-elevated | `rgba(13, 28, 66, 0.85)` |
| border-slate | Slate Blue `#22396F` |
| border-subtle | `rgba(34, 57, 111, 0.55)` |
| border-cream | `rgba(252, 241, 208, 0.22)` |
| text-primary | Warm Cream `#FCF1D0` |
| text-secondary | `rgba(252, 241, 208, 0.82)` |
| text-muted | `rgba(252, 241, 208, 0.6)` |
| text-subtle | `rgba(252, 241, 208, 0.38)` |

### Fonts

- **Brand / body:** Space Grotesk (400, 500, 600, 700)
- **Editorial / headings:** Syne (500, 700)

### Decorative glyphs (in markup, not in the content modules)

↗ (outbound action) · ↓ (in-page) · ↺ (replay/reset) · ▾ (dropdown) · ✕ (close) · ← → (card order) · + − (expand/collapse) · ⋮⋮ (drag grip)
