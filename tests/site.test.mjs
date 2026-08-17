import test from 'node:test';
import assert from 'node:assert/strict';

import {
  nextReviewIndex,
  selectedPanelState,
  toggleExpandedState,
  preventStaticFormSubmission,
} from '../js/main.js';

test('toggleExpandedState flips the disclosed state', () => {
  assert.equal(toggleExpandedState(false), true);
  assert.equal(toggleExpandedState(true), false);
});

test('selectedPanelState selects exactly the requested panel', () => {
  assert.deepEqual(selectedPanelState(3, 1), [false, true, false]);
  assert.deepEqual(selectedPanelState(3, 2), [false, false, true]);
});

test('nextReviewIndex stops at both slider boundaries', () => {
  assert.equal(nextReviewIndex(0, -1, 3), 0);
  assert.equal(nextReviewIndex(0, 1, 3), 1);
  assert.equal(nextReviewIndex(2, 1, 3), 2);
});

test('preventStaticFormSubmission cancels submission', () => {
  let prevented = false;
  preventStaticFormSubmission({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
});
