const fs=require('fs'),path=require('path');const root=__dirname;
const art={'price-single.png':'tooth-single-premium-v2.png','price-several.png':'bridge-premium-v2.png','price-full.png':'jaw-full-premium-v3.png'};
const visual='<div class="ih-visual ih-visual-jaw" aria-label="Объёмная иллюстрация протезирования на четырёх имплантатах"><figure class="ih-jaw"><img src="assets/jaw-full-premium-v3.png" alt="Зубной протез над четырьмя имплантатами: схема All-on-4" width="1536" height="1024"></figure><div class="ih-tech"><img src="assets/scanner-cutout.png" alt="" width="86" height="60"><div><strong>Цифровое планирование лечения</strong><span>3D-сканер Medit i700 · Diagnocat</span></div></div></div>';
function replaceVisual(s){const start=s.indexOf('<div class="ih-visual"');if(start<0)return s;const re=/<\/?div\b[^>]*>/g;re.lastIndex=start;let depth=0,m;while((m=re.exec(s))){depth+=m[0].startsWith('</')?-1:1;if(depth===0)return s.slice(0,start)+visual+s.slice(re.lastIndex)}throw Error('Unclosed visual')}
for(const file of fs.readdirSync(root)){
 if(!/\.(html|cjs|js)$/.test(file)||['apply-premium-art.cjs','apply-client-revisions.cjs','implant-source.html'].includes(file))continue;
 const p=path.join(root,file);let s=fs.readFileSync(p,'utf8');
 for(const [old,newName]of Object.entries(art))s=s.replaceAll(old,newName);
 if(['build-hero.cjs','implant-hero-preview.html'].includes(file))s=replaceVisual(s).replace('МАКЕТ · Экран Diagnocat показан условно.','МАКЕТ · Обновлённая подача имплантации и протезирования.');
 fs.writeFileSync(p,s);
}
for(const dir of ['nobel','../podmoskovie-nobel-zygoma']){
 const dest=path.resolve(root,dir,'pricing/assets');
 for(const name of Object.values(art))fs.copyFileSync(path.join(root,'assets',name),path.join(dest,name));
}
require('./finalize-client-revisions.cjs');
console.log('Premium dental art applied to hero and all pricing previews');
