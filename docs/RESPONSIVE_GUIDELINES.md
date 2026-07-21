# Responsive / Adaptive Guidelines (Losoma)

Rules distilled from building the full **tablet** and **phone** passes of the home page.
**Apply these to every new page** so all pages stay consistent. When in doubt, the
per-section Figma frame is the source of truth — never eyeball adaptive layouts.

---

## 1. Breakpoints (locked)

| Range | Media query | Notes |
|-------|-------------|-------|
| **Desktop** | `≥ 1025px` (base styles, no query) | Base layout. |
| **Tablet** | `@media (max-width: 1024px)` | |
| **Phone** | `@media (max-width: 560px)` | Single column. |
| **Header → burger** | `@media (max-width: 1150px)` | Separate from the content tablet bp — it's where the fluid desktop nav stops fitting. |

- **No separate landscape-phone breakpoint.** Landscape phones fall into the tablet range; only the `100vh` hero needs short-height care (handled via hero height, not a bp).
- The phone block lives at the **end of `styles.css`**, after the `@media (max-width: 1024px)` block, so it wins on equal specificity. Tablet rules cascade into phone unless overridden — only override what actually changes from tablet.
- Desktop typography is fluid via clamps on the type tokens inside `@media (min-width: 1025px) :root` (desktop-only).

---

## 2. Source of truth & process

- Pull concrete CSS from the **per-section Figma frame** via the Figma MCP `get_design_context`. Build **section by section**; ask for the node id of the section's phone/tablet frame before starting.
- Figma px are **design measurements, not implementation**. Convert to `rem` / `clamp()` / grid / flex / `aspect-ratio` and the shared tokens. (1rem = 16px.)
- Do **not** rewrite copy during a responsive pass, even if the Figma node shows different wording — the live HTML copy is shared across all breakpoints.
- After edits: `npm run build` / `npm run build:static` and run the relevant audits. Vercel is staging/backend only; Hostinger production launch requires explicit approval and the backup checklist.

---

## 3. Phone `:root` tokens (set once in the `@media (max-width: 560px)` block)

```css
:root {
  --section-gap: 5rem;        /* 80px between every section — DEFAULT */
  --section-gap-tight: 5rem;  /* keep both equal unless a frame says otherwise */
  --button-height: 2.5rem;    /* 40px buttons on phone (Figma) */
}
```

