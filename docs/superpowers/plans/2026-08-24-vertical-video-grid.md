# Vertical Video Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the eight landscape video cards with five approved 9:16 cards and remove terminal periods from every comparison-table cell item.

**Architecture:** Keep the existing static HTML structure and VK iframe embeds. Update only the embedded page styles, video markup, and Node test assertions; isolate punctuation changes to the `.ac-comparison` section.

**Tech Stack:** Static HTML/CSS, VK Video iframe embeds, Node.js built-in test runner

## Global Constraints

- Desktop video grid: 5 columns.
- Tablet video grid: 3 columns.
- Mobile video grid: 1 column.
- Video player aspect ratio: 9:16.
- Keep exactly five approved clips and their current titles.
- Remove only periods that terminate individual `.ac-copy` items inside the comparison table.
- Do not change headings, controls, content order, or punctuation inside sentences.

---

### Task 1: Five-card vertical video grid

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: existing `.video-grid`, `.video-card`, `.video-card__media`, `.video-card__iframe`, and `.video-card__title` markup and styles.
- Produces: a five-card VK grid with responsive 5/3/1 columns and 9:16 players.

- [ ] **Step 1: Replace the eight-video test with a failing five-video responsive-grid test**

Use the approved IDs and titles:

```js
test('video section renders five approved vertical VK clips responsively', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const keptIds = ['456241100', '456241491', '456241204', '456241399', '456241520'];
  const removedIds = ['456241327', '456241063', '456241175'];
  const titles = [
    'В чём разница между анестезией, седацией и наркозом?',
    'Лечение зубов во сне у детей',
    'Что взять с собой на лечение зубов во сне?',
    'Анестезиолог отвечает на вопросы пациентов',
    'Отзыв пациента о лечении во сне',
  ];

  assert.equal((html.match(/class="video-card"/g) ?? []).length, 5);
  assert.equal((html.match(/loading="lazy"/g) ?? []).length, 5);
  for (const id of keptIds) assert.match(html, new RegExp(`video_ext\\.php\\?oid=-202085834&amp;id=${id}`));
  for (const id of removedIds) assert.doesNotMatch(html, new RegExp(`video_ext\\.php\\?oid=-202085834&amp;id=${id}`));
  for (const title of titles) assert.ok(html.includes(title));
  assert.match(html, /\.video-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,/s);
  assert.match(html, /\.video-card__media\s*\{[^}]*aspect-ratio:\s*9\s*\/\s*16/s);
  assert.match(html, /@media \(max-width:\s*1199px\)[\s\S]*?\.video-grid\s*\{[^}]*repeat\(3,/);
  assert.match(html, /@media \(max-width:\s*767px\)[\s\S]*?\.video-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`

Expected: the video test fails because the page still contains eight cards, 16:9 media, and a three-column desktop grid.

- [ ] **Step 3: Implement the five-card vertical layout**

In `index.html`:

- Change desktop `.video-grid` to `repeat(5, minmax(0, 1fr))` with compact gaps.
- Change `.video-card__media` to `aspect-ratio: 9 / 16`.
- Change the tablet breakpoint to `@media (max-width: 1199px)` with three columns.
- Preserve `@media (max-width: 767px)` with one column.
- Reduce title size and spacing so the five-card desktop row matches the reference's visual density.
- Remove the complete cards whose iframe IDs are `456241327`, `456241063`, and `456241175`.

The remaining DOM order must be:

```text
456241100, 456241491, 456241204, 456241399, 456241520
```

- [ ] **Step 4: Run the test and confirm it passes**

Run: `npm test`

Expected: all tests pass, including exactly five cards and responsive 5/3/1 CSS.

- [ ] **Step 5: Commit the video-grid change**

```bash
git add index.html tests/site.test.mjs
git commit -m "Update video block to five vertical clips"
```

### Task 2: Remove terminal periods from comparison cells

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: the HTML subsection from `<section class="ac-comparison"` through its closing `</section>`.
- Produces: unchanged comparison copy except that no `.ac-copy` item ends with a period.

- [ ] **Step 1: Add a failing comparison punctuation test**

```js
test('comparison cell items do not end with periods', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const start = html.indexOf('<section class="ac-comparison"');
  const end = html.indexOf('</section>\n\n\n\n    </section>', start);
  const comparison = html.slice(start, end);

  assert.ok(start >= 0, 'comparison section must be present');
  assert.ok(end > start, 'comparison section end must be present');
  assert.doesNotMatch(comparison, /\.<\/p>/);
  assert.match(comparison, /Дети от 3 лет<\/p>/);
  assert.match(comparison, /До 5 000 ₽<\/p>/);
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test`

Expected: the new test fails on existing `.ac-copy` values ending in `.</p>`.

- [ ] **Step 3: Remove only terminal periods inside comparison cell items**

Within the `.ac-comparison` section of `index.html`, change every occurrence of:

```html
<p class="ac-copy">Текст.</p>
<p class="ac-copy ac-price">Цена.</p>
```

to:

```html
<p class="ac-copy">Текст</p>
<p class="ac-copy ac-price">Цена</p>
```

Do not alter punctuation outside `.ac-comparison` or punctuation inside a text item.

- [ ] **Step 4: Run verification**

Run:

```bash
npm test
git diff --check
```

Expected: all tests pass and `git diff --check` produces no output.

- [ ] **Step 5: Verify desktop, tablet, and mobile layouts**

Open the page at 1440×1000, 900×1000, and 390×844. Confirm respectively 5, 3, and 1 video columns, 9:16 media, readable titles, and no horizontal overflow. Expand the comparison details and confirm no visible item ends with a period.

- [ ] **Step 6: Commit the punctuation correction**

```bash
git add index.html tests/site.test.mjs
git commit -m "Remove terminal periods from comparison cells"
```

- [ ] **Step 7: Publish and verify GitHub Pages**

Push `main`, then request the GitHub Pages URL with a commit-based cache-busting query. Confirm all five approved IDs and no removed IDs are present in the deployed HTML.
