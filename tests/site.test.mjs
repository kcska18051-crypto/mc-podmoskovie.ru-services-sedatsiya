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
  assert.match(html, /<base href="https:\/\/www\.mc-podmoskovie\.ru\/services\/sedatsiya\/">/);
});

test('FAQ replaces the legacy safety accordion with eight patient questions', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const faqStart = html.indexOf('Частые вопросы о лечении во сне');
  const faqEnd = html.indexOf('</div>\n\n\n        </div>\n    </section>', faqStart);
  const faq = html.slice(faqStart, faqEnd);

  assert.ok(faqStart >= 0, 'FAQ heading must be present');
  assert.equal((faq.match(/class="answers__item"/g) ?? []).length, 8);
  assert.match(faq, /Как выбирают подходящий метод\?/);
  assert.match(faq, /Сколько стоит лечение во сне\?/);
  assert.doesNotMatch(html, /Все честно!/);
  assert.doesNotMatch(html, /Это точно безопасно\?/);
  assert.match(html, /data-faq-behavior/);
  assert.match(html, /answers__item--expanded/);
});
