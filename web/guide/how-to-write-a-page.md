---
title: How to write a guide page
category: Contributing
summary: Add or fix a Game Guide page in a few minutes, no tools needed.
---

Anyone can add to the Game Guide. A page is one plain text file, and you can write it entirely in your browser.

## Create a page

1. Click **Create a page** on the [Game Guide](#/guide) index. GitHub opens an editor with a template ready.
2. Fill in the `title`, `category` and `summary` at the top, then write the page underneath.
3. Click **Commit changes** and choose **Propose changes**. GitHub makes a copy of the project for you and opens a pull request.
4. A maintainer reviews it. Once merged, the page appears on the site within a couple of minutes.

You need a free GitHub account.

## Fix a page

Every guide page has an **Edit this page** link at the bottom. It opens the same editor on that page.

## Formatting

| You type | You get |
|---|---|
| `## Heading` | a section heading |
| `**bold**` and `*italic*` | **bold** and *italic* |
| `- item` | a bullet list |
| `1. step` | a numbered list |
| `[[Page title]]` | a link to another guide page |
| `[[topic:Name]]` | a link to a patch-notes topic |
| `[text](https://example.com)` | an outside link |
| `![caption](picture.png)` | a picture (put the file next to your page) |

A link to a page that does not exist yet shows in red. Clicking it starts that page, so you can plan a set of pages by linking first.

## Good practice

- Write what you know to be true and say where it comes from, such as in-game testing or a patch number.
- Keep pages focused: one topic per page, linking to others rather than repeating them.
- The patch notes list every change, so say how something works now and link to its topic for the history, for example [[topic:Revenants]].
- Do not paste the developers' release text or copy other sites' writing. Your own words only.

The full guide for contributors is in [CONTRIBUTING.md](https://github.com/tau-samsara/udfop/blob/main/CONTRIBUTING.md).
