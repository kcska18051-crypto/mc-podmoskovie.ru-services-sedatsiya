const http=require('http');
const fs=require('fs');
const path=require('path');
const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};
http.createServer((req,res)=>{
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return}
  const mount=name.startsWith('/nobel/')?path.resolve(root,'../podmoskovie-nobel-zygoma'):root;
  if(name.startsWith('/nobel/'))name=name.slice('/nobel'.length);
  else if(name.startsWith('/local-ui-kit/'))name=name.slice('/local-ui-kit'.length);
  if(name.endsWith('/'))name+='index.html';
  const file=path.resolve(mount,'.'+name);
  if(!file.startsWith(mount+path.sep)){res.writeHead(403);res.end();return}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
}).listen(8766,'127.0.0.1',()=>console.log('http://127.0.0.1:8766'));
