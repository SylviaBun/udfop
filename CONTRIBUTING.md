# Contributing to UDFOP

UDFOP has two parts:

| Part | What it is | How it is updated |
|---|---|---|
| **Game Guide** (`web/guide/`) | How things in Daggerfall Online work, written by the community | By hand: anyone can add or edit a page |
| **Patch Notes** (`data/`, `web/data.js`) | Every change from the developers' release notes | By script, once per release (see the README) |

## Game Guide pages

**The full instructions are on the site:** [How to write a guide page](https://tau-samsara.github.io/udfop/#/guide/how-to-write-a-page). They cover the page format, links, how a page connects to the sidebar, search and the patch notes, and a formatting cheat sheet.

The short version: a page is one Markdown file in `web/guide/`. Use **Write a page** on the site (or **Add file → Create new file** in `web/guide/` on GitHub), fill in the template, then **Commit changes → Propose changes**. You need a free GitHub account and nothing installed.

The starter template is [`web/guide/_template.md`](web/guide/_template.md). It is the only copy: the site's **Write a page** link loads it, so edit that file to change what new pages start with.

## Code of Conduct

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md): be respectful, be welcoming, be honest. Maintainers may edit or remove contributions that break it.

## Licence of what you contribute

By submitting a Game Guide page you agree that your writing is released under [CC BY 4.0](LICENSE-CONTENT.md), credited to "UDFOP contributors". Use your own words and your own pictures: do not paste the developers' release text, or text or images from other sites. Code contributions are under the [MIT licence](LICENSE).

## Review

A maintainer reviews every pull request. A check (`python tools/guide.py --check`) runs automatically on guide changes and reports duplicate titles, empty pages and similar problems.

## Corrections to the Patch Notes

See the README: the usual fixes are editing a description in `data/descriptions/`, a row in `data/normalized/all.jsonl`, or a category in `data/hub_assignment.csv`. New patches are added by a maintainer with the release script.
