const fs=require('fs');
const explanation=`<p><strong>Дополнительное размещение на странице Nobel</strong><br>Страница: <a href="https://www.mc-podmoskovie.ru/services/implant/implant-nobel-biocar/" target="_blank" rel="noopener">Nobel Biocare и Zygoma</a>. Разместить новый отдельный блок гарантии после блока «Из чего складывается стоимость лечения» из задачи № 2 и перед существующим разделом «Гарантии и уход за имплантами».</p><p><strong>Порядок блоков:</strong> «Как проходит лечение — 4 шага» → стоимость лечения (задача № 2) → новый блок гарантии (задача № 4) → уход за имплантами → отзывы. Если изменения внедряются одновременно, соблюдать именно этот порядок.</p><p><strong>Адаптация текста для Nobel.</strong> Использовать тот же дизайн нового блока. Заголовок: «Пожизненная гарантия на импланты Nobel Biocare». В подзаголовке указать: «Объясним условия гарантии производителя Nobel Biocare и ответим на ваши вопросы до начала лечения». Не переносить обобщение «от производителей» и упоминания других систем на эту страницу. Мягкое пояснение внизу сохранить: «До начала лечения мы объясним, что покрывает гарантия производителя и какие условия действуют на работу клиники». Кнопку «Обсудить гарантию с врачом» связать с существующей формой записи на консультацию на странице Nobel.</p><p><strong>Что сделать с текущим разделом.</strong> Переименовать «Гарантии и уход за имплантами» в «Уход за имплантами». Убрать из него только повторяющуюся строку «Пожизненная гарантия производителя на замену импланта при отторжении». Остальные пункты и изображение сохранить. Это даст отдельный блок с условиями гарантии и следующий за ним раздел об уходе.</p>`;
for(const name of ['index.html','build-general-banners.cjs']){
const file=__dirname+'/'+name;let text=fs.readFileSync(file,'utf8');
if(text.includes('Дополнительное размещение на странице Nobel'))continue;
const start=text.indexOf('<article class="task" id="general-banners"');const end=text.indexOf('</article>',start);
if(start<0||end<0)throw Error('Task 4 not found in '+name);
let task=text.slice(start,end);
task=task.replace('>Общая имплантация ↗</a></div></header>','>Общая имплантация ↗</a><a href="https://www.mc-podmoskovie.ru/services/implant/implant-nobel-biocar/" target="_blank" rel="noopener">Nobel · новый блок гарантии ↗</a></div></header>');
const marker='<p style="margin-bottom:0">Рабочий сайт не изменён.';
if(!task.includes(marker))throw Error('Comment insertion point not found');
task=task.replace(marker,explanation+marker);
text=text.slice(0,start)+task+text.slice(end);fs.writeFileSync(file,text);
}
console.log('Task 4: Nobel placement instructions added');
