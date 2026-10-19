const fs=require('fs');const file=__dirname+'/index.html';let page=fs.readFileSync(file,'utf8');
const start=page.indexOf('<article class="task" id="nobel-status">');const end=page.indexOf('</article>',start);
if(start<0||end<0)throw Error('Task 1 not found');
let task=page.slice(start,end);
task=task.replace('Расположение: после главного баннера, вторым–третьим блоком.','Расположение на Nobel: после блока «Не уверены, какая система подойдёт вам?», перед разделом «Скуловая имплантация Zygoma».');
if(!task.includes('assets/nobel-status-placement.png'))task=task.replace('<div class="preview-heading">','<details class="before"><summary>Для разработчика · место размещения баннера на Nobel</summary><img src="assets/nobel-status-placement.png" alt="Баннер о статусе Nobel разместить в отмеченной области после блока «Не уверены, какая система подойдёт вам?» и перед разделом Zygoma"></details><div class="preview-heading">');
page=page.slice(0,start)+task+page.slice(end);fs.writeFileSync(file,page);
console.log('Task 1 placement screenshot added');
