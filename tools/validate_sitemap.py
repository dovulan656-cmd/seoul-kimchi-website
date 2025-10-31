from pathlib import Path
import xml.etree.ElementTree as ET
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SITEMAP = ROOT / 'sitemap.xml'

if not SITEMAP.exists():
    print(f"ERROR: sitemap file not found at {SITEMAP}")
    sys.exit(2)

text = SITEMAP.read_text(encoding='utf-8')
try:
    root = ET.fromstring(text)
except ET.ParseError as e:
    print(f"XML Parse Error: {e}")
    sys.exit(2)

ns = {'sm': root.tag[root.tag.find('{')+1:root.tag.find('}')] } if '}' in root.tag else {}
urls = root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url') if ns else root.findall('.//url')

issues = []
seen = set()
valid_changefreq = {'always','hourly','daily','weekly','monthly','yearly','never'}
iso_date_re = re.compile(r'^\d{4}-\d{2}-\d{2}$')

for i, url in enumerate(urls, start=1):
    loc_el = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc') or url.find('loc')
    loc = loc_el.text.strip() if loc_el is not None and loc_el.text else ''
    if not loc:
        issues.append((i, 'missing loc'))
        continue
    if loc in seen:
        issues.append((i, f'duplicate loc: {loc}'))
    seen.add(loc)
    if not (loc.startswith('http://') or loc.startswith('https://')):
        issues.append((i, f'loc not absolute URL: {loc}'))

    # lastmod
    lm_el = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod') or url.find('lastmod')
    if lm_el is not None and lm_el.text:
        lm = lm_el.text.strip()
        if not iso_date_re.match(lm):
            issues.append((i, f'lastmod not YYYY-MM-DD: {lm}'))

    # changefreq
    cf_el = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq') or url.find('changefreq')
    if cf_el is not None and cf_el.text:
        cf = cf_el.text.strip().lower()
        if cf not in valid_changefreq:
            issues.append((i, f'invalid changefreq: {cf}'))

    # priority
    pr_el = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}priority') or url.find('priority')
    if pr_el is not None and pr_el.text:
        try:
            p = float(pr_el.text.strip())
            if not (0.0 <= p <= 1.0):
                issues.append((i, f'priority out of range 0.0-1.0: {p}'))
        except ValueError:
            issues.append((i, f'priority not a number: {pr_el.text.strip()}'))

# Summary
print(f"Sitemap file: {SITEMAP}")
print(f"Total <url> entries found: {len(urls)}")
print(f"Unique <loc> entries: {len(seen)}")
if issues:
    print('\nIssues found:')
    for idx, msg in issues:
        print(f" - entry #{idx}: {msg}")
    sys.exit(1)
else:
    print('\nNo structural issues detected. Well-formed XML, absolute URLs, lastmod format, changefreq and priority look OK.')
    sys.exit(0)
