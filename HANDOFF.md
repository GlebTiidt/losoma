# Losoma Handoff

## Current State

- Static one-page website for Losoma, a Berlin building-services company.
- Production alias: `https://losoma-pi.vercel.app`
- Main working directory: `/Users/glebstepanovich/ShipStudio/losoma`
- Current deploy path is Vercel, not Cloudflare Pages.
- `about.html` was removed. The site is intentionally one page only.

## What The Site Contains

1. Hero with full-bleed image, top navigation, and CTA.
2. Services overview cards.
3. Quality / brand statement section.
4. Services catalog slider built with Splide.
5. "Why Losoma" credibility section.
6. Collaboration process section.
7. Team section.
8. Reviews slider built with Splide.
9. Contact section with form, dropdown, FAQ, and footer.

## Section Map

### Hero

- Classes: `hero`, `hero__media`, `hero__image`, `hero__overlay`, `hero__content`, `hero__service-label`, `hero__service-dot`, `hero__copy`, `hero__title`, `hero__text`, `hero__cta`
- Top header classes: `header`, `header__brand`, `header__logo`, `nav`, `nav__link`
- CTA button classes: `button`, `button--accent`, `button__icon`

### Services Overview

- Section classes: `services-overview`, `services-overview__header`, `services-overview__intro`, `services-overview__title`, `services-overview__text`, `services-overview__cta`, `services-overview__cards`
- Card classes: `service-card`, `service-card__media`, `service-card__image`, `service-card__overlay`, `service-card__content`, `service-card__title`, `service-card__text`

### Quality Claim

- Section classes: `quality-claim`, `quality-claim__intro`, `quality-claim__title`, `quality-claim__text`, `quality-claim__cta`, `quality-claim__detail`, `quality-claim__points`, `quality-claim__media`, `quality-claim__image`
- Support classes: `quality-point`, `quality-point__title`, `quality-point__text`
- Metrics/summary classes: `experience-summary`, `experience-summary__items`, `experience-summary__item`, `experience-summary__value`, `experience-summary__text`

### Services Catalog

- Section classes: `services-catalog`, `services-catalog__header`, `services-catalog__title`, `services-catalog__text`, `services-catalog__controls`
- Slider classes: `service-list`, `service-list__track`, `service-list__list`, `service-catalog-card`, `service-catalog-card__number`, `service-catalog-card__title`, `service-catalog-card__text`, `service-catalog-card__media`, `service-catalog-card__image`
- Control classes: `slider-controls`, `slider-control`, `services-slider__arrow`, `services-slider__arrow--prev`, `services-slider__arrow--next`
- Detail link: `details-link`

### Why Losoma

- Section classes: `why-losoma`, `why-losoma__title`, `why-losoma__grid`
- Card classes: `why-card`, `why-card__media`, `why-card__image`, `why-card__content`, `why-contact-card`, `why-contact-card__label`, `why-contact-card__content`, `why-contact-card__title`, `why-contact-card__text`, `why-contact-card__cta`

### Collaboration Process

- Section classes: `collaboration-process`, `collaboration-process__header`, `collaboration-process__intro`, `collaboration-process__title`, `collaboration-process__link`
- Step classes: `process-steps`, `process-step-card`, `process-step-card__number`, `process-step-card__content`

### Team / Reviews

- Wrapper classes: `team-reviews`, `team-overview`, `team-overview__intro`, `team-overview__members`, `team-card`, `team-card__photo`
- Reviews classes: `customer-review`, `customer-review__meta`, `customer-review__author-panel`, `customer-review__author-current`, `customer-review__author-next`, `customer-review__controls`, `customer-review__content`, `customer-review__quote-icon`, `customer-review__slider`, `customer-review__track`, `customer-review__list`, `customer-review__slide`
- Review navigation classes: `customer-review__arrow`, `customer-review__arrow--prev`, `customer-review__arrow--next`

### Contact + FAQ

- Wrapper classes: `contact-faq`, `contact-panel`, `contact-panel__background`, `contact-form`
- Form classes: `contact-form__honeypot`, `contact-form__row`, `contact-form_select`, `contact-form_select-toggle`, `contact-form_select-icon`, `contact-form_select-list`, `contact-form_select-option`, `contact-form__check`, `contact-form__check-mark`, `contact-form__submit`
- Data hooks: `data-honeypot-input`, `data-email-input`, `data-phone-input`, `data-phone-normalized-input`, `data-service-dropdown`, `data-service-dropdown-toggle`, `data-service-dropdown-label`, `data-service-dropdown-list`, `data-service-dropdown-input`
- FAQ classes: `faq`, `faq__intro`, `faq-list`, `faq-item`, `faq-item__trigger`, `faq-item__icon`, `faq-item__panel`

