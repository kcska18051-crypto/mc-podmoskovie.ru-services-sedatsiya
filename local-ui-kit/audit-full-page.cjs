const fs=require('fs'),path=require('path');const read=f=>fs.readFileSync(path.join(__dirname,f),'utf8');const page=read('implant-full-preview.html');
const checks={
  'Главный баннер и показатели':page.includes('id="fp-hero"')&&read('integrated-implant-hero-preview.html').includes('Более 5 800'),
  'Стоимость и отдельные услуги':page.includes('id="fp-prices"')&&read('integrated-general-pricing-preview.html').includes('Отдельные услуги'),
  'Пять плашек услуг':(read('integrated-service-links-preview.html').match(/class="sl-item"/g)||[]).length===5,
  'Правка статуса центра':page.includes('Единственный в области Центр клинического мастерства Nobel Biocare'),
  'Гарантия от производителей':page.includes('На импланты действует пожизненная гарантия от производителей.'),
  'Карусель из девяти слайдов':(page.match(/class="fp-carousel-slide"/g)||[]).length===9,
  'Planmeca, сканер и шаблоны':page.includes('Planmeca Viso G7')&&page.includes('цифровые оттиски')&&page.includes('assets/surgical-guide-reference.png'),
  'Отдельный блок гарантии':page.includes('id="fp-guarantee"'),
  'Консультация: цена, время и КТ':read('integrated-consultation-preview.html').includes('от 1 800 ₽')&&read('integrated-consultation-preview.html').includes('около 40 минут')&&read('integrated-consultation-preview.html').includes('КТ при необходимости оплачивается отдельно'),
  'Восемь новых ответов плюс статус':(page.match(/id="fp-answer-/g)||[]).length===9,
  'Существующие шесть вопросов':page.includes('Что будет, если отложить имплантацию?')&&page.includes('Почему имплантация это лучший способ протезирования?'),
  'Налоговый вычет после FAQ':page.indexOf('id="fp-tax"')>page.indexOf('id="fp-answer-15"'),
  'Без правовых ссылок под вычетом':!read('integrated-tax-preview.html').includes('class="tx-legal"'),
  'Переход к комментариям':page.includes('Комментарии к 12 задачам'),
  'Оригинальные преимущества сохранены':page.includes('class="fp-original-proofs"')
};for(const [name,ok]of Object.entries(checks))console.log(`${ok?'OK':'FAIL'} ${name}`);if(Object.values(checks).some(v=>!v))process.exitCode=1;
