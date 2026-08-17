# Sedation Page Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish an autonomous static copy of the clinic's sedation page that matches the source page visually and behaviorally while keeping forms non-submitting.

**Architecture:** Use a dependency-free static site with semantic HTML, one focused stylesheet, and one JavaScript module for tabs, accordions, sliders, and form suppression. Store required media locally under `assets/`, validate the artifact with Node's built-in test runner, and deploy the repository root with GitHub Pages.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, GitHub Actions, GitHub Pages.

## Global Constraints

- Preserve the source page's design, table, prices, text, section order, links, and responsive behavior in the first version.
- Store required images, fonts, and media resources in the repository so the page does not depend on the source page.
- Keep forms visually present but do not transmit personal data, issue network requests, or show false success messages.
- Preserve telephone, email, Telegram, and ordinary clinic navigation destinations.
- Verify wide and mobile layouts and the absence of critical browser-console errors before publishing.

---

## File Map

- `index.html` — complete semantic page markup and static content.
- `css/style.css` — source-matched visual system, layout, components, and responsive rules.
- `js/main.js` — accordions, doctor tabs, review controls, mobile navigation, and form suppression.
- `assets/images/` — locally stored source-page images and icons.
- `assets/fonts/` — locally stored fonts required for visual parity.
- `tests/site.test.mjs` — structural, content, asset, and safety tests.
- `.github/workflows/pages.yml` — GitHub Pages publication workflow.
- `README.md` — preview and project-purpose documentation.

### Task 1: Establish the Static Page Contract

**Files:**
- Create: `tests/site.test.mjs`
- Create: `package.json`
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`

**Interfaces:**
- Produces: DOM hooks `[data-accordion]`, `[data-doctor-tab]`, `[data-review-slider]`, `[data-static-form]`, and module initializer `initPage(documentRoot)`.

- [ ] **Step 1: Write the failing structural test**

Create tests using `node:test`, `node:assert/strict`, and `node:fs` that assert `index.html` contains `lang="ru"`, UTF-8 metadata, the headings `Наркоз/Седация`, `Вам это нужно если:`, `Мнение врачей`, `Видео`, `Записаться на прием`, and `Отзывы`; assert `css/style.css` and `js/main.js` are linked; and assert every form has `data-static-form` and no nonempty `action` attribute.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site.test.mjs`

Expected: FAIL because the page files and required content do not exist.

- [ ] **Step 3: Add the minimum page contract**