### Footer

- Footer classes: `footer`, `footer__logo`, `footer__nav`, `footer__nav-column`, `footer__links`, `footer__service-summary`, `footer__cta`, `footer__contact-area`, `footer__contact`, `footer__social`, `footer__legal`

## Design Tokens

Main CSS variables in `styles.css`:

- `--color-page`, `--color-ink`, `--color-white`, `--color-accent`, `--color-blue`, `--color-muted`, `--color-surface-hover`, `--color-focus`
- `--font-sans`
- `--content-gutter`, `--grid-column-gap`, `--content-column-large`, `--content-column-medium`, `--content-column-small`, `--service-card-width`, `--form-width`, `--header-height`, `--container-width`
- `--section-gap`, `--section-gap-tight`, `--section-block-padding`
- `--divider-subtle`, `--divider-on-dark`
- `--radius-card`, `--radius-soft`, `--radius-field`
- `--button-height`, `--field-height`, `--control-size`, `--quote-icon-size`
- `--type-hero-title`, `--type-section-title`, `--type-metric`, `--type-card-title`, `--type-panel-title`, `--type-body-large`, `--type-body`, `--type-body-small`, `--type-caption`, `--type-label`
- `--motion-fast`, `--motion-medium`, `--motion-cta`

## File Map

- `index.html` — complete page structure and copy.
- `styles.css` — all layout, motion, spacing, typography, and section states.
- `script.js` — all interactivity, sliders, validation, FAQ, and dropdown logic.
- `SITE.md` — short live context; keep this synced after edits.
- `HANDOFF.md` — long-form transfer document.
- `README.md` — operational notes and deployment references.
- `CLAUDE.md` — older instruction file; some lines are historical.
- `docs/SEO_AND_CLASS_GUIDELINES.md` — SEO and naming guidance.
- `scripts/build-static.mjs` — copies static files into `dist/`.
- `scripts/optimize-images.mjs` — generates AVIF/WebP variants.
- `scripts/audit-client-first-classes.mjs` — scans for legacy class patterns.

## Vendor And Library Notes

- Lenis: smooth page scrolling.
- Splide: services slider and reviews slider.
- intl-tel-input: phone input with Germany-first flag/country selector.
- Keep these vendored assets in `assets/vendor/`.
- Do not replace them with custom implementations unless the user explicitly asks.

## Styling Rules

- Font family: `Lato`, loaded from Google Fonts.
- Main colors:
  - `--color-ink`: deep navy
  - `--color-page`: off-white
  - `--color-white`
  - `--color-accent`: green accent
  - `--color-blue`: brand blue
  - `--color-muted`
- Layout uses CSS variables for container width, spacing, border radii, typography scales, and motion.
- Typography uses `rem`/`clamp`, not viewport font sizing.
- Do not introduce negative letter-spacing.
- Keep card radii small and restrained.
- Prefer semantic grid/flex layout. Avoid unnecessary absolute positioning except for overlays and animation layers.
- Use `picture` with AVIF first, WebP fallback.
- Do not run image optimization for pure HTML/CSS/JS edits.

## Class Naming Rules

This repo has a mixed naming reality:

- Existing code still contains many legacy BEM-style selectors such as `__` and `--`.
- The documentation in `docs/SEO_AND_CLASS_GUIDELINES.md` asks for Client-First style for new project-owned code.
- In practice, do not trigger a large naming migration unless explicitly requested.
- If you touch a section, keep selectors consistent inside that section and avoid inventing extra class layers.
- Bind behavior through `data-*` hooks whenever possible.
- Keep third-party selectors such as `splide__track`, `splide__list`, `splide__slide` intact.

Preferred pattern for new behavior hooks:

- Use `data-*` for JS selectors.
- Use `is-*` for state classes.
- Avoid attaching JS to purely visual selectors when a data hook exists.

## JavaScript Rules

Startup flow from `script.js`:

1. `initCurrentYear()`
2. `initSmoothScroll()`
3. `initServicesSlider()`
4. `initReviewsSlider()`
5. `initServiceDropdown()`
6. `initFormHoneypot()`
7. `initEmailValidation()`
8. `initPhoneValidation()`
9. `initFaq()`

### Smooth Scroll

