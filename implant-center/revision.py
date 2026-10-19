import re
from pathlib import Path

def revise(s):
    s=s.replace('Консультация с диагностикой','Совместная консультация хирурга и ортопеда')
    s=s.replace('осмотр хирурга и ортопеда, разбор снимка, план и смета лечения','<span class="consultation-exclusions">Снимок и хирургический шаблон не входят в стоимость консультации.</span>')
    s=s.replace('Придите на диагностику — узнаете точную сумму','Обсудите лечение с хирургом и ортопедом')
    s=s.replace('Без осмотра и снимка назвать стоимость честно невозможно: она зависит от объёма кости и состояния соседних зубов. Консультация стоит 1 800 ₽ и занимает около часа.','Совместная консультация хирурга и ортопеда — 1 800 ₽. Врачи оценят вашу ситуацию и обсудят варианты восстановления зубов. Снимок и хирургический шаблон в эту стоимость не входят.')
    s=s.replace('Осмотр хирурга и ортопеда</li>','Совместный осмотр хирурга и ортопеда</li>')
    s=s.replace('Разбор снимка</li>','Обсуждение вариантов лечения</li>')
    s=s.replace('План лечения и смета на руки</li>','Согласование дальнейшего плана</li>')
    stage_items=[
        ('Ваши пожелания и здоровье','Обсуждаем жалобы, ожидания от улыбки и жевания. Уточняем состояние здоровья, хронические заболевания и аллергии.'),
        ('Совместный осмотр','Хирург оценивает дёсны и ткани в области будущих имплантатов. Ортопед проверяет зубы, прикус и смыкание челюстей.'),
        ('Необходимая диагностика','Назначаем снимки и цифровое сканирование по показаниям. При необходимости проверяем работу челюстного сустава и жевательных мышц.'),
        ('Планирование будущей улыбки','Фотографии и 3D-модель помогают согласовать форму зубов и положение имплантатов. При необходимости планируем изготовление хирургического шаблона.'),
        ('Оценка рисков и план лечения','Учитываем состояние кости и мягких тканей. Подбираем имплантаты и будущий протез, определяем необходимость дополнительных процедур.'),
        ('Согласование с вами','Обсуждаем ожидаемый результат и альтернативы. Согласовываем предварительную стоимость по этапам и график визитов.')
    ]
    cards=''.join(f'<div class="step"><div class="n">{i}</div><div><h3>{title}</h3><p>{body}</p></div></div>' for i,(title,body) in enumerate(stage_items,1))
    s=re.sub(r'<h2 id="etapy">.*?</h2>\s*<div class="steps">.*?</section>', '<h2 id="etapy">Этапы планирования лечения</h2><p class="steps-intro">Хирург-имплантолог и ортопед вместе оценивают вашу ситуацию, планируют лечение и согласуют способ протезирования. Объём дополнительных обследований зависит от клинической ситуации.</p><div class="steps">'+cards+'</div><p class="steps-note">Снимок и изготовление хирургического шаблона не входят в консультацию за 1 800 ₽ и оплачиваются отдельно.</p></div></section>',s,flags=re.S)
    s=s.replace('Источник отзыва: Продокторов','Источник отзыва: ПроДокторов')
    s=s.replace('Центр имплантации.<br>','')
    s=re.sub(r'В центре нет универсалов\. Имплант ставит хирург отделения челюстно-лицевой хирургии,\s*протез делает ортопед\. ', '', s)
    s=re.sub(r'<div class="implant-caption">.*?</div>','',s,flags=re.S)
    s=s.replace('<span class="eyebrow">ALL-ON-4 · ВОССТАНОВЛЕНИЕ ВСЕЙ ЧЕЛЮСТИ</span>','')
    s=s.replace('Решаем любой клинический случай','Подбираем систему имплантатов под вашу задачу')
    s=s.replace('<div class="team">','<div class="team pair">')
    usps='''<section class="usp-section" id="advantages"><div class="wrap"><h2>Три опоры вашего лечения</h2><p class="section-intro">Восстановление зубов, надёжная система имплантатов и забота о вашем комфорте — в одном центре.</p><div class="usp-grid">
<article class="usp"><svg aria-hidden="true"><use href="#i-tooth"/></svg><div class="eyebrow">ВОССТАНОВЛЕНИЕ ЗУБОВ</div><h3>Несъёмные зубы на четырёх имплантатах</h3><p>По протоколу All-on-4 временный протез можно установить в день операции, если это позволяет клиническая ситуация.</p><a href="#tseny">Как восстановить зубы <span>→</span></a></article>
<article class="usp"><svg aria-hidden="true"><use href="#i-shield"/></svg><div class="eyebrow">NOBEL BIOCARE</div><h3>Имплантация в авторизованном центре</h3><p>Статус Center of Excellence, оригинальные решения Nobel Biocare и пожизненная гарантия производителя на имплантаты.</p><a href="#nobel">О статусе центра <span>→</span></a></article>
<article class="usp"><svg aria-hidden="true"><use href="#i-sleep"/></svg><div class="eyebrow">ЛЕЧЕНИЕ ВО СНЕ</div><h3>Комфорт под контролем анестезиолога</h3><p>Для длительного лечения и при страхе стоматологических процедур. Возможность седации обсуждается с врачом на консультации.</p><a href="#zapis">Обсудить лечение <span>→</span></a></article>
</div></div></section>'''
    s=re.sub(r'<section class="promo-wrap">.*?</section>',usps,s,flags=re.S)
    # Reuse verified logos and supplied descriptions, with actual brand product photos.
    match=re.search(r'<div class="systems">(.*?)</div>\s*<p class="sys-note">',s,re.S)
    if match:
        logos=re.findall(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"',match.group(1))
        descriptions=re.findall(r'<span class="txt">(.*?)</span>',match.group(1),re.S)
        countries=['Швейцария','Бразилия','Южная Корея','Израиль']
        names=['Nobel','neodent','Inno','AlphaBioTec']
        buttons=[];panels=[]
        for i,((logo,label),asset) in enumerate(zip(logos,names)):
            buttons.append(f'<button class="system-tab" role="tab" id="system-tab-{i}" aria-controls="system-panel-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}" data-system="{i}"><img src="{logo}" alt="{label}"><span>Посмотреть имплантаты ↗</span></button>')
            desc=descriptions[i] if i<len(descriptions) else ''
            geo=countries[i] if i<len(countries) else ''
            panels.append(f'<div class="system-panel" role="tabpanel" id="system-panel-{i}" aria-labelledby="system-tab-{i}" {"hidden" if i else ""}><div class="system-product"><img src="assets/system-{asset}.png" alt="Имплантаты {label}" loading="lazy"></div><div><span class="eyebrow">{geo}</span><h3>{label}</h3><p>{desc}</p><a class="text-link" href="#zapis">Подобрать систему с врачом →</a></div></div>')
        s=s[:match.start()]+'<div class="systems-explorer"><div class="system-tabs" role="tablist" aria-label="Системы имплантатов">'+''.join(buttons)+'</div><div class="system-panels">'+''.join(panels)+'</div></div><p class="sys-note">'+s[match.end():]
    # Capabilities are an illustrated selector, distinct from the numbered stages.
    match=re.search(r'<div class="feats">(.*?)</div>\s*</div>\s*</section>',s,re.S)
    if match:
        items=re.findall(r'<div class="feat">.*?<h3>(.*?)</h3><p>(.*?)</p></div>\s*</div>',match.group(0),re.S)
        tabs=[];panels=[]
        for i,(title,body) in enumerate(items):
            tabs.append(f'<button role="tab" class="cap-tab" id="cap-tab-{i}" aria-controls="cap-panel-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}" data-cap="{i}">{title}<span>↗</span></button>')
            panels.append(f'<div class="cap-panel" role="tabpanel" id="cap-panel-{i}" aria-labelledby="cap-tab-{i}" {"hidden" if i else ""}><img src="assets/capability-{i}.png" alt="{title}" loading="lazy"><div><h3>{title}</h3><p>{body}</p></div></div>')
        s=s[:match.start()]+'<div class="capabilities"><div class="cap-tabs" role="tablist" aria-label="Возможности центра">'+''.join(tabs)+'</div><div class="cap-panels">'+''.join(panels)+'</div></div></div></section>'+s[match.end():]
    s=s.replace('<h2>До и после</h2>','<h2 id="results">До и после</h2><p>Результаты лечения: исходная ситуация и восстановленные зубы рядом.</p>')
    s=s.replace('<div class="cases">','<div class="cases" tabindex="0" role="region" aria-label="Примеры работ до и после">')
    match=re.search(r'<div class="cases".*?</section>',s,re.S)
    if match:
        block=match.group(0)
        block=block.replace('</section>','<div class="wrap case-controls"><button type="button" data-case="prev" aria-label="Предыдущая работа">←</button><span class="case-count" aria-live="polite">1 / 3</span><button type="button" data-case="next" aria-label="Следующая работа">→</button></div></section>')
        s=s[:match.start()]+block+s[match.end():]
    # Replace the separate All-on-4 banner and three price cards with one selector.
    price_section=re.search(r'<section id="tseny">.*?</section>',s,re.S)
    if price_section:
        block=price_section.group(0)
        plans=re.findall(r'<div class="plan(?: lead)?">(.*?)</a>\s*</div>',block,re.S)
        labels=['Один зуб','Несколько зубов','Вся челюсть']
        images=['single-tooth.png','bridge.png','all-on-four.png']
        titles=['Восстановление одного зуба','Мост на имплантатах','Вся челюсть на четырёх имплантатах']
        tabs=[];panels=[]
        for i,(label,plan) in enumerate(zip(labels,plans)):
            who=re.search(r'<div class="who">(.*?)</div>',plan,re.S).group(1)
            price=re.search(r'<div class="price">(.*?)</div>',plan,re.S).group(1)
            points=re.search(r'<ul>(.*?)</ul>',plan,re.S).group(1)
            extra='<p class="solution-explanation">По протоколу All-on-4 временный протез можно зафиксировать в день операции, если это позволяет клиническая ситуация.</p>' if i==2 else ''
            tabs.append(f'<button type="button" class="solution-tab" role="tab" id="solution-tab-{i}" aria-controls="solution-panel-{i}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}">{label}</button>')
            panels.append(f'<div class="solution-panel" role="tabpanel" id="solution-panel-{i}" aria-labelledby="solution-tab-{i}" {"hidden" if i else ""}><figure><img src="assets/{images[i]}" alt="{titles[i]}" width="1536" height="1024" loading="lazy"></figure><div class="solution-copy"><h3>{titles[i]}</h3><p class="solution-who">{who}</p>{extra}<ul>{points}</ul><div class="solution-bottom"><a class="btn" href="#zapis">Рассчитать лечение</a><div class="solution-price">{price}</div></div></div></div>')
        tabs.append('<button type="button" class="solution-tab" role="tab" id="solution-tab-3" aria-controls="solution-panel-3" aria-selected="false" tabindex="-1">Скуловая имплантация</button>')
        panels.append('<div class="solution-panel" role="tabpanel" id="solution-panel-3" aria-labelledby="solution-tab-3" hidden><figure><img src="assets/zygoma.png" alt="Модель скуловой имплантации на верхней челюсти" width="1536" height="1024" loading="lazy"></figure><div class="solution-copy"><h3>Скуловая имплантация Zygoma</h3><p class="solution-who">Вариант восстановления верхней челюсти при выраженном недостатке костной ткани.</p><p class="solution-explanation">Удлинённые имплантаты фиксируются в скуловой кости. Возможность такого лечения и конструкцию протеза врач определяет по результатам диагностики.</p><div class="solution-bottom"><a class="btn" href="#zapis">Обсудить лечение</a><div class="solution-price solution-price-individual">Индивидуально<small>Стоимость после диагностики</small></div></div></div></div>')
        new='<section id="tseny"><div class="wrap"><h2>Сколько зубов нужно восстановить</h2><p class="solution-intro">Выберите вашу ситуацию. Точную стоимость определим после диагностики — с учётом объёма кости, системы имплантатов и конструкции протеза.</p><div class="solution-tabs" role="tablist" aria-label="Варианты восстановления зубов">'+''.join(tabs)+'</div><div class="solution-panels">'+''.join(panels)+'</div></div></section>'
        assert len(plans)==3,'Expected three treatment options'
        s=s[:price_section.start()]+new+s[price_section.end():]
    cap_assets={0:'cap-ct.png',1:'cap-guide.png',2:'cap-sedation.png',3:'cap-bone.png',5:'cap-lab.png'}
    for index,asset in cap_assets.items():
        s=s.replace(f'assets/capability-{index}.png',f'assets/{asset}')
    s=s.replace('assets/system-Nobel.png','assets/nobelactive-cutout.png')
    s=s.replace('assets/implant.png','assets/hero-cutout-v3.png')
    for source,target in [('fb8d38d73001d8.jpg','case-before-1.png'),('46b689f8e02f63.jpg','case-after-1.png'),('24418b110991bb.jpg','case-before-2.png'),('de4350e0253aca.jpg','case-after-2.png'),('7af8b8ea29b14c.jpg','case-before-3.png'),('45e32f4b5a7910.jpg','case-after-3.png')]:
        s=s.replace('assets/'+source,'assets/'+target)
    s=s.replace('href="#zapis">Обсудить лечение</a><div class="solution-price', 'href="#zapis">Рассчитать лечение</a><div class="solution-price')
    client_copy = {
        '<em>Вернём уверенность</em><br>в вашей улыбке': '<em>Вернём уверенность</em><br>и улыбку',
        'От одного зуба до всей челюсти.': 'Восстановление от одного зуба до всей челюсти.',
        'протез без пересылок': 'Протез в кратчайшие сроки без потери качества',
        'Восстановление зубов, надёжная система имплантатов и забота о вашем комфорте — в одном центре.': 'Проверенные годами системы имплантатов, гарантии от производителя, сервис и сопровождение на каждом этапе лечения координатором.',
        'Для длительного лечения и при страхе стоматологических процедур.': 'При необходимости снизить страх и тревожность, облегчить продолжительную операцию. Исключить неприятные воспоминания.',
        'Что входит в работу центра': 'Что входит в комплексное протезирование на имплантатах',
        'Обсуждаем жалобы, ожидания от улыбки и жевания. Уточняем состояние здоровья, хронические заболевания и аллергии.': 'Обсуждаем жалобы, будущие ожидания от улыбки и возможности восстановления жевательной функции. Уточняем состояние здоровья в целом.',
        'Хирург оценивает дёсны и ткани в области будущих имплантатов. Ортопед проверяет зубы, прикус и смыкание челюстей.': 'Хирург оценивает костную ткань по КТ-снимку и состояние десен в области будущих имплантатов. Ортопед оценивает прикус и условия в зубном ряду для будущих коронок.',
        'Учитываем состояние кости и мягких тканей. Подбираем имплантаты и будущий протез, определяем необходимость дополнительных процедур.': 'Определяется необходимость санации ротовой полости, необходимость провести профессиональную чистку и снятие зубных отложений перед предстоящей операцией. Это необходимо для максимального снижения рисков инфицирования.',
        'Планируют конструкцию, изготавливают и фиксируют протез': 'Планируют временные/постоянные коронки, несъемные конструкции и фиксируют в дальнейшем.',
    }
    for old, new in client_copy.items():
        assert old in s, f'Missing client copy target: {old}'
        s=s.replace(old,new)
    return s

