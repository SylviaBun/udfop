---
title: Demo page
category: Demo
summary: A sample page that shows every feature of the Game Guide. Safe to delete.
---

This is a **demo page**. It contains no game information. It exists so you can see how a guide file turns into a page, and it can be deleted at any time by removing `web/guide/demo-page.md`.

## Headings and text

Normal paragraphs are written as plain text. You can use **bold**, *italics* and `inline code`. A blank line starts a new paragraph.

### A smaller heading

Headings with `##` and `###` become sections. Because this page has three or more, a **Contents** box appears at the top.

## Lists

- A bullet list
- Another item
  - A nested item (indented two spaces)
- A third item

1. A numbered list
2. Second step
3. Third step

## Links

- To another guide page: [[How to write a guide page]]
- The same page with different words: [[How to write a guide page|read the contributor guide]]
- To a Patch Notes topic: [[topic:Revenants]]
- To a patch: [[patch:0.1.6656]]
- To an outside site: [GitHub](https://github.com)
- To a page that does not exist yet (it shows in red, and clicking it starts that page): [[Example of a missing page]]

## A table

| Feature | Where it shows up | Automatic? |
|---|---|---|
| `title` | The heading, the tab and links | Yes |
| `category` | The sidebar group and category page | Yes |
| `summary` | Lists and search results | Yes |

## A quotation

> Quotations are set off from the text. Use them for in-game text or developer statements, and say where they came from.

## Preformatted text

```
Anything between three backticks is shown exactly as typed,
which is useful for commands or in-game chat lines.
```

## Script injection attempts

Every line below is a real attack attempt. None of them should do anything: HTML is shown as text, and unsafe links lose their link. If any of them ran, a pop-up would appear.

1. Script tag: <script>alert(1)</script>
2. Image error handler: <img src=x onerror="alert(1)">
3. Plain `javascript:` link: [click me](javascript:alert(1))
4. Mixed-case scheme: [click me](JaVaScRiPt:alert(1))
5. `data:` link: [click me](data:text/html,<script>alert(1)</script>)
6. `javascript:` image: ![image](javascript:alert(1))
7. Raw anchor tag: <a href="javascript:alert(1)">click me</a>
8. Embedded frame: <iframe src="https://example.com"></iframe>
9. Hidden control character before the scheme: [click me](javascript:alert(1))
10. HTML inside a wiki link: [[<img src=x onerror=alert(1)>]]
11. Event handler in a table cell:

| Cell | Attempt |
|---|---|
| Handler | <b onmouseover="alert(1)">hover me</b> |

## What to look for

On the site, check that:

1. **Demo** appears as a new group in the sidebar, under Game Guide.
2. This page is listed on the Game Guide index, under Demo, with the summary beside its name.
3. Searching for "demo" finds it.
4. The breadcrumb at the top reads Main page › Game Guide › Demo.
5. The red link above opens GitHub's editor with a new page ready.
6. The script injection attempts above appear as text or plain words, and nothing runs.