Create `package.json` with `"type": "module"` and `"test": "node --test tests/site.test.mjs"`. Create the five project files with valid UTF-8 content, linked CSS/JS, empty component containers carrying the specified data attributes, and `export function initPage(documentRoot = document) {}` in `js/main.js`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`

Expected: PASS for encoding, required headings, linked resources, and static-form safety.

- [ ] **Step 5: Commit**

Run: `git add package.json index.html css/style.css js/main.js tests/site.test.mjs && git commit -m "test: define static sedation page contract"`

### Task 2: Reproduce the Full Content and Local Resource Set

**Files:**
- Modify: `index.html`
- Modify: `tests/site.test.mjs`
- Create: `assets/images/*`
- Create: `assets/fonts/*`

**Interfaces:**
- Consumes: page contract and data hooks from Task 1.
- Produces: all page sections in source order and valid repository-relative resource URLs.

- [ ] **Step 1: Extend tests for complete content and assets**

Assert that `index.html` contains all three comparison labels `ЗАКС`, `Пропофол`, and `Севоран`, all six comparison row labels, the three doctor roles, the four numbered safety items, the consultation form, all three review authors, the clinic address, and the contraindications warning. Extract local `src`, `href`, and CSS `url(...)` paths and assert each referenced repository file exists.

- [ ] **Step 2: Run the extended test to verify it fails**

Run: `npm test`

Expected: FAIL listing missing sections and resources.

- [ ] **Step 3: Implement the complete semantic markup**

Transcribe the source page from the service header through the legal warning, preserving the exact Russian copy, prices `До 5 000 ₽`, `14 000 ₽`, `14 000 ₽`, section order, telephone/mail/Telegram destinations, table rows, doctor opinions, safety explanations, reviews, footer navigation, and legal links. Give decorative images empty alt text and meaningful images concise Russian alt text.

- [ ] **Step 4: Store source assets locally**

Download only assets visibly used by this page, assign stable lowercase filenames, place images/icons in `assets/images/` and fonts in `assets/fonts/`, and replace source-domain media URLs in HTML/CSS with repository-relative paths.

- [ ] **Step 5: Run tests and commit**

Run: `npm test`

Expected: PASS for complete content, local asset resolution, and static forms.

Run: `git add index.html assets tests/site.test.mjs && git commit -m "feat: reproduce complete sedation page content"`

### Task 3: Reproduce Page Interactions Without Form Submission

**Files:**
- Modify: `js/main.js`
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: data hooks and content containers from Tasks 1–2.
- Produces: `initAccordions`, `initDoctorTabs`, `initReviewSlider`, `initMobileNavigation`, and `disableStaticForms`, all called by `initPage`.

- [ ] **Step 1: Add interaction contract tests**

Assert exported source contains the five named initializers, uses `aria-expanded` for accordions/mobile navigation, uses `aria-selected` and `hidden` for doctor tabs, updates review visibility and a current-slide counter, and calls `preventDefault()` in the static-form submit handler.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL because the interaction functions are absent.

- [ ] **Step 3: Implement accessible local interactions**

Implement button-driven accordions, single-selected doctor tabs, previous/next review navigation with disabled boundary buttons, mobile navigation toggling, and submission suppression. Initialize from `DOMContentLoaded`, keep all controls keyboard-operable, and do not use `fetch`, `XMLHttpRequest`, or external form endpoints.

- [ ] **Step 4: Run tests and commit**

Run: `npm test`

Expected: PASS for every interaction and form-safety assertion.

Run: `git add index.html js/main.js tests/site.test.mjs && git commit -m "feat: add sedation page interactions"`

### Task 4: Match the Source Visual System and Responsive Layout

**Files:**
- Modify: `css/style.css`
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: complete semantic markup and interaction states.
- Produces: wide and mobile source-matched layouts with visible focus states.

- [ ] **Step 1: Add CSS contract tests**

Assert the stylesheet defines local `@font-face` sources, reusable color/spacing variables, desktop comparison columns, hidden-state handling, focus-visible styling, and media queries covering navigation, the comparison block, doctor content, reviews, and footer at widths no greater than `768px`.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL for missing visual-system and responsive rules.

- [ ] **Step 3: Implement the source-matched styles**

Reproduce the observed white/teal palette, typography hierarchy, rounded controls, spacing rhythm, content widths, comparison grid, doctor cards, safety list, review cards, footer, and fixed legal warning. Add the mobile stacking/order and navigation behavior observed on the source page while preserving readable table content without horizontal page overflow.

- [ ] **Step 4: Run tests and commit**

Run: `npm test`

Expected: PASS for styling contracts and all prior checks.

Run: `git add index.html css/style.css tests/site.test.mjs && git commit -m "style: match source sedation page"`

### Task 5: Add Deployment and Perform Final QA

**Files:**
- Create: `.github/workflows/pages.yml`
- Create: `README.md`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: completed static site.
- Produces: deployable GitHub Pages artifact and public preview URL.

- [ ] **Step 1: Add deployment contract tests**

Assert the workflow triggers on pushes to `main`, grants `pages: write` and `id-token: write`, uploads the repository as a Pages artifact, and deploys with `actions/deploy-pages`. Assert README links to the source page and states that forms are intentionally non-submitting.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL because deployment files are absent.

- [ ] **Step 3: Implement Pages deployment and documentation**

Create the official GitHub Pages Actions workflow using `actions/checkout`, `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. Document the project purpose, source URL, local preview command, test command, and form limitation.

- [ ] **Step 4: Run automated verification**

Run: `npm test`

Expected: all tests PASS.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 5: Perform browser QA**

Serve the repository locally over HTTP. Compare the local page with the source in wide and mobile viewports, exercise accordions, doctor tabs, review controls, and mobile navigation, submit the static form to confirm no request occurs, and confirm no critical console errors or missing assets.

- [ ] **Step 6: Commit and publish**

Run: `git add .github/workflows/pages.yml README.md tests/site.test.mjs && git commit -m "ci: publish sedation page to GitHub Pages"`

Push the completed `main` branch to `kcska18051-crypto/mc-podmoskovie.ru-services-sedatsiya`, wait for the Pages deployment, and verify the public URL loads the completed page.
