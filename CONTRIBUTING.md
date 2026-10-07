# Contributing to UDFOP

UDFOP has two parts, and they work differently:

| Part | What it is | How it is updated |
|---|---|---|
| **Game Guide** (`web/guide/`) | How things in Daggerfall Online work, written by the community | By hand: anyone can add or edit a page |
| **Patch Notes** (`data/`, `web/data.js`) | Every change from the developers' release notes | By script, once per release (see the maintainer section of the README) |

You do not need to install anything to contribute to the Game Guide.

## Add a Game Guide page (no tools needed)

1. Open [this link](https://github.com/tau-samsara/udfop/new/main/web/guide?filename=new-page.md) (or press **Add file → Create new file** inside `web/guide/` on GitHub). You need a free GitHub account.
2. Name the file in lower case with hyphens, ending in `.md`, for example `party-rest.md`.
3. Paste in the template below, fill it in, and write your page.
4. Click **Commit changes…**, then **Propose changes**. GitHub copies the project to your account and opens a pull request for you.
5. A maintainer reviews it. When it is merged, the site updates by itself within a few minutes.

To fix an existing page, click **Edit this page** at the bottom of it on the site.

### The template

```
---
title: Party rest
category: Survival
summary: How resting works for a party.
---

One or two sentences saying what this is.

## How it works

Short paragraphs, lists and tables. Link other pages with [[Page title]]
and patch-notes topics with [[topic:Revenants]].
```

Only `title` is needed. `category` groups pages in the sidebar (pages without one go under "General", or under their folder's name). `summary` is shown in lists and search.
The same template is in [`web/guide/_template.md`](web/guide/_template.md).

### Writing Markdown

| You type | You get |
|---|---|
| `## Heading`, `### Smaller heading` | section headings (the page title is added for you) |
| `**bold**`, `*italic*`, `` `code` `` | **bold**, *italic*, `code` |
| `- item` / `1. item` | bullet / numbered list (indent two spaces to nest) |
| `[[Page title]]` | link to another guide page |
| `[[Page title\|shown text]]` | the same, with different words |
| `[[topic:Name]]` / `[[patch:0.1.6646]]` | link to a patch-notes topic or patch |
| `[text](https://example.com)` | outside link |
| `![alt text](picture.png)` | picture; upload the image into `web/guide/` and use its file name |
| `\| a \| b \|` rows with a `\|---\|---\|` line under the header | table |
| `> quote` | quotation |

A `[[link]]` to a page that does not exist shows in red; clicking it starts that page.
Raw HTML is not supported (it is shown as text), which keeps pages safe and consistent.

### Rules of thumb

- Write what you know to be true, and say how you know (testing in game, a patch number, a developer statement).
- One subject per page. Link to other pages instead of repeating them.
- The patch notes already record *what changed*. A guide page should say *how it works now*.
- Use your own words. Do not paste the developers' release text, or text from other sites or wikis.
- Files and folders whose names start with `_` are ignored by the site (the template is one). Folders are optional; a page in `web/guide/combat/` gets the category "Combat" unless it sets its own.

## Licence of what you contribute

By submitting a Game Guide page you agree that your writing is released under
[CC BY 4.0](LICENSE-CONTENT.md), the same as the rest of the original text, and that it is credited to
"UDFOP contributors". Code contributions are under the [MIT licence](LICENSE).

## Previewing on your computer (optional)

```
python tools/guide.py --check
python -m http.server 8000 --directory web
```

Then open <http://localhost:8000>. `guide.py` rebuilds the page list the site reads (`web/guide/index.json`, which is generated and not committed) and reports problems such as duplicate titles. The deploy workflow runs it for you, and a pull-request check runs `--check`.

## Corrections to the Patch Notes

See the README: the usual fixes are editing a description in `data/descriptions/`, a row in `data/normalized/all.jsonl`, or a category in `data/hub_assignment.csv`. The Patch Notes are compiled by script from the developers' release notes, so new patches are added by a maintainer.
