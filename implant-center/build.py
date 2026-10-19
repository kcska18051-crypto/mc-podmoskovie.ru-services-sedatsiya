from pathlib import Path
import re,base64,hashlib,shutil
root=Path(__file__).parent
out=root/'dist'; assets=out/'assets'; assets.mkdir(exist_ok=True,parents=True)
s=(root.parent/'implant-reference.html').read_text(encoding='utf-8-sig')
def extract(m):
    mime,data=m.group(1),m.group(2)
    raw=base64.b64decode(data)
    ext={'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/svg+xml':'svg','font/woff2':'woff2','application/font-woff2':'woff2'}.get(mime,'woff2' if 'font' in mime else 'bin')
    name=hashlib.sha256(raw).hexdigest()[:14]+'.'+ext
    (assets/name).write_bytes(raw)
    return 'assets/'+name
s=re.sub(r'data:([^;,]+);base64,([A-Za-z0-9+/=\r\n]+)',extract,s)
css=re.search(r'<style>(.*?)</style>',s,re.S).group(1).replace('font-display:block','font-display:swap')
shutil.copyfile(root/'styles.css',out/'styles.css')
s=re.sub(r'<style>.*?</style>','',s,flags=re.S)
s=re.sub(r'<meta[^>]+>|<title>.*?</title>','',s)
s=re.sub(r'\s+onsubmit="[^"]*"','',s)
s=re.sub(r'<script>.*?</script>','',s,flags=re.S)
shutil.copyfile(root.parent/'artwork/dental-implant-hero.png',assets/'implant.png')
shutil.copyfile(root.parent/'artwork/dental-arch.png',assets/'arch.png')
shutil.copyfile(Path('C:/Users/User/Downloads/Telegram Desktop/Подмосковье.svg'),assets/'logo.svg')
s=re.sub(r'(<header.*?<img )src="[^"]*"',r'\1src="assets/logo.svg"',s,count=1,flags=re.S)
s=s.replace('</header>','''<button class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="main-nav">☰</button><nav id="main-nav" aria-label="Разделы страницы"><div class="wrap"><a href="#tseny">Решения и цены</a><a href="#nobel">О центре</a><a href="#etapy">Этапы лечения</a><a href="#vrachi">Врачи</a><a href="#otzyvy">Отзывы</a><a href="#faq">Вопросы</a></div></nav></header>''')
s=s.replace('<div class="hero-copy">','''<div class="hero-copy"><img class="hero-art" src="assets/implant.png" alt="Имплантат, абатмент и коронка: объёмная иллюстрация конструкции"><div class="implant-caption">Коронка <span>↓</span> Абатмент <span>↓</span> Имплантат</div>''')
s=re.sub(r'(<p class="hero-sub">).*?(</p>)',r'\1От одного зуба до всей челюсти. Планируем лечение в 3D, устанавливаем имплантаты и создаём протезы в собственной лаборатории.\2',s,flags=re.S)
s=s.replace('<div class="hero">','<main><div class="hero">',1).replace('<footer class="foot">','</main><footer class="foot">',1)
s=s.replace('Верните зубы<br>за одно посещение','Центр имплантации.<br><em>Вернём уверенность</em><br>в вашей улыбке')
s=s.replace('От одного импланта до всей челюсти по протоколу All-on-4. Авторизованный центр Nobel Biocare, приживаемость 99 %.','От одного зуба до всей челюсти. Планируем лечение в 3D, устанавливаем имплантаты и создаём протезы в собственной лаборатории.')
s=s.replace('</p>\n    </div>\n\n    <form class="hero-form"','</p>\n    </div>\n\n    <form class="hero-form"')
s=s.replace('<div class="hero-eyebrow">','<div class="hero-eyebrow">')
s=s.replace('<div class="plans">','''<div class="arch-story"><div><span class="eyebrow">ALL-ON-4 · ВОССТАНОВЛЕНИЕ ВСЕЙ ЧЕЛЮСТИ</span><h3>Четыре опоры.<br>Целая улыбка.</h3><p>Несъёмный протез опирается на четыре имплантата. Временные зубы — в день операции, если это позволяет клиническая ситуация.</p><a href="#zapis" class="text-link">Обсудить мой случай <span>↗</span></a></div><figure><img src="assets/arch.png" alt="Иллюстрация зубного ряда на четырёх имплантатах" loading="lazy"><figcaption>Иллюстрация принципа протезирования</figcaption></figure></div><div class="plans">''')
s=s.replace('<h2>Шесть этапов','<h2 id="etapy">Шесть этапов').replace('<h2>О чём спрашивают','<h2 id="faq">О чём спрашивают')
def restyle_faq(match):
    block=match.group(0)
    block=block.replace('<section>', '<section class="faq-section" id="faq">',1)
    block=block.replace('<div class="wrap">','<div class="wrap faq-layout">',1)
    block=block.replace('<h2 id="faq">О чём спрашивают на приёме</h2>','<div class="faq-intro"><h2>Частые вопросы об имплантации</h2><p>Коротко о подготовке, лечении и восстановлении</p></div>')
    block=block.replace('<details open>','<details>')
    count=iter(range(1,20))
    block=re.sub(r'<summary>(.*?)</summary>',lambda q: '<summary><span class="faq-number" aria-hidden="true">'+str(next(count))+'/</span><span>'+q.group(1)+'</span></summary>',block,flags=re.S)
    return block
