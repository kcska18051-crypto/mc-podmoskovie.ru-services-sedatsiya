const fs = require('fs');
const postcss = require('postcss');
const csso = require('csso');
const prettier = require('prettier');
const input=fs.readFileSync(process.argv.includes('--final')?'audit/css-cleanup/optimized.css':'audit/css-cleanup/before.css','utf8');
const root=postcss.parse(input);
// Removed markup: legacy promo/pricing/system/benefit/footer cards and captions.
// Dynamic iframe, :hover, :focus, [open], [hidden] and selected-tab rules are retained.
const obsolete=/\.(?:num|pr|promo|promo-wrap|plan|plans|sys|systems|feat|feats|ic|rs-meta|foot|foot-grid|legal|arch-story|implant-caption)(?![\w-])|\.step\s+\.when\b/;
root.walkRules(rule=>{const keep=rule.selectors.filter(s=>!obsolete.test(s)); if(keep.length)rule.selectors=keep;else rule.remove();});
const normal=s=>s.replace(/\s+/g,'').toLowerCase();
const edges=['top','right','bottom','left'];
const expand=p=> {
 if(['margin','padding','inset'].includes(p))return edges.map(e=>p==='inset'?e:p+'-'+e);
 if(p==='border')return edges.flatMap(e=>['width','style','color'].map(t=>'border-'+e+'-'+t));
 if(/^border-(width|style|color)$/.test(p))return edges.map(e=>'border-'+e+'-'+p.slice(7));
 if(/^border-(top|right|bottom|left)$/.test(p))return ['width','style','color'].map(t=>p+'-'+t);
 const map={background:['background-image','background-position','background-size','background-repeat','background-origin','background-clip','background-attachment','background-color'],font:['font-family','font-size','font-weight','font-style','font-stretch','font-variant','line-height'],flex:['flex-grow','flex-shrink','flex-basis'], 'flex-flow':['flex-direction','flex-wrap'],gap:['row-gap','column-gap'],overflow:['overflow-x','overflow-y'],'border-radius':['border-top-left-radius','border-top-right-radius','border-bottom-right-radius','border-bottom-left-radius']};
 return map[p]||[p];
};
// Split selector lists only for analysis; CS SO safely combines them after pruning.
root.walkRules(rule=>{if(rule.parent.type==='atrule'&&/keyframes$/i.test(rule.parent.name))return; if(rule.selectors.length>1){for(const selector of rule.selectors)rule.cloneBefore({selector});rule.remove();}});
const rules=[];
root.walkRules(rule=>{let ctx=[];for(let p=rule.parent;p&&p.type!=='root';p=p.parent){if(p.type==='atrule')ctx.unshift(p.name+':'+normal(p.params));} if(ctx.some(c=>c.includes('keyframes')))return;rules.push({rule,ctx});});
let removed=0;
const later=new Map();
for(const {rule,ctx} of rules.reverse()){
 const key=rule.selector.trim().replace(/\s+/g,' '); const seen=later.get(key)||[];
 for(const d of [...rule.nodes].reverse()){
  if(d.type!=='decl')continue;
  const props=expand(d.prop.toLowerCase());
  const covered=props.every(prop=>seen.some(x=>x.props.includes(prop)&&(!d.important||x.important)&&x.ctx.every(c=>ctx.includes(c))));
  if(covered){d.remove();removed++;} else seen.push({props,important:d.important,ctx});
 }
 later.set(key,seen);
 if(!rule.nodes.some(n=>n.type==='decl'))rule.remove();
}
root.walkComments(c=>c.remove());
let empty=true;while(empty){empty=false;root.walkAtRules(r=>{if(r.nodes&&!r.nodes.length){r.remove();empty=true;}});}
// Rejoin adjacent selector groups only; no declarations cross another rule.
root.walkRules(rule=>{let n=rule.next();const signature=r=>r.nodes.map(d=>d.type==='decl'?d.prop+':'+d.value+':'+!!d.important:d.toString()).join(';');while(n&&n.type==='rule'&&signature(n)===signature(rule)){rule.selectors=[...new Set([...rule.selectors,...n.selectors])];n.remove();n=rule.next();}});
(async()=>{
const result=process.argv.includes('--final')?root.toString():csso.minify(root.toString(),{restructure:true}).css;
const formatted=await prettier.format(result,{parser:'css',printWidth:100});
fs.writeFileSync('audit/css-cleanup/optimized.css',formatted);
let decls=0,rules=0;postcss.parse(formatted).walkDecls(()=>decls++);postcss.parse(formatted).walkRules(()=>rules++);
console.log({removed,remainingDeclarations:decls,remainingRules:rules,bytes:Buffer.byteLength(formatted)});
})();

