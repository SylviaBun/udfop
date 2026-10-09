---
title: How to write a guide page
category: Contributing
summary: Add or fix a Game Guide page in a few minutes, and see how it connects to the rest of the site.
---

Anyone can add to the Game Guide. A page is one plain text file, and you can write it entirely in your browser. You need a free GitHub account, and nothing installed.

**You must fork the project first.** Only the maintainers can change the project directly. Everyone else works in their own copy of it, called a *fork*, and then asks for their change to be added. **Make the fork from the project's own page on GitHub, before you write anything.** Do not rely on the site's "Edit this page" link or the red links to missing pages to create it for you: they open GitHub's editor, and forking from there can fail.

## The short version

1. **Sign in to GitHub.** A free account is enough, and a new account must have its email address confirmed.
2. **Fork the project, once.** Go to the project page, [github.com/tau-samsara/udfop](https://github.com/tau-samsara/udfop), click **Fork** at the top right, then **Create fork**. You are taken to your own copy, at `github.com/your-name/udfop`. Everything below happens in your copy. (Or go straight to the [fork page](https://github.com/tau-samsara/udfop/fork).)
3. **Create your page in your copy.** Open the `web/guide` folder, click **Add file**, then **Create new file**. Name it in lower case with hyphens and end it with `.md`, such as `party-rest.md`. For the starting text, open [the template](https://github.com/tau-samsara/udfop/blob/main/web/guide/_template.md), use its **Copy raw file** button, and paste it in.
4. **Write the page.** Fill in the three lines at the top (`title`, `category` and `summary`), then write underneath.
5. **Save it.** Click **Commit changes**. Choose **Create a new branch for this commit and start a pull request**, then click **Propose new file**.
6. **Create the pull request.** GitHub shows a comparison of your change. Click **Create pull request**, then click **Create pull request** once more on the next screen. This is the step people most often miss: until you do it, nobody has been told about your page.
7. **Wait for review.** A maintainer reads it and may ask for changes, which you make on the same pull request. Once it is merged, the page appears on the site within a few minutes. You do not need to edit any menu or list: the site builds those from the page files.

To fix an existing page, fork the project as above, open the page's file in your copy under `web/guide`, click the pencil icon to edit it, and finish with the same commit and pull request steps. If you forked a while ago, press **Sync fork** on your copy's main page first, so you are editing the latest version.

The **Edit this page** link and the red links to missing pages open the same editor. They are shortcuts, and they work best once you already have your fork. If one fails, or GitHub shows "An unexpected error occurred" while forking, do the steps above by hand and check that your email address is verified. Very new accounts are sometimes blocked from forking for a while. If you are stuck, report it from [Feedback and bugs](#/feedback).

## How a file becomes a page

This is a whole page file. The top block between the `---` lines is the page's *front matter*: a few labelled settings. Everything below it is the page text.

```
---
title: Party rest
category: Survival
summary: How resting works for a party.
---

Resting restores health while the party camps.

## Who can rest

Anyone in the party. See [[Camping]] and [[topic:Party rest]].
```

Here is where each part shows up on the site:

| In the file | What it does on the site |
|---|---|
| `title` | The page heading and the browser tab. It is also the name other pages use to link to this one: `[[Party rest]]`. Titles must be unique. |
| `category` | Puts the page in a group. The group appears in the **Game Guide** part of the sidebar, as its own page listing, and in the breadcrumb at the top of the page. |
| `summary` | The one-line description shown next to the page's name in lists and in search results. |
| `related` | Optional. Pages and topics to list in the References section even though the text does not link them. |
| `## Heading` lines | Section headings. When a page has three or more, a **Contents** box is added automatically. The page title is added for you, so do not repeat it. |
| The file name | The page's web address. `party-rest.md` becomes `#/guide/party-rest`. Use lower case and hyphens. |
| `[[Another page]]` | A link to another guide page, by its title. |
| `[[topic:Name]]` | A link to a Patch Notes topic page (see below). |

Only `title` is required. A page with no `category` goes under **General**.

## How the parts connect

The site has two parts that are built differently. Knowing which is which explains everything that follows.

- **The Game Guide** is written by hand, by people like you. Pages are the files in `web/guide/`.
- **The Patch Notes** are generated by a script from the developers' release notes. Their *topics* (Revenants, Market, Climbing and so on) come from that data. You cannot create a topic by writing a file, and you do not need to.

| When you... | ...this happens | Automatic? |
|---|---|---|
| Add a guide page | It appears on the Game Guide index under its category, on that category's page, and in search. | Yes, after the next deploy |
| Use a category name no page has used before | A new group appears in the sidebar. | Yes. Check the sidebar first and reuse an existing name, or you will create a near-duplicate (such as "Combat" and "Combat system"). |
| Link with `[[Page title]]` | A normal link if that page exists. A **red** link if it does not. Clicking a red link starts that page. | Yes |
| Link with `[[topic:Name]]` | A link to the Patch Notes topic with its full change history. | You add the link by hand |
| Want your page listed in the sidebar by name | Individual pages are not listed in the sidebar, only categories. People find pages from the index, the category page, search and links. | No. Link to your page from related pages. |
| Want a Patch Notes topic page to show your guide page | Topic pages do not list guide pages. | No. The connection is only the links you write. |

In short: **a guide page is found through its category, its title, search and the links other pages make to it.** The patch notes are connected only by links you choose to add.

## Linking examples

| You type | You get |
|---|---|
| `[[Party rest]]` | a link to the guide page titled "Party rest" |
| `[[Party rest\|resting]]` | the same page, shown as "resting" |
| `[[topic:Revenants]]` | a link to the Patch Notes topic "Revenants", marked with a small **PN** |
| `[[patch:0.1.6646]]` | a link to that patch's page, also marked **PN** |
| `[text](https://example.com)` | an outside link, marked with a small **↗** |
| `![what it shows](images/party-rest-camp.png)` | a picture (see below) |

The small raised marker after a link says where it goes. **PN** means a Patch Notes page and **↗** means another website. Links to other guide pages have no marker. The markers are added for you; do not type them.

## The References section is automatic

Every guide page that links anywhere gets a **References** section at the bottom, built for you from the links in the text. Do not write one yourself.

| Part | What it lists |
|---|---|
| **Game Guide** | the guide pages you linked, each with its summary |
| **Patch Notes** | the topics and patches you linked, each with when it was last changed |
| **External Links** | the outside websites you linked |

Each link appears once, in the order it first appears in the text. Pages you did not link are left out.

To list a related page or topic that does not belong in a sentence, add a `related:` line to the front matter at the top of the page, with names separated by commas:

```
related: Revenants, Companions, Party rest
```

A name that matches a guide page's title goes under Game Guide, and one that matches a Patch Notes topic goes under Patch Notes. The check warns about names that match neither.

## Formatting

| You type | You get |
|---|---|
| `## Heading` and `### Smaller heading` | section headings |
| `**bold**` and `*italic*` | **bold** and *italic* |
| `- item` | a bullet list (indent two spaces to nest) |
| `1. step` | a numbered list |
| `> quote` | a quotation |
| `\| a \| b \|` rows with a `\|---\|---\|` line under the first | a table (put a backslash before any pipe that belongs inside a cell) |

Preformatted text goes between two lines of three backticks. It is shown exactly as typed, which suits commands or in-game chat lines, and the two examples in this page are written that way. To mark a short stretch inline, put it in single backticks, as in `inline code`.

Here is how a few of these look once rendered. A nested list, indented two spaces:

- A bullet list
- Another item
  - A nested item
- A third item

A quotation, for in-game text or developer statements (say where they came from):

> Quotations are set off from the text.

Raw HTML is not supported. It is shown as plain text, which keeps pages safe and consistent.

## Pictures

- Upload pictures to the **`web/guide/images/`** folder. In your fork, switch to the branch GitHub made for your page (the branch menu at the top left of the file list), open `web/guide/images/`, and choose **Add file → Upload files**. The picture joins your open pull request automatically.
- Reference a picture by its path, always starting with `images/`. If your page is inside a folder such as `web/guide/combat/`, start with `../images/` instead, because paths are referenced from the page's own folder.
- Write it as `![Sarsaparilla looking majestic](images/sarsaparilla01.png)`. That picture belongs to this page, so yours will have its own name. This is what the sample looks like on the page:

![Sarsaparilla looking majestic](sarsaparilla-01s.png)
- Name it after your page, such as `party-rest-camp.png`, so names do not clash and people can tell what it belongs to.
- Use PNG, JPG, WebP or GIF, and keep each file under about 500 KB. Crop or shrink large screenshots.
- Always write alt text (the words in the square brackets) describing what the picture shows. It is read aloud by screen readers and shown if the picture cannot load.
- Only upload pictures you made yourself, such as your own screenshots or diagrams. Do not upload other people's artwork or images taken from other sites.

## Good practice

- Write what you know to be true and say where it comes from, such as testing in the game, a patch number or a developer post.
- One subject per page. Link to other pages instead of repeating them.
- The Patch Notes already record *what changed*. A guide page should say *how it works now*, and can link to the topic for the history, for example [[topic:Revenants]].
- Use your own words. Do not paste the developers' release text or copy other sites.
- Your writing is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and credited to "UDFOP contributors".

## Checking your page

Once your page is live, look for these:

1. It is listed on the Game Guide index, under its category, with its summary beside the name.
2. If you used a new category, it appears as a group in the sidebar under Game Guide.
3. The breadcrumb at the top reads Main page › Game Guide › your category.
4. Searching for a word from its title finds it.
5. Pictures appear, and any red link opens GitHub's editor with a new page ready.

## Review and credit

- Every new or edited page is reviewed by a maintainer before it goes live. Mistakes are fixed the same way, by another edit.
- Files and folders whose names start with `_` are ignored by the site (the starter template, `_template.md`, is one).
- Folders are optional. A page inside `web/guide/combat/` gets the category "Combat" unless it sets its own. Its pictures are still kept in `web/guide/images/`, so link them as `../images/name.png`.

## Previewing on your computer (optional)

You do not need this to contribute. To see a page before proposing it, run these from the project folder, then open <http://localhost:8000>:

```
python tools/guide.py --check
python -m http.server 8000 --directory web
```

`guide.py` rebuilds the page list the site reads and reports problems such as duplicate titles. The deploy runs it for you.