s=re.sub(r'<section>\s*<div class="wrap">\s*<h2 id="faq">.*?</section>',restyle_faq,s,flags=re.S)
s=s.replace('Шесть этапов от осмотра до коронки','Этапы лечения')
s=re.sub(r'<section class="promo-wrap">.*?</section>',lambda m: m.group(0).replace('<br>',' '),s,flags=re.S)
s=re.sub(r'<img(?![^>]*class="hero-art")', '<img loading="lazy"',s)
s=s.replace('<img loading="lazy" src="assets/logo.svg"','<img src="assets/logo.svg"')
s=re.sub(r'loading="lazy"([^>]*?)loading="lazy"',r'loading="lazy"\1',s)
s=s.replace('name="name"','name="name" autocomplete="name"').replace('name="phone"','name="phone" autocomplete="tel" minlength="10"')
from revision import revise
s=revise(s)
from media_sections import add_media
s=add_media(s)
s='<!doctype html><html lang="ru" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Центр имплантации Подмосковье — Ярославль</title><meta name="robots" content="noindex,nofollow"></head><body><a class="skip" href="#tseny">К содержанию</a>'+s+'<dialog id="demo-dialog"><button class="dialog-close" aria-label="Закрыть">×</button><h3>Форма готова к подключению</h3><p>Это локальная версия сайта. Заявка не отправлена.</p><p>Для записи: <a href="tel:+74852744545">+7 (4852) 74-45-45</a></p></dialog><script src="app.js?v=media13"></script></body></html>'
s=re.sub(r'<footer class="foot">.*?</footer>',(Path(__file__).parent/'footer.html').read_text(encoding='utf-8'),s,flags=re.S)
s=s.replace('+74852744545','+74852608062').replace('+7 (4852) 74-45-45','+7 (4852) 60-80-62')
s=s.replace('<script src="app.js', '<aside class="cookie-banner" aria-label="Использование cookie" hidden><p>Мы используем файлы Куки (cookie) для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с <a href="https://www.mc-podmoskovie.ru/policy/" target="_blank" rel="noopener">Политикой конфиденциальности</a> и <a href="https://www.mc-podmoskovie.ru/upload/iblock/3b1/lxvim629l18wbpdlkvx025ks8g39gh2w.pdf" target="_blank" rel="noopener">Политикой Куки (cookie)</a>.</p><button type="button" class="cookie-btn">Принять</button></aside><script src="app.js')
s=s.replace('app.js?v=media13','app.js?v=footer15')
s=re.sub(r'<link rel="stylesheet"[^>]*>','',s)
s=s.replace('</head>','<link rel="stylesheet" href="styles.css?v=clean18"></head>')
(out/'index.html').write_text(s,encoding='utf-8')
print('Built local page, assets:',len(list(assets.iterdir())))




















