const fs=require('fs'),path=require('path');const root=__dirname;
function edit(name,fn){const file=path.join(root,name);fs.writeFileSync(file,fn(fs.readFileSync(file,'utf8')))}
// Replace obsolete task notes; source builders and actual UI-kit notes remain in sync.
for(const name of ['build-general-pricing.cjs'])edit(name,s=>s.replace(/<details class="before" open>[\s\S]*?<\/details>/,'<details class="before"><summary>Для клиники и разработчика · цены и состав</summary><ul style="line-height:1.8"><li>Прайс проверен 21.10.2026: хирургический этап All-on-4 Neodent — от 219 000 ₽, Nobel — от 370 000 ₽ за одну челюсть. Это не стоимость всего лечения. Протезирование рассчитывать отдельно.</li><li>Состав хирургического этапа и коронки дополнен по информации клиента. All-on-4: шаблоны 1–3 шт., цифровой макет и 3D-печать, 4 имплантата и 4 мультиюнита, костная пластика только в области имплантатов при необходимости, контрольные КТ и осмотры.</li><li>Сохранить консультацию имплантолога от 1 000 ₽ и добавить совместную консультацию хирурга-имплантолога и ортопеда от 1 800 ₽.</li><li>Уточнить единицу учёта нескольких зубов и подтвердить отдельные суммы протезирования. Старые неподтверждённые суммы 78 500 / 73 000 / 441 000 ₽ не использовать как цену комплексов.</li><li>Прайс: /patients/prices/#implantation. Добавить якорь к разделу «Имплантация зубов». Не суммировать повторно услуги, уже включённые в этап.</li></ul></details>'));
for(const name of ['build-consultation.cjs'])edit(name,s=>s.replace('Сохранить существующий блок и фото.','Показать Геворкяна как хирурга и Десяткина как ортопеда. Состав принимающей пары подтвердить у клиники.'));
let kit=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [name,id] of [['build-general-pricing.cjs','general-pricing'],['build-consultation.cjs','implant-consultation'],['build-service-links.cjs','implant-service-links'],['build-hero.cjs','implant-hero']]){
 const source=fs.readFileSync(path.join(root,name),'utf8');const match=source.match(/const task=`([\s\S]*?)`;/);if(!match)throw Error('Task not found: '+name);
 kit=kit.replace(new RegExp('<article class="task" id="'+id+'"[\\s\\S]*?<\\/article>'),match[1]);
}
kit=kit.replace('Цены из опубликованного прайса. Сумма полного лечения не выводится: состав комплекта нужно подтвердить.','Цены из опубликованного прайса. Состав этапов дополнен по данным клиники от 21.10.2026. Протезирование и хирургический этап указаны отдельно.');
fs.writeFileSync(path.join(root,'index.html'),kit);
// Share the Nobel component with both the mounted repo and the GitHub Pages copy.
for(const dir of ['nobel','../podmoskovie-nobel-zygoma']){const dest=path.resolve(root,dir);for(const name of ['pricing-component.js','treatment-cost.css']){const target=path.join(dest,'pricing',name);if(fs.existsSync(target))fs.copyFileSync(path.join(root,name),target)}}
require('./refine-full-page.cjs');
// Apply at the end of every generated page (including iframes), and persist in builders.
for(const name of fs.readdirSync(root)){
 if(!/\.html$/.test(name)||/^(apply-client|finalize-client|implant-source)/.test(name))continue;
 edit(name,s=>s.includes('href="site-typography.css"')?s:s.replaceAll('</head>','<link rel="stylesheet" href="site-typography.css"></head>'));
}
for(const dir of ['nobel','../podmoskovie-nobel-zygoma']){
 const dest=path.resolve(root,dir);fs.copyFileSync(path.join(root,'site-typography.css'),path.join(dest,'site-typography.css'));
 for(const font of ['montserrat-regular.ttf','montserrat-medium.ttf','montserrat-semibold.ttf','ubuntu-medium.ttf'])fs.copyFileSync(path.join(root,'assets',font),path.join(dest,'assets',font));
 const file=path.join(dest,'index.html');let s=fs.readFileSync(file,'utf8');if(!s.includes('href="site-typography.css"'))s=s.replace('</head>','<link rel="stylesheet" href="site-typography.css"></head>');fs.writeFileSync(file,s);
}
console.log('Notes, integrated pages, shared typography and Nobel copies updated');
