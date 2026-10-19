const fs = require('fs');
const csso = require('csso');
const prettier = require('prettier');
const postcss = require('postcss');
(async()=>{
 const before=fs.readFileSync('dist/styles.css','utf8');
 fs.mkdirSync('audit/css-cleanup',{recursive:true});
 fs.writeFileSync('audit/css-cleanup/before.css',before);
 const result=csso.minify(before,{restructure:true}).css;
 const formatted=await prettier.format(result,{parser:'css',printWidth:100});
 fs.writeFileSync('audit/css-cleanup/optimized.css',formatted);
 for(const [name,css] of [['before',before],['optimized',formatted]]){
 let rules=0,decls=0; const ast=postcss.parse(css); ast.walkRules(()=>rules++); ast.walkDecls(()=>decls++);
 console.log({name,bytes:Buffer.byteLength(css),rules,decls});
 }
})();