- Uses Lenis when available.
- Skips Lenis for `prefers-reduced-motion: reduce`.

### Services Slider

- Uses Splide with `autoWidth`, `trimSpace`, and custom nav buttons.
- Service cards are clickable and keyboard-activatable.
- Controls are disabled/enabled based on real slider position, not just index.
- Pagination is removed after mount.

### Reviews Slider

- Uses Splide and must stay on Splide.
- Do not replace it with a manual slider unless explicitly requested.
- Review author animation must stay on the same single crossfade path as review text.
- Do not reintroduce staggered fade-out/fade-in logic for the author label.
- Slider height is synced from `scrollHeight` of the active slide.

### Service Dropdown

- Uses a custom dropdown in the contact form.
- `data-lenis-prevent` is required on the scrollable list so page smooth-scroll does not steal wheel events.
- Dropdown closes on outside click and supports keyboard navigation.

### Form Validation

- Honeypot field: `company_website`.
- Email:
  - spaces are blocked on input,
  - whitespace is stripped before validation,
  - invalid addresses are rejected with `setCustomValidity`.
- Phone:
  - Germany is default country,
  - visible field is digit-only,
  - `intl-tel-input` provides country/flag UI and validation,
  - normalized number is stored in hidden `name="phone"` field.

### FAQ

- Only one FAQ item opens at a time.
- Height animation is based on measured panel height.
- Open state keeps the icon hover color and rotates the plus into a cross-like state.

## JavaScript Behavior Inventory

Startup order in `script.js`:

1. `initCurrentYear()`
2. `initSmoothScroll()`
3. `initServicesSlider()`
4. `initReviewsSlider()`
5. `initServiceDropdown()`
6. `initFormHoneypot()`
7. `initEmailValidation()`
8. `initPhoneValidation()`
9. `initFaq()`

### Important JS hooks

- Services slider root: `[data-services-slider]`
- Reviews slider root: `[data-reviews-slider]`
- Reviews author label: `[data-review-author]`
- Service dropdown root: `[data-service-dropdown]`
- Service dropdown toggle: `[data-service-dropdown-toggle]`
- Service dropdown label: `[data-service-dropdown-label]`
- Service dropdown list: `[data-service-dropdown-list]`
- Service dropdown hidden value: `[data-service-dropdown-input]`
- Honeypot: `[data-honeypot-input]`
- Email field: `[data-email-input]`
- Phone field: `[data-phone-input]`
- Normalized phone hidden field: `[data-phone-normalized-input]`
- FAQ root: `[data-faq]`

### Services slider rules

- Splide is used with `autoWidth`, `trimSpace`, and custom arrows.
- Cards are clickable and keyboard-activatable.
- Controls are disabled or enabled based on the actual slider position, not just the index.
- Pagination is removed after mount.

### Reviews slider rules

- Splide must stay on reviews.
- Do not replace reviews with a manual slider unless the user explicitly asks.
- Review author animation must stay on the same single crossfade path as review text.
- Do not reintroduce staggered fade-out/fade-in logic for the author label.
- The author label uses a stacked `current` and `next` span during transition, then collapses back to one span.
- Slider height is synced from `scrollHeight` of the active slide.

### Service dropdown rules

- `data-lenis-prevent` is required on the dropdown list so page smooth-scroll does not steal wheel input.
- Dropdown closes on outside click.
- Keyboard support includes ArrowDown, ArrowUp, Enter, Space, and Escape.

### Form validation rules

- Honeypot field name: `company_website`.
- Email:
  - spaces are removed on input,
  - whitespace is stripped before validation,
  - invalid addresses are rejected with `setCustomValidity`.
- Phone:
  - Germany is default country,
  - visible field is digit-only,
  - `intl-tel-input` provides the country/flag UI,
  - normalized number is stored in hidden `name="phone"` field.

## Content / SEO Rules

- Main language is German.
- Keep one H1 on the page.
- Use direct, specific headings and CTAs.
- Avoid generic marketing filler.
- The page is about building services in Berlin, primarily for residential and commercial property management.
- Current public alias for all user-facing references: `https://losoma-pi.vercel.app`

## Assets And Build Rules

- `assets/source/` contains original PNG/JPEG inputs.
- `assets/generated/` contains Sharp outputs, one AVIF and one WebP per source.
- `assets/static/` contains static non-generated files like the logo.
- `assets/vendor/` contains vendored third-party assets:
  - Lenis
  - Splide
  - intl-tel-input
