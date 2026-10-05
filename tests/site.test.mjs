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

test('FAQ covers ten patient questions including preparation and treatment day', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const faqStart = html.indexOf('Частые вопросы о лечении во сне');
  const faqEnd = html.indexOf('</div>\n\n\n        </div>\n    </section>', faqStart);
  const faq = html.slice(faqStart, faqEnd);

  assert.ok(faqStart >= 0, 'FAQ heading must be present');
  assert.equal((faq.match(/class="answers__item"/g) ?? []).length, 10);
  assert.match(faq, /Как выбирают подходящий метод\?/);
  assert.match(faq, /Сколько стоит лечение во сне\?/);
  assert.match(faq, /Какие анализы необходимо сдать и как получить допуск\?/);
  assert.match(faq, /Как проходит день лечения\?/);
  assert.match(faq, /Скачать памятку по подготовке/);
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

test('comparison cell items do not end with periods', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const start = html.indexOf('<section class="ac-comparison"');
  const end = html.indexOf('data-sedation-consultation', start);
  const comparison = html.slice(start, end);

  assert.ok(start >= 0, 'comparison section must be present');
  assert.ok(end > start, 'comparison section end must be present');
  assert.doesNotMatch(comparison, /\.<\/p>/);
  assert.match(comparison, /Дети от 3 лет<\/p>/);
  assert.match(comparison, /До 5 000 ₽<\/p>/);
});

test('new patient journey follows the comparison table in the approved order', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const prices = html.indexOf('<section class="ac-comparison"');
  const procedures = html.indexOf('data-sedation-procedures');
  const steps = html.indexOf('data-sedation-steps');
  const consultation = html.indexOf('data-sedation-consultation');

  assert.ok(prices >= 0, 'comparison and prices are present');
  assert.ok(prices < consultation, 'consultation follows prices');
  assert.ok(consultation < procedures, 'procedures follow consultation');
  assert.ok(procedures < steps, 'five-step journey follows procedures');
});

test('journey has five stages and a booking card with form and Telegram', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.equal((html.match(/data-step-card/g) ?? []).length, 5);
  assert.equal((html.match(/data-booking-card/g) ?? []).length, 1);
  assert.match(html, /data-online-booking-link[^>]*>Записаться через форму/);
  assert.match(html, /href="https:\/\/t\.me\/mcpodmoskovie_bot"[^>]*>Написать в Telegram/);
  assert.match(html, /data-sedation-consultation[\s\S]*Консультация анестезиолога[\s\S]*1 000 ₽/);
  assert.match(html, /class="engage container" id="online-booking"/);
  assert.match(html, /data-online-booking-behavior/);
});

test('new blocks include responsive scoped styles', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(html, /<style id="sedation-page-updates">/);
  assert.match(html, /\.sedation-steps__list/);
  assert.match(html, /@media \(max-width: 767px\)/);
});

test('procedures block uses the clinic-based sedation scene with heading spacing', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

  assert.match(html, /data-sedation-procedures[\s\S]*assets\/sedation-treatment-scene\.png/);
  assert.match(html, /\.sedation-procedures\s*>\s*\.title\s*\{[^}]*margin-bottom:\s*36px/s);
  assert.match(html, /@media \(max-width:\s*767px\)[\s\S]*\.sedation-procedures\s*>\s*\.title\s*\{[^}]*margin-bottom:\s*24px/s);
});
