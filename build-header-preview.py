from pathlib import Path
from html import escape

root = Path(__file__).parent / 'podmoskovie-nobel-zygoma'
source = (root / 'index.html').read_text(encoding='utf-8')
base = 'https://www.mc-podmoskovie.ru/'
sections = [('Врачи','doctors/'),('Пациентам','patients/'),('Отзывы','otzyvy/'),('О клинике','about/'),('Контакты','contacts/'),('Полезное','useful/')]
groups = [
 ('Диагностика','diagnostics/', [('Трехмерная (3D) томография','3d/'),('Ортопантомограмма','ortopantomogramma/'),('Прицельные рентген снимки','roentgen/'),('Телерентгенограмма','telerentgenogramma/')]),
 ('Лечение зубов','therapeutic/', [('Профосмотр','profilakticheskie-osmotry/'),('Лечение кариеса','caries/'),('Лечение каналов / пульпита','pulpitis/'),('Художественная реставрация','restoration-of-teeth/'),('Спасение травмированных зубов','spasenie-travmirovannykh-zubov/'),('Лечение зубов при беременности','lechenie-zubov-pri-grudnom-vskarmlivanii-i-beremennosti/')]),
 ('Имплантация зубов','implant/', [('Имплант-система Нобель','implant-nobel-biocar/'),('Имплант-система Неодент','implant-neodent/'),('All-on-4','all-on-4-all-on-6/'),('Костная пластика','sinus-lifting/')]),
 ('Протезирование','orthopaedy/', [('Коронки','koronki/'),('Виниры и вкладки','veneers/'),('Бюгельные зубные протезы','clasp/'),('Спортивные каппы','sportivnye-kappy/')]),
 ('Хирургия','surgery/', [('Удаление зубов','udalenie-zubov/'),('Пластика полости рта','plastika-polosti-rta/'),('Зубосохраняющие операции','zubosohranyayuschie_operations/')]),
 ('Ортодонтия','ortodont/', [('Брекет-системы','bracket/'),('Раннее лечение прикуса','rannee-lechenie-prikusa/')]),
 ('Детская стоматология','childrens-dentistry/', []),
 ('Гигиена и профилактика','gigiena-i-profilaktika/professionalnaya-gigiena-polosti-rta/', []),
 ('Лечение десен','parodont/', []),
 ('Красивая улыбка','krasivaya-ulybka/', []),
 ('Наркоз/Седация','sedatsiya/', []),
 ('Отбеливание','whitening/', [])
]
paths = {
 'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
 'phone':'<path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"/>',
 'pin':'<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 'close':'<path d="m6 6 12 12M6 18 18 6"/>',
 'back':'<path d="m14 6-6 6 6 6M8 12h12"/>',
 'down':'<path d="m6 9 6 6 6-6"/>'
}
def icon(name): return f'<svg class="pm-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>'
def links(): return '\n'.join(f'<a href="{base}{path}">{text}</a>' for text,path in sections)
def services_button(): return f'<button class="pm-services-toggle" type="button" data-pm-open="services" aria-haspopup="dialog" aria-expanded="false" aria-controls="pm-navigation">{icon("menu")}Услуги{icon("down")}</button>'
cards = []
for label,path,children in groups:
    url = base+'services/'+path
    inner = '\n'.join(f'<a href="{url}{p}">{escape(t)}</a>' for t,p in children)
    inner += f'<a class="pm-direction" href="{url}">{"Все услуги направления" if children else "Подробнее об услуге"} <span aria-hidden="true">↗</span></a>'
    category_icon = f'<img class="pm-category-icon" src="assets/service-icons/{path.split("/")[0]}.svg" width="32" height="32" alt="" aria-hidden="true">'
    cards.append(f'<details class="pm-service-group"><summary>{category_icon}<span>{label}</span></summary><div class="pm-service-links">{inner}</div></details>')
header = f'''<header class="pm-header" itemscope itemtype="https://schema.org/WPHeader">
    <div class="pm-shell">
      <div class="pm-top">
        <a class="pm-logo" href="{base}" aria-label="Подмосковье — центр стоматологии"><img src="assets/header-logo.svg" width="260" height="39" alt="Подмосковье — центр стоматологии"></a>
        <a class="pm-address" href="{base}contacts/">{icon('pin')}<span>Ярославль, ул. Некрасова, 41<small>Как добраться до клиники</small></span></a>
        <div class="pm-contact"><a class="pm-phone" href="tel:+74852608218">+7 (4852) 60-82-18</a><a class="pm-feedback" href="{base}contacts/">Обратная связь</a></div>
        <button class="pm-book" type="button" data-pm-book>Записаться на приём</button>
        <div class="pm-mobile-actions"><a class="pm-icon-button" href="tel:+74852608218" aria-label="Позвонить в клинику">{icon('phone')}</a><button class="pm-icon-button" type="button" data-pm-open="menu" aria-haspopup="dialog" aria-expanded="false" aria-controls="pm-navigation" aria-label="Открыть меню">{icon('menu')}</button></div>
      </div>
      <nav class="pm-nav" aria-label="Основная навигация">{services_button()}{links()}</nav>
      <div class="pm-mobile-quick">{services_button()}<button class="pm-book" type="button" data-pm-book>Записаться</button></div>
    </div>
  </header>
  <dialog class="pm-navigation" id="pm-navigation" aria-labelledby="pm-panel-title">
    <div class="pm-panel-head"><button class="pm-icon-button" type="button" data-pm-back aria-label="Назад в меню" hidden>{icon('back')}</button><h2 id="pm-panel-title">Услуги</h2><a class="pm-all-services" href="{base}services/">Все услуги <span aria-hidden="true">↗</span></a><button class="pm-icon-button" type="button" data-pm-close aria-label="Закрыть меню">{icon('close')}</button></div>
    <div class="pm-panel-body">
      <div data-pm-menu-view hidden><nav class="pm-menu-links" aria-label="Мобильная навигация"><button type="button" data-pm-open="services">Услуги{icon('down')}</button>{links()}</nav><div class="pm-menu-footer"><a class="pm-phone" href="tel:+74852608218">+7 (4852) 60-82-18</a><p>Ярославль, ул. Некрасова, 41</p><button class="pm-book" type="button" data-pm-book>Записаться на приём</button></div></div>
      <div data-pm-services-view><div class="pm-service-grid">{''.join(cards)}</div><a class="pm-service-all-mobile" href="{base}services/">Все услуги клиники <span aria-hidden="true">↗</span></a></div>
    </div>
  </dialog>'''
start = source.index('  <!-- Visible header shell')
end = source.index('  <main>', start)
result = source[:start]+ '  '+header+'\n\n'+source[end:]
result = result.replace('</head>', '  <link rel="stylesheet" href="header-preview.css?v=1">\n  <script src="header-preview.js?v=1" defer></script>\n</head>')
(root/'header-preview.html').write_text(result, encoding='utf-8')
assert result[result.index('  <main>'):] == source[source.index('  <main>'):]
print('Created header-preview.html; all markup from <main> onward is unchanged.')
