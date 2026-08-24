# VK Video Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add eight client-supplied VK clips with approved titles to the existing “Видео” section on the sedation page.

**Architecture:** Keep the static single-page structure and add a semantic CSS Grid inside the existing `.theater` section. Each card contains one lazy-loaded VK external-player iframe and one visible title; responsive CSS changes the grid from three to two to one column without custom JavaScript.

**Tech Stack:** Static HTML, CSS media queries, VK `video_ext.php` embeds, Node.js built-in test runner.

## Global Constraints

- Use the eight clip IDs and titles exactly as approved in `docs/superpowers/specs/2026-08-24-vk-video-grid-design.md`.
- Desktop uses three equal-width columns, tablet uses two, and mobile uses one.
- Every iframe uses `loading="lazy"`, `allowfullscreen`, and a `title` matching the visible card title.
- Playback stays inside the page; cards must not link users away to VK.
- Add no custom playback JavaScript and no new dependencies.
- Preserve the current clinic typography, turquoise accent, container width, and responsive page behaviour.

---

### Task 1: Responsive VK video cards

**Files:**
- Modify: `index.html` (inline styles and the existing `.theater` section)
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: the existing `.theater.container` section and the static test suite that reads `index.html`.
- Produces: `.video-grid`, eight `.video-card` elements, `.video-card__media`, `.video-card__iframe`, and `.video-card__title`.

- [ ] **Step 1: Write the failing markup contract test**

Append this test to `tests/site.test.mjs`:

```js
test('video section embeds all eight approved VK clips', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const ids = [
    '456241100', '456241491', '456241327', '456241063',
    '456241204', '456241175', '456241399', '456241520',
  ];
  const titles = [
    'В чём разница между анестезией, седацией и наркозом?',
    'Лечение зубов во сне у детей',
    'Соболева Юлия Александровна — врач-анестезиолог-реаниматолог',
    'Соков Андрей Александрович — анестезиолог',
    'Что взять с собой на лечение зубов во сне?',
    'Куликов Евгений Андреевич — врач-анестезиолог',
    'Анестезиолог отвечает на вопросы пациентов',
    'Отзыв пациента о лечении во сне',
  ];

  assert.equal((html.match(/class="video-card"/g) ?? []).length, 8);
  assert.equal((html.match(/loading="lazy"/g) ?? []).length, 8);
  for (const id of ids) assert.match(html, new RegExp(`video_ext\\.php\\?oid=-202085834&amp;id=${id}`));
  for (const title of titles) assert.ok(html.includes(title));
});
```

- [ ] **Step 2: Run the test and verify the red state**

Run:

```powershell
npm test
```

Expected: six existing tests pass and `video section embeds all eight approved VK clips` fails because `.video-card` does not exist.

- [ ] **Step 3: Add responsive grid styles**

Add the following styles to the existing inline project CSS in `index.html`:

```css
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 46px 28px;
  margin-top: 46px;
}
.video-card { min-width: 0; }
.video-card__media {
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background: #202020;
}
.video-card__iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-card__title {
  margin: 16px 0 0;
  color: #009eb4;
  font-family: SiteUbuntu, Ubuntu, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.15;
}
@media (max-width: 991px) {
  .video-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .video-card__title { font-size: 22px; }
}
@media (max-width: 767px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-top: 28px;
  }
  .video-card__media { border-radius: 12px; }
  .video-card__title { margin-top: 12px; font-size: 20px; }
}
```

- [ ] **Step 4: Add the eight cards**

Replace the currently empty body of `<section class="theater container">` after its heading with this pattern, repeated once for each approved ID/title pair:

```html
<div class="video-grid">
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe"
              src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241100&amp;hd=2"
              title="В чём разница между анестезией, седацией и наркозом?"
              loading="lazy"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
              allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">В чём разница между анестезией, седацией и наркозом?</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241491&amp;hd=2" title="Лечение зубов во сне у детей" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Лечение зубов во сне у детей</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241327&amp;hd=2" title="Соболева Юлия Александровна — врач-анестезиолог-реаниматолог" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Соболева Юлия Александровна — врач-анестезиолог-реаниматолог</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241063&amp;hd=2" title="Соков Андрей Александрович — анестезиолог" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Соков Андрей Александрович — анестезиолог</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241204&amp;hd=2" title="Что взять с собой на лечение зубов во сне?" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Что взять с собой на лечение зубов во сне?</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241175&amp;hd=2" title="Куликов Евгений Андреевич — врач-анестезиолог" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Куликов Евгений Андреевич — врач-анестезиолог</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241399&amp;hd=2" title="Анестезиолог отвечает на вопросы пациентов" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Анестезиолог отвечает на вопросы пациентов</h3>
  </article>
  <article class="video-card">
    <div class="video-card__media">
      <iframe class="video-card__iframe" src="https://vk.com/video_ext.php?oid=-202085834&amp;id=456241520&amp;hd=2" title="Отзыв пациента о лечении во сне" loading="lazy" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock" allowfullscreen></iframe>
    </div>
    <h3 class="video-card__title">Отзыв пациента о лечении во сне</h3>
  </article>
</div>
```

- [ ] **Step 5: Run automated verification**

Run:

```powershell
npm test
git diff --check
```

Expected: all tests pass with zero failures, and `git diff --check` exits successfully.

- [ ] **Step 6: Commit the feature**

```powershell
git add index.html tests/site.test.mjs
git commit -m "Add VK video grid"
```

### Task 2: Responsive and published-page verification

**Files:**
- Verify: `index.html`
- Verify: GitHub Pages deployment

**Interfaces:**
- Consumes: the eight-card `.video-grid` produced by Task 1.
- Produces: a verified GitHub Pages URL for client review.

- [ ] **Step 1: Check desktop rendering at 1440 × 1000**

Open the local page, set the browser viewport to `1440 × 1000`, and verify:

```text
video-card count = 8
computed grid-template-columns = three columns
horizontal overflow = false
all iframe clientWidth/clientHeight values are greater than zero
```

- [ ] **Step 2: Check mobile rendering at 390 × 844**

Set the browser viewport to `390 × 844` and verify:

```text
video-card count = 8
computed grid-template-columns = one column
horizontal overflow = false
every visible heading is readable below its corresponding player
```

- [ ] **Step 3: Push and confirm deployment**

```powershell
git push origin main
```

Poll the cache-busted GitHub Pages URL until it contains all eight clip IDs and the eight titles. Confirm that the page and VK iframe URLs return successful HTTP responses.

- [ ] **Step 4: Re-run final verification**

```powershell
npm test
git status --short
```

Expected: all tests pass and the worktree is clean.
