from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
root=Path(__file__).parent/'dist'
class Check(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.anchors=[];self.missing=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        for key in ['src','href']:
            val=a.get(key,'')
            if val.startswith('#'):self.anchors.append(val[1:])
            elif val and not urlsplit(val).scheme and not (root/urlsplit(val).path).exists():self.missing.append(val)
c=Check();c.feed((root/'index.html').read_text(encoding='utf-8'))
assert not c.missing,c.missing
assert len(set(c.ids))==len(c.ids),'Duplicate ids'
assert all(a in c.ids for a in c.anchors),'Broken anchors'
print('Local assets, IDs and anchors: OK')

import re
html=(root/'index.html').read_text(encoding='utf-8-sig')
links=re.findall(r'<link rel="stylesheet" href="([^"]+)"',html)
assert links==['styles.css?v=clean18'],links
assert (root/'styles.css').read_bytes()==(root.parent/'styles.css').read_bytes(),'CSS differs from canonical source'
assert sorted(p.name for p in root.glob('*.css'))==['styles.css'],'Legacy styles in dist'
print('Single canonical stylesheet: OK')