- Build command: `npm run build:static`
- Image pipeline command: `npm run assets:images`
- Full deploy command: `npm run deploy`
- Preview deploy command: `npm run deploy:preview`
- `dist/` is generated output and should not be edited directly.
- Run the image pipeline only when `assets/source/` changes.

## Known Runtime Notes

- The live production site is on Vercel.
- The working production alias is `https://losoma-pi.vercel.app`.
- Old Cloudflare Pages references in older notes are historical, not the current source of truth.
- `about.html` is gone. Do not bring it back without an explicit request.
- The repo still contains some legacy BEM-style classes because the project already uses them heavily.
- New work should keep the touched section internally consistent instead of starting a broad naming migration.
- When a section is edited deeply, keep its class family coherent and avoid half-migrating only part of it.

## Section Content Notes

### Hero

- Full-viewport image hero.
- Top navigation links to main sections.
- Primary CTA leads to the contact form.

### Services overview

- Three cards: object care/handyman, cleaning, specialized services.
- This is a high-level overview, not the detailed carousel.

### Quality claim

- Brand statement section with two principle cards plus a supporting image.
- Also includes proof points for experience and number of objects.

### Services catalog

- Horizontal Splide carousel of nine services.
- Cards are wide and clickable.
- Each card has number, title, description, details link, and image.

### Why Losoma

- Four-card credibility block with one CTA card.

### Collaboration process

- Three steps describing how work starts.

### Team / reviews

- Team block currently shows repeated placeholder team cards in the HTML.
- Reviews block is the section most recently fixed.
- The author label must stay synchronized with the slide text timing.

### Contact / FAQ

- Form has service dropdown, email, phone, checkbox, and submit CTA.
- FAQ uses height animation only, no fade.

## Current Source Files Worth Reading First

- `index.html` for structure and copy
- `styles.css` for layout and motion
- `script.js` for interaction and validation
- `SITE.md` for the short current context
- `docs/SEO_AND_CLASS_GUIDELINES.md` for naming and SEO rules
- `package.json` for available commands

## Adaptive, Forms & Components (added 2026-06-17)

This block supersedes older notes where they conflict.

