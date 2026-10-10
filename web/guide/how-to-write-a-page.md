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

This is a whole page file. It is named `party-rest.md`. The top block between the `---` lines is the page's *front matter*: a few labelled settings. Everything below it is the page text.

``` md
---
title: Party rest
category: Survival
summary: How resting works for a party.
related: topic:Resting, guide:Camping
---

Resting restores health while the party camps.

## Who can rest

Anyone in the party. See [[Camping]] and [[topic:Party rest]].
```

Here is where each part shows up on the site:

| In the file | What it does on the site |
|---|---|
| `title` | The page heading and the browser tab. It is also the name other pages use to link to this one: `[[Party rest]]`. Titles must be unique, and link matching is case-insensitive, so `[[how to write a guide page]]` works too. |
| `category` (Optional) | Puts the page in a group. The group appears on the **Game Guide** page, as its own page listing, and in the breadcrumb at the top of the page. |
| `summary` (Optional) | The one-line description shown next to the page's name in lists and in search results. |
| `related` (Optional) | Pages and topics to list in the References section even though the text does not link them. In the example it adds the Patch Notes topic Resting and the guide page Camping. See "The References section" below. |
| `## Heading` lines (Optional) | Section headings. Every heading is listed in the page's **Contents** list, which is added automatically, like the one beside this page (in the left sidebar, or behind the ☰ button next to the title). The page title is added for you, so do not repeat it. |
| The file name | The page's web address. The example file `party-rest.md` becomes `#/guide/party-rest`. Use lower case and hyphens. |
| `[[Another page]]` | A link to another guide page, by its title. |
| `[[topic:Name]]` | A link to a Patch Notes topic page (see below). |

Only `title` is required. Everything else is optional. A page with no `category` goes under **General**.

## How the parts connect

The site has two parts that are built differently. Knowing which is which explains everything that follows.

- **The Game Guide** is written by hand, by people like you. Pages are the files in `web/guide/`.
- **The Patch Notes** are generated by a script from the developers' release notes. Their *topics* (Revenants, Market, Climbing and so on) come from that data. You cannot create a topic by writing a file, and you do not need to.

| When you... | ...this happens | Automatic? |
|---|---|---|
| Add a guide page | It appears on the Game Guide index under its category, on that category's page, and in search. | Yes, after the next deploy |
| Use a category name no page has used before | A new group appears on the **Game Guide** page. | Yes. Check the groups listed there first and reuse an existing name, or you will create a near-duplicate (such as "Combat" and "Combat system"). |
| Link with `[[Page title]]` | A normal link if that page exists. A **red** link if it does not. Clicking a red link starts that page. | Yes |
| Link with `[[topic:Name]]` | A link to the Patch Notes topic with its full change history. | You add the link by hand |
| Want your page listed in the main menu by name | The main menu has only a few fixed links, not individual pages. People find pages from the Game Guide index, the category page, search and links. | No. Link to your page from related pages. |
| Want a Patch Notes topic page to show your guide page | Topic pages do not list guide pages. | No. The connection is only the links you write. |

In short: **a guide page is found through its category, its title, search and the links other pages make to it.** The patch notes are connected only by links you choose to add.

## Basic formatting

These are plain Markdown, the same on any site that uses it. Each one has the rule, then the plain syntax as you type it, then how it looks to readers.

### Paragraphs

A blank line starts a new paragraph. A single line break inside a paragraph is only a space.

``` md
First line
second line, same paragraph

A new paragraph
```

Rendered:

First line
second line, same paragraph

A new paragraph

If you want something on its own line, make it its own paragraph, or use a list.

### Headings

Start a line with `##` and a space for a section heading, `###` for a sub-section, and `####` to `######` for deeper levels. The page title is added for you, so start at `##`.

``` md
## A section
### A smaller section
```

Rendered: the headings you are reading on this page are made this way, such as "Headings" just above. There is no separate rendered sample because headings are also what the **Contents** list is built from, and a sample here would add a false entry to it.

### Bold and italic

Put `**` around text for bold, and `*` or `_` around it for italic.

```
This is **bold**, this is *italic*, and this is _also italic_.
```

