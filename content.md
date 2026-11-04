# UnValor° — Site Content

All user-facing copy on the site, in page order, extracted verbatim from the source.
The typed modules in `src/content/` mirror this file exactly — change both together.
`{title}`-style placeholders mark values interpolated at runtime.

---

## 1. Site meta & navigation

Module: `src/content/site.ts`

- **Site name:** UnValor°
- **Page title:** UnValor° — Less chaos. More customers.
- **Meta description:** UnValor builds websites, WhatsApp replies and automations for local businesses.

### Brand

- **Wordmark:** UnValor
- **Degree mark:** ° (drawn as an SVG ring after the wordmark)

### Nav items

| Label | Route | Next-page band |
|---|---|---|
| Services | `/services` | Work |
| Work | `/work` | About |
| About | `/about` | Contact |
| Contact | `/contact` | Services |

The home page (`/`) keeps every section in one scroll; each section also has its own page with the section, room for page-only content, and a "Next" band. The ° indicator sits on the current page's link and follows hover. The logo links to `/`. Every contact CTA links to `/contact`.

### Page titles (template: `{title} — UnValor°`)

| Route | Title | Description |
|---|---|---|
| `/services` | Services | Practical digital tools, websites, MVPs and automation for small businesses and startups. |
| `/work` | Work | Selected work from UnValor°. Case studies arrive as projects ship. |
| `/about` | About | UnValor° is a small studio in Visakhapatnam building for busy businesses. |
| `/contact` | Contact | Tell us what you're building. Let's figure out the next step. |

### Calls to action

- **Text link:** Talk to us → (`/contact`)
- **Primary button:** Book a call — hover text: Pick a time (`/contact`)
- **Mobile menu button:** Menu
- **Drawer close button:** Close
- **Drawer link numbers:** (01), (02), (03), (04)
- **Drawer note:** ° Reply within a working day
- **Drawer primary button:** Book a free 20-min call (`/contact`)
- **Drawer secondary button:** Talk to us (`/contact`)

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

- **Eyebrow:** (00) Websites · WhatsApp · Automations
- **Headline:** Less chaos. / More customers.
  - Line 1: Less chaos.
  - Line 2: More customers. ("customers" is underlined)
- **Subhead:** We build the website, WhatsApp replies and quiet systems that catch every enquiry.
- **Primary button:** Book a free 20-min call — hover text: Pick a time that suits (`/contact`)
- **Secondary button:** See our work (`#services`)
- **Left margin (vertical):** Understand → Simplify → Build
- **Right margin:** Index °00 / Visakhapatnam, IN

### Film frame

| # | Chapter | Starts at |
|---|---|---|
| (01) | Understand | 0:00 |
| (02) | Simplify | 0:20 |
| (03) | Build | 0:40 |

- **Poster words:** Understand. · Simplify. · Build
- **Play hint:** Play · 60s
- **Time display:** {elapsed} / 1:00
- **Caption:** Watch how UnValor works · 60s

### Orbit tags

| Label | Channel |
|---|---|
| New enquiry | WhatsApp |
| Replied in seconds | Auto |
| Booked · Tue 11:30 | Calendar (cream tag) |
| Missed call → texted back | Phone |
| Found on Google | Website |
| Reminder sent | Tomorrow |

---

## 4. Services

Module: `src/content/services.ts` — rendered as the feature bento (`src/components/ui/feature-section-with-bento-grid.tsx`).

- **Label:** (01) Services & Focus
- **Heading:** Capabilities crafted for everyday utility.
- **Intro:** We build practical digital tools for small businesses and focused software for startups.

### Cards (bento order; 01 and 04 span two columns on desktop)

#### (01) `card-tools` — wide

- **Tag:** Small business software
- **Title:** Practical Business Tools
- **Body:** Practical digital tools that help small businesses streamline daily operations.
- **Mini visual (operations board):** Operations · Workflow — Order Processing / Active / Live — Task Schedule / Synced / OK

#### (02) `card-web`

- **Tag:** Web development
- **Title:** Websites & MVPs
- **Body:** Fast, thoughtful websites and useful first versions of digital products.
- **Mini visual (browser wireframe):** studio.unvalor.com

#### (03) `card-ai`

- **Tag:** AI & automation
- **Title:** AI & Workflow Automation
- **Body:** Practical automation that reduces repetitive work and makes information easier to use.
- **Mini visual (pipeline):** Input "New task" → Automation · Workflow active → Summary · Clear update

#### (04) `card-collab` — wide

- **Tag:** Early-stage collaboration
- **Title:** Build With UnValor
- **Body:** Have a real problem to solve? Let's explore a practical first version together.
- **Mini visual:** status chip "Direct Founder Collaboration" + button "Start a project" — hover text: Let's talk (`/contact`)

---

## 4b. Work

Module: `src/content/work.ts` — **placeholders**, replace with real case studies as they ship.

- **Label:** (02) Work
- **Heading:** Selected work, on the way.
- **Intro:** We're early, and honest about it. These slots fill up as projects ship.
- **Hint:** Drag or scroll to explore
- **Expanded-view status:** Case study soon

| # | Kind | Title | Description | Span |
|---|---|---|---|---|
| 01 | Website | A booking-ready website | For a local service business. The full story once it ships. | lg |
| 02 | WhatsApp | An enquiry reply flow | Answers the usual questions before anyone picks up the phone. | sm |
| 03 | Automation | Missed-call text-back | Every missed call gets a reply and a way to book. | sm |
| 04 | First version | A founder’s first product | A focused MVP, built to learn from real users. | tall |
| 05 | Automation | Appointment reminders | Fewer no-shows, without anyone chasing. | sm |
| 06 | Website | A calmer storefront | Clear pages, one obvious next step. | wide |