### Responsive breakpoints
- Desktop ≥ 1025px (base). Tablet `@media (max-width: 1024px)`. Phone `@media (max-width: 560px)`. No landscape-phone breakpoint.
- Header collapses to the burger at `@media (max-width: 1150px)` (where the fluid desktop nav stops fitting — tunable).
- Status: **tablet (≤1024) is complete for the whole page** — header, mobile menu, Hero, services-overview, quality-claim, services-catalog, why-losoma, collaboration-process, team-reviews, customer-reviews, the contact CTA panel (Figma 29:573), the FAQ block (Figma 29:610), and the footer (Figma 29:668). **Phone (≤560): Hero (Figma 29:733) + services-overview (Figma 29:756) are DONE** (`@media (max-width: 560px)` block at the end of `styles.css`, with a phone `:root`). Phone `:root` tokens: `--section-gap` + `--section-gap-tight` = 5rem (**80px between every section on phone**), `--button-height` = 2.5rem (40px). Phone side gutter = 16px. Hero: content padding 16px, title 32px, body 18px, CTA static layout inline, overlay kept uniform `rgba(4,23,31,0.3)` (Figma gradient ignored by request). services-overview: single column, title 28px, body 16px, link-button text 16px, cards 400px tall. quality-claim (Figma 29:790/29:791/29:819): single column 16px gutters, intro title 28px / body 16px, **intro divider full-bleed** (negative inline margin on `.quality-claim__intro`) with all other dividers inset, principle titles 20px / text 16px, image 500px, metric values 40px / text 18px. services-catalog slider (Figma 29:835, card 29:854): 16px gutters, peek-next-card kept (card capped 360px), title 28px, card number 44px / title 20px / text 14px, **both gaps around "Details ansehen" = 16px (above text→link and below link→image; user override of the 24px export)**, image 240px. why-losoma (Figma 29:957): single column 16px gutters, title 28px, 3 image cards 350px (titles 24px / text 16px), navy contact card 300px with title 28px / text 16px / green link-button text 16px. collaboration-process (Figma 29:999): single column 16px gutters, title 28px, CTA link-button text 16px, 3 step cards 200px (step title 20px / text 16px). team-overview (Figma 29:1033): 16px gutter on the whole `.team-reviews` wrapper, team cards 2-col→1-col with 24px row gap, photo fixed 350px, title 28px (name 24px / role 18px already matched). customer-reviews (29:1073): quote text 20px, top+bottom borders kept (24px to bottom border) with 50px off-white below it (`.contact-faq margin-top`) so the border stays visible against the dark CTA. contact CTA panel (29:1092): full-bleed dark, navy form 16px padding, h2 28px. FAQ (29:1129): 32px below the CTA, top border inset 16px (gutter via margin, not padding, so the border isn't edge-to-edge), h2 28px, question 20px, plus icon 32px. All phone dividers are real borders, not absolute lines. footer (29:1187): single column, link groups stacked, headings 14px / body 16px. **Phone (≤560) responsive is now COMPLETE for the whole page** (alongside desktop + tablet). Spacing exceptions: reviews 50px under team; CTA + FAQ + footer run flush as one stack. Build each from its Figma frame (ask for node ids) — never eyeball adaptive layouts.

### Desktop fluid typography (one place)
- In `@media (min-width: 1025px) :root` the type tokens are redefined as clamps that max at the Figma value and shrink ~2px (section H2 ~6px) toward 1025px: `--type-section-title` 42→36, `--type-card-title` 28→26, `--type-panel-title` 24→22, `--type-body-large` 22→20, `--type-body` 18→16, `--type-body-small` 16→14, `--type-label` 14→12.
- Hero H1 (`.hero__title`) has its own desktop clamp `clamp(2.5rem, 3.9vw, var(--type-hero-title))`.
- These are desktop-only by design — tablet/phone take Figma sizes per section. To scale type on tablet/phone too, extend in those media queries.

### Header structure
- `.header` (desktop): grid; `.header__brand` (logo) + `.header__actions` (grid-column `6 / -1`, flex `space-between`) wrapping `.nav` + `.header__cta`. The actions group keeps the nav left edge aligned with the hero heading and prevents nav/CTA collision.
- `≤1150px`: `.header` becomes flex `space-between`, `.header__actions` is `display:none`, `.menu-toggle` is `display:grid`.
- `.header` z-index is 3 (above the mobile menu).

### Desktop header scroll behaviour (>1150px, added 2026-06-20)
- The header is `position: fixed` and a **fixed 80px bar** at all times — `min-height: 5rem; padding-top: 0` inside the `@media (min-width: 1151px)` block. The height never animates.
- **Frosted blur on scroll:** a full-bleed `.header::before` (`width: 100vw`, `left: 50%` + `translateX(-50%)`, `z-index: -1`) carries `background: rgba(253,253,252,0.72)` + `backdrop-filter: blur(14px) saturate(1.08)`. It's `opacity: 0` over the hero and fades to `1` on `.header.is-scrolled` (`transition: opacity var(--motion-medium)`). No border, shadow, or gradient mask — plain solid blur.
- **Colour crossfade:** on `.is-scrolled`, `.nav__link` → ink and `.header__logo--light` → `opacity: 0` (reveals the always-solid dark logo underneath).
- **Footer hide:** `.header.is-hidden { transform: translateY(-100%) }` slides the whole bar up out of view; `.header` has `transition: transform var(--motion-medium)`.
- **JS** (`initHeaderScrollState`): one IntersectionObserver on `.hero` (negative top rootMargin = header height, recomputed on resize) toggles `.is-scrolled`; a second on `.footer` (rootMargin `0px 0px -35% 0px`) toggles `.is-hidden`. All visual rules gated to `@media (min-width: 1151px)`, so tablet/phone burger header is untouched.
- **Rejected this session — do NOT reintroduce:** header shrink/height animation; hairline/shadow under the bar; gradual/progressive blur (Josh Comeau `mask-image` technique). The user reviewed each and chose the plain fixed-height solid-blur version.

### Burger toggle
- Markup: `.menu-toggle > .menu-toggle__box > 3× .menu-toggle__line`, hook `data-menu-toggle`.
- Style: 40px `--color-accent` button, `--radius-card`; lines 1.5px tall, 20px wide, `--color-ink`, `transform-origin: center`.
- Open (`.menu-toggle.is-open`): line1 `translateY(5.25px) rotate(45deg)`, line2 `opacity:0`, line3 `translateY(-5.25px) rotate(-45deg)` → centred X. (We tried the CodePen `#nav-icon4` left-hinge first; the user wanted it centred.)

### Mobile menu overlay
- Markup: `.mobile-menu` (id `mobile-menu`, hooks `data-mobile-menu` + `data-lenis-prevent`) inside `.hero`, after the header. Contains `.mobile-menu__nav` (`.mobile-menu__heading` "Leistungen" + `.mobile-menu__links` with 9 `.mobile-menu__link`) and `.mobile-menu__footer` (`.mobile-menu__tagline` + `.mobile-menu__cta`).
- Style (in the ≤1150 block): `position:fixed; inset:0; z-index:2; background:#0a163e; overflow-y:auto`, hidden via opacity/visibility until `body.is-menu-open`. Nav pushed down with `margin-top:auto`; footer at the bottom.
- z-index inside `.hero`: header (3) > mobile-menu (2) > hero__content (1) so logo + burger stay visible above the open overlay.
- Built from Figma 46:62. **Note:** the Figma menu shows only services (no Über uns / Unser Team / Einblicke / Bewertungen). Links currently go to `#leistungen`.

### Button components (keep separate — do not hack one into the other)
- `.button` / `.button--accent`: solid green + slide animation (absolute icon, centred text, `::before` dark fill). For "Angebot anfragen" (hero/header). Needs width slack; bad for long text.
- `.button--static`: clean modifier on `.button` — cancels the slide, makes it inline `icon + 12px gap + text`, `min-width:auto`, `justify-content:center`, and neutralises the hover transforms. Defined once (after the hover `@media` block). For tablet/menu CTAs (Figma 29:226 / 46:65). The mobile menu "Kontakt aufnehmen" uses `button button--accent button--static`.
- `.link-button` / `.link-button--green`: square icon + text, square expands on hover. For "Anfrage senden", footer "Kontakt aufnehmen", contact submit, why-contact-card.

### Tablet Hero (≤1024, Figma 29:208)
- `.hero__content` becomes `position:absolute; inset:auto 0 0 0; flex column; gap 1.5rem; padding 1.5rem`. `.hero__copy` flex column: title, text (`margin-top:1rem`, 20px), CTA (`margin-top:1.5rem`, `align-self:flex-start`). Title `clamp(2.25rem, 6.4vw, 3rem)`. Overlay inherited from desktop (uniform `rgba(4,23,31,0.3)`).

### Forms (current behaviour)
- **Name** (`data-name-input`, `name="name"`, `required`): `initNameValidation()` allows only letters (incl. umlauts/accents), spaces, hyphens, apostrophes, dots; blocks other chars on input, strips on paste, rejects on submit. Pure regex, no library.
- **Email** (`data-email-input`, `required`): `initEmailValidation()` — regex format validation + space blocking, **plus** the vendored `mailcheck` (`assets/vendor/mailcheck/mailcheck.min.js`, loaded before `script.js`) suggesting domain-typo corrections on blur via `[data-email-suggestion]` (Germany-first domain lists).
- **Phone** (`data-phone-input`, `required`): intl-tel-input owns it — `strictMode`, `formatAsYouType`, `formatOnDisplay`, `autoPlaceholder:"aggressive"`, `countrySearch:false`, `separateDialCode`. Normalized E.164 stored in hidden `name="phone"` (`data-phone-normalized-input`). No custom digit-stripping. The email/phone row `.contact-form__row` has `position:relative; z-index:3` so the country dropdown layers above the service field; `.iti__dropdown-content` has an 8px top gap; the country button's left corners are rounded to match.
- **Service dropdown**: hidden input can't be native-`required` (type=hidden is barred from validation), so `initServiceDropdown()` enforces it on submit — empty → preventDefault + `.is-invalid` (red border) + opens.
- **Required**: all fields required **except** the message textarea.

### JS startup order (`script.js`)
`initCurrentYear, initSmoothScroll (exposes window.__lenis), initServicesSlider, initReviewsSlider, initServiceDropdown, initMobileMenu, initFormHoneypot, initNameValidation, initEmailValidation, initPhoneValidation, initFaq`.

### Build & deploy workflow
- Default: **local build only** — `npm run build:static`. Local server: `http://localhost:61440` (serves `dist/`).
- Deploy to Vercel (`npx vercel --prod --yes`) **only when the user explicitly asks**. `vercel.json` + project link kept intact.
- `_headers`: `index.html` / `styles.css` / `script.js` are `max-age=0, must-revalidate` (unhashed names); only `assets/vendor|generated|static` are long-cache immutable.

## Recent Important Decisions

- Reviews stay on Splide.
- The author label now uses the same crossfade timing path as the review text.
- Form validation is client-side and intentionally strict.
- The project is intentionally a single-page site.
- The current production alias is always `https://losoma-pi.vercel.app`.
- `HANDOFF.md` is the long transfer file; `SITE.md` is the short live context.
