from pathlib import Path
import os
import re
source = (Path(os.environ['TEMP']) / 'podmoskovie-services-icons.html').read_text(encoding='utf-8-sig')
dest = Path(__file__).parent / 'podmoskovie-nobel-zygoma/assets/service-icons'
dest.mkdir(exist_ok=True)
matches = re.findall(r'<a[^>]+href="(/services/[^"]+)"[^>]*>\s*(<svg\b.*?</svg>)', source, re.S)
for href, svg in matches:
    svg = svg.replace('overflow="scroll"', '').replace('<svg ', '<svg fill="#25b8c4" ', 1)
    (dest / (href.split('/')[2] + '.svg')).write_text(svg, encoding='utf-8')
print('Original icons saved:', len(matches))
assert len(matches) == 12
