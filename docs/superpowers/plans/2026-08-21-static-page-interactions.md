# Static Page Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the interactive controls that were lost when the Bitrix page was saved as a static GitHub Pages preview.

**Architecture:** Keep `index.html` self-contained. Add small scoped behavior scripts for doctor tabs, reviews, and the appointment fallback, plus narrowly targeted CSS overrides. Extend the existing Node tests to prevent regressions.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node test runner, Playwright browser verification.

## Global Constraints

- Do not alter the approved comparison-table or FAQ layouts.
- Do not send patient name or phone data from GitHub Pages.
- Keep desktop and mobile behavior identical.

---

### Task 1: Define regression coverage

**Files:**
- Modify: `tests/site.test.mjs`

- [ ] Add assertions for the doctor-tab, review, and form-fallback scripts.
- [ ] Add assertions for the three-section counter, empty-video marker, FAQ font override, and corrected page title.
- [ ] Run `npm test` and verify the new assertions fail because the fixes are absent.

### Task 2: Restore static interactions

**Files:**
- Modify: `index.html`

- [ ] Add scoped CSS for the FAQ font, empty video section, and static review slides.
- [ ] Add doctor-tab behavior with one active panel and ARIA state.
- [ ] Add review previous/next behavior with pagination and disabled boundary buttons.
- [ ] Add the safe form fallback that validates locally and opens the clinic Telegram link without serializing entered fields.
- [ ] Correct the comparison counter and page title.
- [ ] Run `npm test` and verify all assertions pass.

### Task 3: Responsive verification and publication

**Files:**
- Verify: `index.html`

- [ ] Run Playwright checks at 1440×1000 and 390×844.
- [ ] Verify doctor tabs, all review positions, FAQ, comparison toggle, and form destination.
- [ ] Verify there is no horizontal overflow, no broken image, and no visible empty video heading.
- [ ] Commit, push to `main`, and verify the deployed GitHub Pages URL.
