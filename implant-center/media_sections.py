def add_media(s):
    photos=''.join(f'<a class="interior-slide" href="assets/interior-{i}.png" target="_blank" rel="noopener"><img src="assets/interior-{i}.png" alt="Интерьер клиники Подмосковье — фото {i}" loading="lazy" width="800" height="533"></a>' for i in range(1,8))
    videos=[('456241716','История пациента'),('456239979','Как проходит протезирование?'),('456240281','Отзыв о стоматологии «Подмосковье»'),('456240671','Цифровая имплантация'),('456241660','Идеальные зубы за один день')]
    cards=''
    for i,(id,title) in enumerate(videos):
        cover=f'<img src="assets/video-{i}.jpg" alt="" loading="lazy">' if i in (1,3) else f'<span class="video-brand">ПОДМОСКОВЬЕ</span><span class="video-cover-title">{title}</span>'
        cards+=f'<article class="video-card"><div class="video-player"><button class="video-launch" type="button" data-video="{id}" aria-label="Смотреть: {title}">{cover}<span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><span class="video-service">VK Видео</span></button></div><h3>{title}</h3></article>'
    blocks=f'''<section id="interior" class="interior-section"><div class="wrap"><h2>Интерьер клиники</h2><div class="interior-gallery"><div class="interior-track" tabindex="0" aria-label="Фотографии интерьера клиники">{photos}</div><button type="button" class="interior-arrow prev" aria-label="Предыдущее фото интерьера"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><button type="button" class="interior-arrow next" aria-label="Следующее фото интерьера"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div></div></section><section id="clinic-videos"><div class="wrap"><h2>Видео о лечении и отзывы пациентов</h2><p class="media-hint video-hint">Листайте видео влево или вправо</p><div class="video-grid">{cards}</div></div></section>'''
    assert '<section id="otzyvy"' in s
    return s.replace('<section id="otzyvy"',blocks+'<section id="otzyvy"',1)