Rendered:

This is **bold**, this is *italic*, and this is _also italic_.

### Lists

Start lines with `- ` or `* ` for bullets and `1. ` for numbers. Indent a line two spaces more than the item above it to nest it one level deeper. There is no limit on the number of levels, but a list reads best with no more than three.

``` md
- A bullet
- Another bullet
  - A nested bullet
    - A third level

1. First step
2. Second step
   - A bullet inside a step
```

Rendered:

- A bullet
- Another bullet
  - A nested bullet
    - A third level

1. First step
2. Second step
   - A bullet inside a step

### Quotations

Start a line with `>` for a quotation, which suits in-game text or developer statements. Say where it came from.

```md
> Quotations are set off from the text.
```

Rendered:

> Quotations are set off from the text.

A quotation whose first line is a tag such as `[!NOTE]` becomes a notice box instead. See **Notice boxes** under Extended features.

### Horizontal divider

Three dashes on a line of their own draw a divider.

```md
---
```

Rendered:

---

### Inline code

Put a short stretch between single backticks to show it exactly as typed. This is also how to show markup literally, so it is not turned into a link or bold. Inline code is shown in an accent colour on a faint background, so it stands out from plain text and is never mistaken for a link: amber on the default and Iliac Bay themes, green on Parchment and blue on Oblivion.

```md
Press `Jump` to climb, and write `[[a page]]` to link.
```

Rendered:

Press `Jump` to climb, and write `[[a page]]` to link.

### Code blocks

For several lines shown exactly as typed, put a line of three backticks above them and another below. That suits commands, in-game chat lines, settings and data, and it is how the grey boxes in this page are written. Spacing and line breaks are kept, and long lines scroll sideways. Every box has a **Copy** button in its top bar, which copies the text exactly as typed, without the colours.

(Optional) Put a language name straight after the opening backticks, for example `json`. The name then appears in the box's top bar and the code is coloured. A box with no name, or with a name the site does not know, is shown plain with no colours, and a name you gave still appears in the bar. Names are not case sensitive.

| You write | The code is coloured as |
|:---|:---|
| `json` | JSON |
| `js`, `javascript`, `ts`, `typescript` | JavaScript and TypeScript |
| `bash`, `sh`, `zsh`, `shell`, `console` | Shell commands (a leading `$` or `>` prompt is picked out) |
| `powershell`, `ps1`, `pwsh` | PowerShell |
| `bat`, `batch`, `cmd` | Windows batch files |
| `ini`, `conf`, `cfg`, `config`, `toml`, `properties` | Settings files |
| `yaml`, `yml` | YAML |
| `lua` | Lua |
| `cs`, `csharp`, `c#` | C# |
| `xml`, `html`, `xaml`, `svg` | XML and HTML |
| `python`, `py` | Python |
| `markdown`, `md` | Markdown, including `[[links]]` and `{{keys}}` |
| `text`, `txt`, or no name | no colours |

The colouring is a guide for the eye, not a full reader of the language, so unusual code may be coloured imperfectly. That does no harm, and the text itself is never changed. Very long boxes (over about 20,000 characters) are shown without colours.

A code box cannot be placed inside another, so the plain syntax is described here and not shown in a box. Each box below was written with the name shown in its top bar:

```json
{"name": "my-mod", "version": 2, "enabled": true, "tags": ["audio", null]}
```

```bash
# list the save files
$ ls -la "$HOME/saves" --color=never
export GAME_DIR="$HOME/daggerfall"
```

```powershell
# list the save files
Get-ChildItem -Path "C:\Games\Saves" -Recurse | Where-Object { $_.Length -gt 1MB }
```

```bat
@echo off
REM start the game
set GAME=daggerfall.exe
if exist "%GAME%" start "" "%GAME%"
```

```ini
; display settings
[Graphics]
resolution = 1920
fullscreen = true
```

```yaml
# a mod list
name: my-mod
mods:
  - audio-pack
  - map-fix
enabled: true
```

```js
// log a message
function greet(name) { return console.log("Hello, " + name); }
```

```lua
-- print a message
local greeting = "Hello"
function greet(name) print(greeting, name) end
```

