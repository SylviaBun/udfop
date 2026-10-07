"""Game Guide tooling. Python 3 standard library only. Run from the project root.

    python tools/guide.py           rebuild web/guide/index.json (the site's list of guide pages)
    python tools/guide.py --check   also report problems; exit code 1 if there are errors

Guide pages are Markdown files under web/guide/ (see CONTRIBUTING.md). Files and folders whose name
starts with "_" or "." are ignored. index.json is generated, git-ignored, and rebuilt by the deploy workflow,
so contributors never have to run this."""
import json, os, re, sys

ROOT = os.path.join('web', 'guide')
LINK = re.compile(r'\[\[([^\]\|]+?)(?:\|[^\]]*)?\]\]')


def split_front(raw):
    """Return (meta dict, body, error). Front matter is optional: '---' lines around 'key: value' lines."""
    raw = raw.lstrip('﻿').replace('\r\n', '\n')
    if not raw.startswith('---\n'):
        return {}, raw, None
    end = raw.find('\n---', 4)
    if end < 0:
        return {}, raw, 'front matter starts with --- but never closes'
    meta = {}
    for line in raw[4:end].split('\n'):
        if ':' in line and not line.lstrip().startswith('#'):
            k, v = line.split(':', 1)
            meta[k.strip().lower()] = v.strip().strip('"\'')
    body = raw[end + 4:].lstrip('\n')
    return meta, body, None


def plain(md):
    """Rough plain text of a Markdown body, for the site search."""
    t = re.sub(r'```.*?```', ' ', md, flags=re.S)
    t = re.sub(r'!\[[^\]]*\]\([^)]*\)', ' ', t)
    t = re.sub(r'\[\[([^\]\|]+)(?:\|([^\]]*))?\]\]', lambda m: m.group(2) or m.group(1), t)
    t = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', t)
    t = re.sub(r'[#>*_`|~-]+', ' ', t)
    return re.sub(r'\s+', ' ', t).strip()


def humanize(name):
    s = re.sub(r'[-_]+', ' ', name).strip()
    return s[:1].upper() + s[1:]


def scan():
    pages, problems = [], []
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = sorted(d for d in dirs if not d.startswith(('_', '.')))
        for f in sorted(files):
            if not f.lower().endswith('.md') or f.startswith(('_', '.')):
                continue
            path = os.path.join(base, f)
            rel = os.path.relpath(path, ROOT).replace(os.sep, '/')
            slug = rel[:-3]
            raw = open(path, encoding='utf-8').read()
            meta, body, err = split_front(raw)
            if err:
                problems.append(('error', rel, err))
            title = meta.get('title')
            if not title:
                m = re.search(r'^#\s+(.+?)\s*#*\s*$', body, flags=re.M)
                title = m.group(1) if m else humanize(os.path.basename(slug))
                problems.append(('warn', rel, 'no title in the front matter; using "%s"' % title))
            folder = os.path.dirname(slug)
            category = meta.get('category') or (humanize(folder.split('/')[0]) if folder else 'General')
            if re.search(r'<\s*/?\s*(script|iframe|object|embed|style|img|a)\b|javascript:|\bon[a-z]+\s*=|[\x00-\x08\x0b\x0c\x0e-\x1f]', body, flags=re.I):
                problems.append(('warn', rel, 'contains HTML tags, script-like text or control characters: the site shows these as plain text, but a reviewer should look'))
            if not body.strip():
                problems.append(('error', rel, 'the page is empty'))
            if re.search(r'[^A-Za-z0-9._/ -]', slug):
                problems.append(('warn', rel, 'file names are easier to link with only letters, numbers, spaces and hyphens'))
            pages.append(dict(slug=slug, title=title, category=category, summary=meta.get('summary', ''),
                              text=plain(body)[:6000], _body=body))
    return pages, problems


def topic_names():
    try:
        raw = open(os.path.join('web', 'data.js'), encoding='utf-8').read()
        d = json.loads(raw[raw.index('{'):raw.rindex('}') + 1])
        return {r['e'].lower() for r in d['rows']}
    except Exception:
        return set()


def main():
    check = '--check' in sys.argv
    if not os.path.isdir(ROOT):
        print('no %s folder' % ROOT); return 1
    pages, problems = scan()
    seen = {}
    for p in pages:
        for key in (p['title'].lower(), p['slug'].lower()):
            if key in seen and seen[key] != p['slug']:
                problems.append(('error', p['slug'] + '.md', 'the title or name clashes with "%s.md"' % seen[key]))
        seen[p['title'].lower()] = p['slug']
        seen.setdefault(p['slug'].lower(), p['slug'])
    topics = topic_names()
    for p in pages:
        for target in LINK.findall(re.sub(r'```.*?```|`[^`\n]*`', ' ', p['_body'], flags=re.S)):
            t = target.strip().lower()
            if t not in seen and t not in topics and not t.startswith(('patch:', 'topic:')):
                problems.append(('warn', p['slug'] + '.md', 'link [[%s]] matches no guide page or topic yet' % target.strip()))
    cats = {}
    for p in pages:
        cats.setdefault(re.sub(r'\s+', ' ', p['category']).strip().lower(), set()).add(p['category'])
    for key, spellings in cats.items():
        if len(spellings) > 1:
            problems.append(('warn', 'categories', 'the category is spelled more than one way: %s (use one spelling)' % ', '.join('"%s"' % x for x in sorted(spellings))))
    pages.sort(key=lambda p: (p['category'].lower(), p['title'].lower()))
    out = [{k: v for k, v in p.items() if not k.startswith('_')} for p in pages]
    with open(os.path.join(ROOT, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print('guide: %d page(s) indexed' % len(out))
    errors = [x for x in problems if x[0] == 'error']
    if check or errors:
        for level, where, msg in problems:
            print('  %s  %s: %s' % ('ERROR' if level == 'error' else 'note ', where, msg))
    return 1 if (check and errors) else 0


if __name__ == '__main__':
    sys.exit(main())
