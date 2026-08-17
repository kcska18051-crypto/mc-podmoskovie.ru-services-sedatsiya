import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('published page uses the original Bitrix page markup instead of a reconstruction', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /page--anesthesia-v2/);
  assert.match(html, /anesthesia-and-sedation__heading/);
  assert.match(html, /\/local\/build\/styles\./);
  assert.doesNotMatch(html, /class="hero__grid"/);
});

test('source snapshot resolves original root-relative assets against the client site', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /<base href="https:\/\/www\.mc-podmoskovie\.ru\/">/);
});