Section spacing is driven by these tokens (each section's top margin uses `var(--section-gap)`), so 80px is automatic. Only override per-section when a frame deviates (see §6).

---

## 4. Gutters

- **Phone side gutter = 16px** everywhere. The `--content-gutter` token is ~20px and is **not** used on phone.
- Standard pattern for a section: `width: 100%; padding-inline: 1rem;`
- Slider/full-bleed sections: set `padding-left: 1rem` on the section and `padding-right: 1rem` on the track.
- Tablet side gutter is 24px (`1.5rem`); phone tightens to 16px.
- The **Warum Losoma grid uses one column from `1024px` down**. The complete
  section — label, title, three image cards and contact card — keeps the normal
  24px tablet / 16px phone gutter, and every card fills 100% of that content width.
- The collaboration-process cards are a deliberate exception to the general tablet
  stack: they remain three columns from `768px` through `1024px`, and stack below
  `768px`.

---

## 5. Phone type scale (the values used across the page)

Match the section's Figma frame, but these are the recurring values — reuse them for consistency:

| Element | Phone size |
|---|---|
| **Hero H1** | `clamp(1.5rem, 8.2vw, 2rem)` — tops at **32px** ~390px, shrinks below. `overflow-wrap: break-word` as a safety. |
| **Section H2 / big section title** | **28px** (`1.75rem`) |
| Body / paragraph | **16px** (`1rem`) |
| Card title (overlay cards) | **24px** (`1.5rem`) |
| Card / secondary text | **16px**, sometimes **14px** (catalog card body) |
| Metric value (e.g. "7+ Jahre") | **40px** (`2.5rem`) |
| Link-button / CTA text | **16px** — set per section: `.section_cta { font-size: 1rem; }` (the shared `.link-button` base stays 18px) |
| Footer column headings | **14px** (`0.875rem`) |
| Footer links / body | **16px** (`1rem`) |
| **Mobile-menu heading** | **14px** (`0.875rem`) — matches the footer heading |
| **Mobile-menu links / tagline** | **16px** (`1rem`) — matches footer links/body |
| Form fields + placeholder + **dropdown options** | **16px** (`1rem`) — size them together |

- **Mobile menu = footer, per breakpoint.** The open burger menu mirrors the **footer's** type sizes at each breakpoint (tablet heading 16px / links 18px; phone heading 14px / links + tagline 16px), and its link **hover matches the footer's `opacity: 0.72`** (shared hover block, `@media (hover:hover) and (pointer:fine)`, with `transition: opacity` on `.mobile-menu_link`). Don't invent a separate menu scale.
- **Dropdown options must match the field/placeholder size on phone.** The phone form rule sizes `.contact-form input/textarea/_select-toggle` **and** `.contact-form_select-option` to `1rem` in one selector list — drop the option and the open list renders 18px while everything else is 16px.
- **Section labels** (`.section-label`, the small uppercase eyebrow): **12px**, dot 12px, gap 8px — set once, globally, in the phone block. **Keep 12px even when a Figma frame shows 14px** (a few frames — team, reviews, CTA, footer "KONTAKT" — show 14px; we kept the shared 12px for consistency across the page). Hero uses its own `.hero_service-label`.
- **Long German compounds** ("Gebäudedienstleistungen", "betreute Objekte…") clip easily — add `overflow-wrap: break-word` to large headings on phone as a safety net (matches Figma's `word-break` on those nodes).

---

## 6. Spacing & dividers

- **Dividers are real `border`s** (e.g. `--divider-subtle`), never absolute-positioned lines. Mirror desktop.
- **Inset border (not edge-to-edge):** if a section needs a top border at the 16px gutter, put the gutter as a **`margin-inline`, not `padding-inline`** — a `border-top` on a full-width element with padding runs edge-to-edge. Example (FAQ): `margin: 2rem 1rem 0; padding: 2.5rem 0 3rem;`.
- **Full-bleed divider while keeping text inset:** negative inline margin + matching padding on the element (quality-claim intro): `margin-inline: -1rem; padding-inline: 1rem;` — the border spans full width, the text stays at 16px.
- **A border flush against a dark panel is invisible.** Give it off-white breathing room. Example (reviews): the reviews block keeps its top+bottom borders, and ~50px of off-white sits below the bottom border (via the next section's `margin-top`) so it reads against the dark CTA panel.
- **Per-section spacing exceptions are allowed** when the design calls for it (and were used on the home page near the bottom): reviews → 50px to the CTA; CTA panel + FAQ + footer are tuned as one visual stack (FAQ sits 32px below the CTA). Always source the exact gap from the frame.

---

## 7. Buttons — three families, keep them separate

1. **`.button` / `.button.is-accent`** — solid green with the **slide animation** (absolute icon, `::before` dark fill). Used for "Angebot anfragen" (hero/header). Needs width slack.
2. **`.button.is-static`** — the clean **static** solid button: inline `icon + 12px gap + text`, no slide. Use for tablet/menu CTAs.
3. **`.link-button` / `.link-button.is-green`** — square icon + text, the square expands on hover. Used for "Anfrage senden", footer CTA, contact submit.

### ⚠️ The hero-CTA hover bug (this bit us twice — read this)

The hero CTA is the animated `.button` on desktop/tablet and must become **static only on phone** — but you **cannot swap classes per breakpoint**, so it's made static via a `@media (max-width: 560px)` override on `.hero_cta`.

**Making `.button` static per-breakpoint MUST also cancel the `:hover` / `:focus-visible` transforms**, not just the resting position. Otherwise the base rule

```css
.button:hover .button_icon { transform: translate3d(9rem, -50%, 0); }
```

has **higher specificity** than a plain `.hero_cta .button_icon`, so on any pointer hover (narrow desktop window, touch-laptop, device emulation) the arrow **slides to the right** — the classic "why did the button behavior change" complaint.

The phone block therefore mirrors the **full** `.button.is-static` treatment, including:

```css
.hero_cta:hover .button_icon,
.hero_cta:focus-visible .button_icon,
.hero_cta:hover span,
.hero_cta:focus-visible span { transform: none; }

.hero_cta.button.is-accent:hover,
.hero_cta.button.is-accent:focus-visible { color: var(--color-ink); }
```

**Do not drop these.** Touch alone suppresses the slide (`@media (hover:hover) and (pointer:fine)` gate), but pointer/emulation hover does not — the neutralization above is required. The general rule: **whenever you statically override `.button` at a breakpoint, cancel its hover/focus transforms too** (or, on a fresh element that can be static at all sizes, just use `.button.is-static`).

---

## 7b. Contact form (shared component)

- **One `.contact-form` everywhere.** The CTA panel (main + service pages) and the standalone `/kontakt` page reuse the SAME form markup with all `data-*` hooks, so validation / dropdown / intl-tel-input / mailcheck behave identically. Re-theme via a scoped parent class (e.g. `.contact-page .contact-form { … }`) — never fork the markup or JS.
- **Phone (≤560): E-Mail + Telefon stack.** `.contact-form_row { grid-template-columns: 1fr; gap: 0; }` — side by side they're too cramped. Each field keeps its own `0.5rem` top-margin, so zero the row gap to avoid doubling. Shared rule → every page.
- **Phone: field, placeholder and dropdown options are all 16px.** Size `.contact-form input/textarea/_select-toggle` **and** `.contact-form_select-option` together (`font-size: 1rem`). Forgetting the option leaves the open list at 18px.
- **Re-theming a field's colour:** flip `background` / `border-color` / typed-text `color`, but **leave `.contact-form_select-toggle`'s `color` to the base rules** — it must stay the muted placeholder (`#848a8c`) until `.is-selected`. The light `/kontakt` submit is the base `.link-button` **without** `.is-green` (= blue square); the checkbox gets a visible border on the light background.

## 7c. Solid-header pages (no hero) — `body.is-solid-header`

Pages with no dark hero (Kontakt, Impressum) need the header solid from the very top:

- Ink logo at every breakpoint: `.is-solid-header .header_logo.is-light { opacity: 0 }` — set statically (no fade on load).
- Desktop (≥1151px): frosted bar + ink nav **permanently on** — `.is-solid-header .header::before { opacity: 1 }`, `.is-solid-header .nav_link { color: var(--color-ink) }`.
- **Open mobile menu → logo white again:** `.is-solid-header.is-menu-open .header_logo.is-light { opacity: 1 }` (over the navy overlay).
- `initHeaderScrollState()` is hero-optional: skips the `.is-scrolled` hero observer when `.hero` is absent, still runs the footer slide-up.
- Standalone section spacing: ~100px of breathing room under the fixed header and above the footer (desktop `padding: 11.5rem 0 6.25rem`); the burger header is in flow on tablet/phone, so the top padding drops accordingly.
- **Legal pages (`/impressum`, later `/datenschutz`) reuse this exact shell** via the `.legal-page` component (12-col grid, left H1 / right `.legal-page_content` stack of `.legal-block`s, each closed by a `#c0c0c0` bottom divider; two-up `.legal-block_row` for Adresse|Kontakt and USt-ID|Steuernummer uses a `404fr / 523fr` split that stacks to one column ≤560px). No form → drop the splide/intl-tel-input/mailcheck vendors.

## 7d. Cross-page anchors

Landing on `/#leistungen` from another page: `initSmoothScroll` sets `history.scrollRestoration = "manual"` and re-asserts the `-(header + 24)` Lenis offset on `load`, so the native offset-less fragment jump can't tuck the heading under the fixed header. Same visible offset as same-page anchor clicks — **don't** add CSS `scroll-padding-top` (it double-stacks with the JS offset).

---

## 8. Images & overlays

- **Card gradient overlays are the component's own gradient** — keep them on every breakpoint (service cards, why-losoma cards, etc.).
- The **"no gradient" rule was Hero-only**: the hero overlay stays the uniform `rgba(4,23,31, 0.3)` from the desktop/tablet pass; the Figma hero gradient is intentionally ignored.
- `picture` with AVIF first, WebP fallback. Do not run the image pipeline for HTML/CSS/JS-only edits.
- **Cropping a wide source into the portrait `.quality-claim_media` box**: the box is `aspect-ratio:523/600` + `object-fit:cover`, which by default crops to the image **center**. When the Figma frame shows the image shifted (e.g. a wide shot positioned to show its LEFT part — `left:-27.78%` in Figma), add the reusable modifier **`.quality-claim_image.is-align-left`** (`object-position: left center`) to the `<img>`. Square sources still center fine with no modifier (Treppenhausreinigung elevator, Gewerbliche besprechungsraum). Always still cap the wide source in `optimize-images.mjs` (e.g. Grundreinigung teppichboden 2752×1536 → 1600 wide).

---

## 9. Class naming on new pages

Follow `docs/SEO_AND_CLASS_GUIDELINES.md`: project-owned classes use Client-First-style naming (`block`, `block_element`, `is-*`) and JS behavior should prefer `data-*` hooks. Third-party classes such as `splide__*` and `iti__*` stay unchanged because they belong to their libraries.

---

## 10. Status

- Home page: desktop + tablet (≤1024) + phone (≤560) are **all complete**.
- Service pages (Hausmeisterservice, Treppenhausreinigung): reuse the home components, responsive via the shared classes.
- **Contact page (`/kontakt`): desktop + tablet + phone done** — `body.is-solid-header`, light re-themed `.contact-form`. See §7b / §7c.
- **Impressum (`/impressum`): desktop + tablet + phone done** — `body.is-solid-header`, `.legal-page` component. See §7c.
- Devices to spot-check on phone: **320 / 360 / 390 / 414 px**.