---

## 5. About

Module: `src/content/about.ts` — values marked [PLACEHOLDER] are waiting on real copy, names or photos.

- **Label:** (A) Studio
- **Heading [PLACEHOLDER]:** A small studio for busy businesses.
- **Lead [PLACEHOLDER]:** We set up the website and the quiet systems behind it, so you can get back to the work only you can do.

### Bento

- **Large card:** studio/founder photo slot (4:5 or 1:1, navy→cream duotone). Until then: a large outlined ° that draws on scroll.
  - Caption: [PLACEHOLDER] Photo: studio, Visakhapatnam
- **Right-top card:**
  - Title [PLACEHOLDER]: Built around your day
  - Body [PLACEHOLDER]: We start with how you already work: the calls, the messages, the busy hours. Then we fit the tools to that, not the other way round.
  - Button: See how we work → — hover text: Understand first (`#services`, [PLACEHOLDER] target)
- **Right-bottom card (`#approach`):** Understand → Simplify → Build as three stacked steps (outline, tint, solid cream). Accessible name: Understand, then simplify, then build

### Founders note

- **Label:** (A) A note from the founders
- **Portrait label:** Founder
- **Founders [PLACEHOLDER]:** Ujjesha — Design & build (supports 1 or 2; a second portrait stacks beneath)
- **Note [PLACEHOLDER]:** We started UnValor° after watching good local businesses lose customers to missed calls and slow replies. Not because the work was bad, but because nobody had a spare minute to answer. We build for the people running the shop, the clinic, the studio. We keep things simple enough that you'll actually use them. And we'll always tell you plainly what something will and won't do.
- **Sign-off:** — {founder names joined with &}

### First-clients marquee

- **Label:** (B) Our first clients
- **Logos [PLACEHOLDER]:** `CLIENT_LOGOS` in `about.ts` (name + optional SVG). Empty → 6 × "Your business" slots
- **Behaviour:** scrolls left in an endless loop; pauses on hover, keyboard focus or the button. Reduced motion → still grid, no button
- **Button:** Pause / Play — accessible names: Pause the client logos / Play the client logos
- **Line [PLACEHOLDER]:** We're taking our first five clients.

---

## 6. Contact

Module: `src/content/contact.ts`

- **Label:** (04) Contact
- **Heading:** Have an idea? / Let's make it real.
  - Line 1: Have an idea?
  - Line 2: Let's make it real.
- **Paragraph:** Tell us what you're building. Let's figure out the next step.
- **Status line:** ° We're actively building at UnValor. _(CONTACT_CONFIG.statusNote)_
- **Prompt:** What are you working on?

### Chips

| Id | Label | Mailto subject |
|---|---|---|
| `idea` (default) | A new idea | UnValor Inquiry: A new idea |
| `product` | A website or product | UnValor Inquiry: A website or product |
| `other` | Something else | UnValor Inquiry: Project conversation |

- **Message shown under the chips (same for every chip):** Great. Tell us a little about it in your email.

### Email channel

- **Channel label:** Direct email
- **While `isVerified` is false:** address shown as plain text with the unverified notice; only Copy email is offered
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

- **Statement:** Let’s make it / run calm°
- **Button:** Book a free 20-min call — hover text: Pick a time that suits (`/contact`)

### (A) Studio column

| Label | Anchor |
|---|---|
| Services | `#services` |
| Work | `#work` |
| About | `#about` |
| Contact | `#contact` |

### (B) Talk column

- **Email:** _uses Contact config `email`_ (see §6). Links to `#contact` until `isVerified` is true, then becomes a mailto.

### Bottom bar

- **Left:** © UnValor° Studio · By Ujjesha
- **Middle:** Understand → Simplify → Build
- **Right:** Back to top ↑ (`#hero`)
- **(B) Talk note:** We're actively building at UnValor.

---

## 8. Accessibility strings

Module: `src/content/a11y.ts`. These are `aria-label`, `title` and accessible-name strings. There are no images, so the site has no `alt` text.

### Brand intro

- **Wrapper aria-label:** UnValor Brand Reveal
- **Skip button aria-label:** Skip intro to homepage
- **Wordmark SVG aria-label:** UnValor°
- **Controls aria-label:** Animation controls
- **Replay button title:** Replay animation (or press Space / R)

### Page

- **Skip link:** Skip to content

### Navbar

- **Brand link aria-label:** UnValor, home
- **Nav aria-label:** Primary
- **Drawer dialog aria-label:** Menu

### Hero

- **Play button aria-label:** Play film / Pause film (while playing)
- **Orbit tag list aria-label:** What runs once we're done

### Work

- **Scroller:** Work slots. Drag, scroll, or use the arrow buttons.
- **Arrows:** Show previous work / Show next work
- **Tile:** Open {title}
- **Close:** Close preview

### About

- **Section aria-label:** About UnValor Studio
- **Principles aria-label:** Studio Principles

### Contact

- **Section aria-label:** Contact and Inquiries
- **Chip group aria-label:** What are you working on?
- **Email link title:** Compose email to hello@unvalor.com
- **Primary button title:** Send email via your email client
- **Copy button aria-label:** Copy email address

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
