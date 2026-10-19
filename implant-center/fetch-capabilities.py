from pathlib import Path
import re,urllib.request,shutil
root=Path(__file__).parent
s=(root/'clinic-reference.html').read_text(encoding='utf-8-sig')
terms=['Компьютерная томография','Компьютерная томография','Лечение во сне','Решение сложных случаев','Гарантия качества','Современная зуботехническая лаборатория']
for i,term in enumerate(terms):
    start=s.find('benefit-heading h3">'+term)
    if start<0:start=s.find(term,s.find('implant-benefit'))
    part=s[start:start+6000]
    m=re.search(r'(?:data-)?src="([^"]+__desktop.png)"',part)
    if m:
        url='https://www.mc-podmoskovie.ru'+m.group(1)
        urllib.request.urlretrieve(url,root/f'dist/assets/capability-{i}.png')
        print(i,m.group(1))
    else:print('MISSING',i)
