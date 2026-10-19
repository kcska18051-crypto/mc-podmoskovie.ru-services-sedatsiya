from pathlib import Path
import re
root=Path(__file__).parent
source=(root/'audit/footer-source.html').read_text(encoding='utf-8-sig')
footer=re.search(r'<footer class="footer-v2">.*?</footer>',source,re.S).group()
footer=re.sub(r'<!--.*?-->','',footer,flags=re.S)
footer=footer.replace('footer-v2__wrap container','footer-v2__wrap wrap')
footer=re.sub(r"/local/templates/base/svg-sprite.svg[^#'\"]*#",'assets/clinic-social.svg#',footer)
for name in ['rutube-icon','tg-icon','max-icon']:
    footer=footer.replace('/local/templates/base/images/'+name+'.svg','assets/'+name+'.svg')
footer=footer.replace('target="_blank"','target="_blank" rel="noopener"')
for network,label in [('youtube.com','YouTube'),('zen.yandex.ru','Дзен'),('vk.ru/mc_','ВКонтакте'),('rutube.ru','Rutube'),('t.me/','Telegram'),('max.ru/','MAX')]:
    footer=re.sub(r'<a([^>]*href\s*=\s*"[^"]*'+re.escape(network)+r'[^>]+)>',lambda m:'<a'+m[1]+' aria-label="'+label+'">',footer)
footer=footer.replace('<img src =','<img alt="" src =')
footer=footer.replace('+74852744545','+74852608062').replace('+7 (4852) 74-45-45','+7 (4852) 60-80-62')
(root/'footer.html').write_text(footer,encoding='utf-8')
css=(root/'audit/footer-style.css').read_text(encoding='utf-8-sig')
css=css[css.index('.footer-v2 {'):css.index('/*ВК плеер*/')]
(root/'audit/footer-extracted.css').write_text(css,encoding='utf-8')