```cs
// a message
public class Greeter { public void Greet(string name) { Console.WriteLine($"Hello {name}"); } }
```

```xml
<!-- a config file -->
<settings enabled="true"><volume>80</volume></settings>
```

```python
# print a message
def greet(name):
    return f"Hello {name}"
```

```markdown
## A heading
Some **bold** words, a `code` word, a [[Guide page]] link and a {{W}} key.
- a list item
```

### Links to other websites

Write the words in square brackets and the address in round brackets.

```md
[a link to GitHub](https://github.com)
```

Rendered:

[a link to GitHub](https://github.com)

### Tables

A header row, a line of three dashes per column under it, then one row per line, with `|` between the cells. Put a backslash before any `|` that belongs inside a cell. Cells can hold bold text, links and code. Colons in the line of dashes set each column's alignment: a colon on the left (`:---`) aligns left, which is the default, a colon on both sides (`:---:`) centers, and a colon on the right (`---:`) aligns right. Right alignment suits numbers.

```md
| Item | Where it goes | Count |
|:---|:---:|---:|
| Rows | one per line | 12 |
| Cells | separated by pipes | 1,234 |
```

Rendered:

| Item | Where it goes | Count |
|:---|:---:|---:|
| Rows | one per line | 12 |
| Cells | separated by pipes | 1,234 |

### Pictures

An exclamation mark, the description in square brackets, and the picture's path in round brackets. How to add the picture file itself is in the next section.

```md
![Sarsaparilla looking majestic](images/sarsaparilla-01s.jpg)
```

Rendered:

![Sarsaparilla looking majestic](images/sarsaparilla-01s.jpg)

## Adding pictures

- Upload pictures to the **`web/guide/images/`** folder. In your fork, switch to the branch GitHub made for your page (the branch menu at the top left of the file list), open `web/guide/images/`, and choose **Add file → Upload files**. The picture joins your open pull request automatically.
- Reference a picture by its path, always starting with `images/`. If your page is inside a folder such as `web/guide/combat/`, start with `../images/` instead, because paths are referenced from the page's own folder.
- Write the picture into your page as shown above. The sample picture belongs to this page, so yours will have its own name.
- Name it after your page, such as `party-rest-camp.png`, so names do not clash and people can tell what it belongs to.
- Use PNG, JPG, WebP or GIF, and keep each file under about 500 KB. Crop or shrink large screenshots.
- Always write alt text (the words in the square brackets) describing what the picture shows. It is read aloud by screen readers and shown if the picture cannot load.
- Only upload pictures you made yourself, such as your own screenshots or diagrams. Do not upload other people's artwork or images taken from other sites.

## Extended features

These go beyond plain Markdown. They are what lets Game Guide pages connect to each other and to the Patch Notes, and each one is explained here with an example.

### Links to other pages

Double square brackets link to another page on this site. They are the way to link a guide page, a Patch Notes topic or a patch, because the site then knows what you linked and can show it in the References section. A link to a guide page uses the page's title, and matching is case-insensitive. Put `topic:` before the name of a Patch Notes topic and `patch:` before a version number. A bar followed by your own words changes the text that is shown.

| You type | What it does | Result |
|---|---|---|
| `[[How to write a guide page]]` | links to a guide page by its title, marked **GP** | [[How to write a guide page]] |
| `[[How to write a guide page\|this page]]` | the same page, with your own words, still marked **GP** | [[How to write a guide page\|this page]] |
| `[[topic:Revenants]]` | links to a Patch Notes topic, marked **PN** | [[topic:Revenants]] |
| `[[patch:0.1.6656]]` | links to a patch's page, marked **PN** | [[patch:0.1.6656]] |
| `[text](https://example.com)` | links to another website, marked **↗** | [an outside link](https://example.com) |
| `[[Example of a missing page]]` | links to a page that does not exist yet: the link is **red**, and clicking it starts that page | [[Example of a missing page]] |

If the page you name does not exist yet, the link shows in red, and clicking it starts that page. That lets you plan a set of pages by linking first.

### Link markers

A small raised marker after a link says where it goes, so readers know before they click. The markers are added for you; do not type them.

| Marker | Where the link goes |
|---|---|
| **GP** | a page in the Game Guide |
| **PN** | a Patch Notes topic or patch |
| **↗** | another website |
| none | a plain link to a page of this site, such as a category, and a red link to a page that does not exist yet |

### Other links on this site

A normal Markdown link can point at any page of the site, so you can send readers to a category, to a Patch Notes list or to the feedback page. Write the address starting with `#/`:

| You type | Result |
|---|---|
| `[Contributing](#/guide/category/Contributing)` | [Contributing](#/guide/category/Contributing) (a Game Guide category) |
| `[Audio](#/hub/Audio)` | [Audio](#/hub/Audio) (a Patch Notes category) |
| `[all patches](#/patches)` | [all patches](#/patches) |
| `[recent changes](#/recent)` | [recent changes](#/recent) |
| `[all topics](#/topics)` | [all topics](#/topics) |
| `[Feedback and bugs](#/feedback)` | [Feedback and bugs](#/feedback) |

These are plain links: they have no PN or arrow marker and they do not appear in the References section, so use the double-bracket forms from the linking examples above when you want a topic, patch or guide page listed there.

### Link previews

On a computer, pointing at a link to a guide page, a topic, a patch, a category or a system shows a short preview of what is there. You do not write anything for this. Point at any link in the Result columns on this page to see it. Readers can turn previews off in the settings panel.

### The References section

Every guide page that links anywhere gets a **References** section at the bottom, built for you from the links in the text. Do not write one yourself.

| Part | What it lists |
|---|---|
| **Game Guide** | the guide pages you linked, each with its summary |
| **Patch Notes** | the topics and patches you linked, each with when it was last changed |
| **External Links** | the outside websites you linked |

Each link appears once, in the order it first appears in the text. A page is "not linked" when your text has no `[[...]]` link to it and you did not name it in `related:`. The section lists only what you linked or named, so a guide page that exists but that your text never mentions does not appear.

**`related:` (Optional).** To list a page, topic or patch that does not belong in a sentence, add a `related:` line to the front matter at the top of the page, with names separated by commas. Start each name with `guide:`, `topic:` or `patch:` to say which kind it is:

```md
related: guide:Party rest, topic:Resting, patch:0.1.6656
```

`guide:` names a Game Guide page by its title, `topic:` a Patch Notes topic and `patch:` a patch version, matching the double-bracket links in the text. If you leave the prefix off, the name is matched to a guide page first and to a topic second, so use the prefix whenever a guide page and a topic share a name. Guide pages go under Game Guide in the References section and topics and patches under Patch Notes. The check warns about names that match nothing.

### Picture captions and placement

To caption a picture or move it to the side, put the caption in quotes after the path, and a side and width in braces after the picture. Both parts are optional, and the picture must be **alone on its line** for them to work. A captioned picture with no side given floats to the right as a framed thumbnail.

| You type | You get |
|---|---|
| `![alt](images/x.png "Caption")` | a framed picture on the **right**, 240 pixels wide, with the caption under it (the default for a captioned picture) |
| `![alt](images/x.png "Caption"){left 180}` | the same, floated to the left and 180 pixels wide |
| `![alt](images/x.png "Caption"){center 400}` | centered on its own line, 400 pixels wide |
| `![alt](images/x.png){right 200}` | a floated picture with no caption (the braces alone are enough) |
| `![alt](images/x.png)` | the plain picture, as in the basic formatting above |

The side is `left`, `right` or `center`, and the width is a number of pixels from 40 to 1200. The picture never grows past its own size or past the page. The check warns about any other word in the braces.

Here is the sample picture from above with a caption, floated to the right:

![Sarsaparilla looking majestic](images/sarsaparilla-01s.jpg "Sarsaparilla, looking majestic."){right 220}

Text next to a floated picture wraps around it, as on Wikipedia, and a heading starts below it. Several pictures floated the same way stack down the side. On a phone the picture moves above the text and takes the full width, because narrow columns of wrapped text are hard to read. Write the caption as a short sentence naming what is shown, and keep the alt text for describing what the picture looks like.

The same picture floated to the left, 150 pixels wide. The text now runs down its right-hand side, which suits a small picture that illustrates the paragraph it sits beside.

![Sarsaparilla looking majestic](images/sarsaparilla-01s.jpg "Floated left, 150 wide."){left 150}

Here the text carries on beside the left-hand picture for a few more lines, so you can see how a left float and the paragraph work together. A heading, a table or a centered picture starts below the float, never beside it, so the page stays tidy.

And centered, 300 pixels wide, standing alone on its line:

![Sarsaparilla looking majestic](images/sarsaparilla-01s.jpg "Centered, 300 wide."){center 300}

### Notice boxes

(Optional) A notice box sets a tip, a warning or an extra fact apart from the text around it. Start a quotation with a tag on a line of its own, then write the text of the box on the lines after it:

```markdown
> [!WARNING]
> Quicksaving during a quest can break it.
```

Choose one of five tags. The tag is not case sensitive.

| You write | The box is labelled | Use it for |
|:---|:---|:---|
| `[!NOTE]` | Note | extra information |
| `[!TIP]` | Tip | helpful advice |
| `[!IMPORTANT]` | Important | something readers must know |
| `[!WARNING]` | Warning | something that can go wrong |
| `[!CAUTION]` | Caution | something that can lose progress or data |

Rendered, one of each:

> [!NOTE]
> Resting is only possible when no enemies are nearby.

> [!TIP]
> Press {{R}} to rest, then pick how many hours.

> [!IMPORTANT]
> Your character sheet saves with the game, not with the server.

> [!WARNING]
> Resting inside a dungeon can wake monsters that were asleep.

> [!CAUTION]
> Deleting a save in the `saves` folder cannot be undone.

Anything you can write in a page also works inside a box: several paragraphs, lists, links, keys and code boxes. Put `>` at the start of every line of the box, including blank lines between paragraphs. Keep each box short, and use them sparingly, since a page full of boxes stops anything standing out.

A tag the site does not know, such as `[!DANGER]`, leaves an ordinary quotation, and the page check mentions it. When you edit on GitHub, its preview draws these boxes too, in its own colours.

### Keys and buttons

To show a keyboard key, a mouse button or a gamepad button, put its name between double braces. It is drawn as a small keycap, so readers can see at a glance what to press. Use this for things you **press**. Use bold for buttons and menu labels you **click on screen**, such as **Rest**, so the two are never mixed up.

```md
Press {{W}} to move forward and hold {{Left Shift}} to run.
{{Shift+Right click}} draws the bow, and {{Mouse 4}} switches the view.
On a controller, hold {{pad:RT}}.
Turn with {{Left}} and {{Right}}, or look with {{Up}} and {{Down}}.
```

Rendered:

Press {{W}} to move forward and hold {{Left Shift}} to run. {{Shift+Right click}} draws the bow, and {{Mouse 4}} switches the view. On a controller, hold {{pad:RT}}. Turn with {{Left}} and {{Right}}, or look with {{Up}} and {{Down}}.

- **Arrow keys** are typed as words, `{{Up}}`, `{{Down}}`, `{{Left}}` and `{{Right}}`, and shown as arrows, ↑ ↓ ← →, which read faster. The words are only for the four arrow keys: `{{Left Shift}}` and `{{Left click}}` are not affected.
- **Combinations** are joined with `+`, and each key gets its own cap, as in `{{Ctrl+Shift+K}}`. For a plus key itself, write `{{+}}`.
- **Mouse buttons** are recognised by name (`Left click`, `Right click`, `Middle click`, `Mouse 3`, `Mouse 4`, `Mouse 5` and `Scroll`) and drawn with rounder corners than keyboard keys.
- **Gamepad buttons** start with `pad:`, as in `{{pad:A}}`, and are drawn round. The prefix is not shown. Use the name printed on the button; the table below lists the Xbox names, which are the game's own, and the PlayStation ones. When a page gives both for one button, put the Xbox name first and the PlayStation name second, such as `{{pad:RB}}, {{pad:R1}}`, and say so once on the page so readers know they are the same button on two controllers.
- **Keys with symbols** are written as the character and named in plain words after it, so readers who do not know the symbol can find it: `{{;}} (semicolon)`, `{{,}} (comma)` or `{{[}} (left bracket)`.
- **Use the same names everywhere** so pages agree. Use these:

| Kind | Names |
|---|---|
| Letters and digits | `A` to `Z` and `0` to `9`, as the character |
| Function and editing | `F1` to `F12`, `Esc`, `Tab`, `Enter`, `Space`, `Backspace`, `Insert`, `Delete`, `Home`, `End`, `PgUp`, `PgDn` |
| Arrows | `Up`, `Down`, `Left`, `Right` (shown as ↑ ↓ ← →) |
| Modifiers | `Shift`, `Left Shift`, `Right Shift`, `Ctrl`, `Alt`, and `Left` or `Right` in front of each |
| Gamepad (Xbox) | `A`, `B`, `X`, `Y`, `LB`, `RB`, `LT`, `RT`, `LSB` (left stick button), `RSB` (right stick button), `D-pad`, `D-pad Up`, `D-pad Down`, `D-pad Left`, `D-pad Right`, `Start`, `Back` |
| Gamepad (PlayStation) | `Cross`, `Circle`, `Square`, `Triangle`, `L1`, `R1`, `L2`, `R2`, `L3`, `R3`, `D-pad`, `Start`, `Select` |
| Number pad | `Numpad 0` to `Numpad 9`, `Numpad +`, `Numpad -`, `Numpad *`, `Numpad /`, `Numpad Enter` |

Keycaps work in tables and in captions, but not inside the text of a link. Put the example in single backticks, as the code boxes on this page do, when you want to show the braces themselves.

### What the site does for you

You do not write these. They come from what you wrote: a **Contents** list built from the page's headings (docked in the left sidebar by default, where it follows the section being read; subsections are listed under their section behind a small arrow that the reader opens; readers can hide it behind a ☰ button beside the page title that floats at the top left of the window once they scroll past the title, and the site remembers their choice; on a narrow screen such as a phone there is no Contents list: each section and subsection folds instead, closed to begin with, and a reader taps a heading to open it), the page's place in the Game Guide index and breadcrumb from its `category`, its entry in the Game Guide index and in search, the **References** section, the **PN** and **↗** markers on links, and the colours and **Copy** button on code boxes.

## Not supported

Raw HTML (it is shown as plain text, which keeps pages safe and consistent), strikethrough, underline, coloured text, footnotes, task-list checkboxes, merged table cells, embedded video or other media, forced line breaks inside a paragraph, and links to a section inside a page. Leave these out and the page will look right everywhere.

## Good practice

- Write what you know to be true and say where it comes from, such as testing in the game, a patch number or a developer post.
- One subject per page. Link to other pages instead of repeating them.
- The Patch Notes already record *what changed*. A guide page should say *how it works now*, and can link to the topic for the history, for example [[topic:Revenants]].
- Use your own words. Do not paste the developers' release text or copy other sites.
- Your writing is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and credited to "UDFOP contributors".

## Checking your page

Once your page is live, look for these:

1. It is listed on the Game Guide index, under its category, with its summary beside the name.
2. If you used a new category, it appears as a group on the **Game Guide** page.
3. The breadcrumb at the top reads Game Guide › your category.
4. Searching for a word from its title finds it.
5. Pictures appear, and any red link opens GitHub's editor with a new page ready.

## Review and credit

- Every new or edited page is reviewed by a maintainer before it goes live. Mistakes are fixed the same way, by another edit.
- Files and folders whose names start with `_` are ignored by the site (the starter template, `_template.md`, is one).
- Folders are optional. A page inside `web/guide/combat/` gets the category "Combat" unless it sets its own. Its pictures are still kept in `web/guide/images/`, so link them as `../images/name.png`.

## Previewing on your computer (optional)

You do not need this to contribute. To see a page before proposing it, run these from the project folder, then open <http://localhost:8000>:

```py
python tools/guide.py --check
python -m http.server 8000 --directory web
```

`guide.py` rebuilds the page list the site reads and reports problems such as duplicate titles. The deploy runs it for you.
