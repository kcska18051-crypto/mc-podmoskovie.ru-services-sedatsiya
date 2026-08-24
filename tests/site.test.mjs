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

test('static preview restores the original interactive controls', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(html, /data-doctor-tabs-behavior/);
  assert.match(html, /role', 'tablist'/);
  assert.match(html, /data-reviews-behavior/);
  assert.match(html, /swiper-slide-active/);
  assert.match(html, /data-form-fallback-behavior/);
  assert.match(html, /Введённые данные не передаются через демо-страницу/);
});

test('static preview removes known visual regressions', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.equal((html.match(/ещё 3 раздела/g) ?? []).length, 2);
  assert.doesNotMatch(html, /ещё 4 раздела/);
  assert.match(html, /<section class="theater container">\s*<h2 class="theater__heading title">\s*Видео\s*<\/h2>\s*<div class="video-grid">/s);
  assert.doesNotMatch(html, /theater--empty/);
  assert.match(html, /\.answers__label[^}]+font-family:\s*SiteUbuntu/s);
  assert.match(html, /для взрослых и детей в Ярославле/);
  assert.doesNotMatch(html, /для взрослых и детей я Ярославле/);
});

test('approved content corrections are present', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(html, /а из-за волнения, страха повысилось давление\s*<\/div>/);
  assert.doesNotMatch(html, /а из-за волнения, страха повысилось давление\./);
  assert.match(html, /антидот Дантролен/);
  assert.doesNotMatch(html, /Дентролен/);
  assert.match(html, /Следуйте индивидуальной памятке\.<\/p>/);
  assert.doesNotMatch(html, /индивидуальной памятке врача/);
  assert.match(html, /assets\/anesthesiologist-control-banner\.png/);
  assert.doesNotMatch(html, /Почему до&nbsp;недавнего времени общий наркоз/);
});

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
  for (const id of ids) {
    assert.match(html, new RegExp(`video_ext\\.php\\?oid=-202085834&amp;id=${id}`));
  }
  for (const title of titles) assert.ok(html.includes(title));
});
