export function toggleExpandedState(expanded) {
  return !expanded;
}

export function selectedPanelState(count, selectedIndex) {
  return Array.from({ length: count }, (_, index) => index === selectedIndex);
}

export function nextReviewIndex(currentIndex, direction, count) {
  return Math.min(Math.max(currentIndex + direction, 0), count - 1);
}

export function preventStaticFormSubmission(event) {
  event.preventDefault();
}

export function initAccordions(root) {
  root.querySelectorAll('[data-accordion]').forEach((item) => {
    const button = item.querySelector('button');
    const content = Array.from(item.children).find((child) => child !== button);
    if (!button || !content) return;

    button.addEventListener('click', () => {
      const expanded = toggleExpandedState(button.getAttribute('aria-expanded') === 'true');
      button.setAttribute('aria-expanded', String(expanded));
      content.hidden = !expanded;
      item.classList.toggle('is-open', expanded);
      const label = button.querySelector('.toggle-label');
      if (label) label.textContent = expanded ? 'Свернуть' : 'Развернуть';
    });
  });
}

export function initDoctorTabs(root) {
  const tabs = Array.from(root.querySelectorAll('[data-doctor-tab]'));
  const panels = Array.from(root.querySelectorAll('[data-doctor-panel]'));

  tabs.forEach((tab, selectedIndex) => {
    tab.addEventListener('click', () => {
      const state = selectedPanelState(panels.length, selectedIndex);
      tabs.forEach((candidate, index) => candidate.setAttribute('aria-selected', String(state[index])));
      panels.forEach((panel, index) => { panel.hidden = !state[index]; });
    });
  });
}

export function initReviewSlider(root) {
  const slider = root.querySelector('[data-review-slider]');
  if (!slider) return;
  const reviews = Array.from(slider.querySelectorAll('[data-review]'));
  const previous = slider.querySelector('[data-review-prev]');
  const next = slider.querySelector('[data-review-next]');
  const current = slider.querySelector('[data-review-current]');
  const total = slider.querySelector('[data-review-total]');
  let index = 0;

  const render = () => {
    reviews.forEach((review, reviewIndex) => { review.hidden = reviewIndex !== index; });
    if (current) current.textContent = String(index + 1);
    if (total) total.textContent = String(reviews.length);
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === reviews.length - 1;
  };

  previous?.addEventListener('click', () => { index = nextReviewIndex(index, -1, reviews.length); render(); });
  next?.addEventListener('click', () => { index = nextReviewIndex(index, 1, reviews.length); render(); });
  render();
}

export function initMobileNavigation(root) {
  const toggle = root.querySelector('[data-menu-toggle]');
  const menu = root.querySelector('[data-menu]');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const expanded = toggleExpandedState(toggle.getAttribute('aria-expanded') === 'true');
    toggle.setAttribute('aria-expanded', String(expanded));
    menu.classList.toggle('is-open', expanded);
  });
}

export function disableStaticForms(root) {
  root.querySelectorAll('[data-static-form]').forEach((form) => {
    form.addEventListener('submit', preventStaticFormSubmission);
  });
}

export function initPage(root = document) {
  initAccordions(root);
  initDoctorTabs(root);
  initReviewSlider(root);
  initMobileNavigation(root);
  disableStaticForms(root);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPage(document));
  } else {
    initPage(document);
  }
}
