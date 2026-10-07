---
name: add-release-notes
description: Add new Daggerfall Online release notes to the wiki. Use when the user wants to pull in, process or publish new patches or releases, or says "add the new release notes".
---

Run everything from the project root. The helper is `python tools/notes.py` (see README.md). Two steps need judgement and are done by you: turning raw notes into rows, and rewriting topic descriptions. The rest is scripted.

## 0. Before you start
Community contributors edit Game Guide pages (`web/guide/`) on GitHub, so the remote may have commits the local copy lacks. Run `git fetch` and `git status -sb`; if it says "behind", run `git pull --rebase` first, so the later push is not rejected. This workflow never touches `web/guide/`, `tools/guide.py` or the guide's page list: the Game Guide is hand-written and separate from the generated Patch Notes.

## 1. Fetch and prepare
1. `python tools/notes.py fetch` (add `--dry-run` first if the user wants to see what is new). This prepends new GitHub releases to `data/release_notes.md`.
2. `python tools/notes.py prepare`. It writes `data/inbox/pending.md` (raw notes, PR titles, allowed values), `data/inbox/topics.txt` (every existing topic, its hub and systems), `data/inbox/rows.draft.jsonl` (a pre-filled draft) and `data/inbox/skipped.txt` (bullets it left out). If it says nothing is pending, stop.
3. Read pending.md and topics.txt fully before touching the draft.

## 2. Review `data/inbox/rows.draft.jsonl`, then approve
The draft already has `id`, `version`, `date`, `source`, `platforms`, `dev_note` and guesses for the rest. Each row's `_review` lists the fields to check. Do not trust the guesses: on past releases `entity` was right about a quarter of the time and `system` about half. For every row decide `entity`, `system`, `change_type`, `direction`, `tags` and rewrite `summary` (the draft only copies the bullet's first sentence). Split a bullet that bundles several changes into several rows (keep the ids sequential), delete rows that are not changes, and restore anything in `skipped.txt` that was wrongly left out. Replace every `TODO` entity. Then run `python tools/notes.py approve`, which strips `_review` and writes `data/inbox/rows.jsonl`.
Row rules, for every row: one JSON object per line, one change per row, oldest version first. Fields, in this order:
`id, version, date, system, entity, change_type, direction, summary, tags, platforms, dev_note, source`

- `id`: `<version>-001`, `-002`, ... with no gaps, per release. `version` and `date` come from the release header in pending.md.
- `entity`: the topic this change belongs to. Reuse a name from topics.txt exactly whenever the change is about that thing. Only invent a new name for a genuinely new feature: Title Case, a short noun phrase, no system suffix, no "Changes"/"History".
- `summary`: must start with `<entity>: ` followed by a plain-words sentence fragment starting lower case, present tense, no version numbers, no code names unless they are the name of the thing. Rephrase and tighten the bullet; keep numbers, names and units exactly. See existing rows in `data/normalized/all.jsonl` for tone.
- `source`: the original bullet text, unchanged.
- `system`, `change_type`, `tags`, `platforms`: only values listed in pending.md. 1 to 3 tags. `platforms` is `["all"]` unless the note says otherwise.
- `direction`: `+` for a buff or increase to the player's benefit, `−` (U+2212) for a nerf or decrease, `~` for a change that is neither, `n/a` for everything else (most rows). A "was X, now Y" change is `+` or `−` only when it is clearly better or worse for the player.
- `dev_note`: developer reasoning given in the notes (why, not what), verbatim; otherwise `null`.
- Currency: write the name the release uses (Marks to 0.1.4942, Drakes 0.1.4943 to 0.1.5579, silver from 0.1.5580). The product name is Daggerfall Online.

Skip: the headline title and intro paragraph, statements of no change, rollout, credits, "For developers", "For the team" and deploy-order sections, and Release Tooling pull requests. Keep known limitations as `change_type` Other. A release with no player-visible changes produces no rows (ingest still records it). A bullet that bundles several changes becomes several rows. If a release has no body notes, use each PR title as the source.

## 3. Ingest
`python tools/notes.py ingest`. It validates ids, dates, taxonomy values and the summary prefix, and writes nothing if there is any error: fix the rows and run it again. On success it appends to `data/normalized/`, records the releases, assigns hubs to new topics in `data/hub_assignment.csv` (check those guesses and edit the CSV if a hub is wrong) and writes `data/inbox/describe.md`.
Warnings about tags not in the taxonomy are allowed but add the tag to `data/normalized/taxonomy.json` if it is meant to stay.

## 4. Descriptions
Read `data/inbox/describe.md`. For each topic listed, write one line `Topic ||| description` into `data/descriptions/patch-<latest version>.txt`. A description is 1 to 4 sentences saying what the topic is and how it works as of its latest change. Later changes override earlier ones, so describe the current behaviour and mention what changed only when it explains the current state. Never invent anything the changes do not say. Where a CURRENT description is shown, update it rather than starting over. A topic with a single vague change gets one honest sentence.

## 5. Build and check
`python tools/notes.py build` rebuilds `web/data.js` and reports topics with no description, descriptions for unknown topics and any stale ones. Open `web/index.html` and check the new patch page and one changed topic. Report to the user: which versions were added, how many rows, any new topics and their hubs, and anything uncertain.

## 6. Commit, then hand over the push
Run `python tools/notes.py selftest`, then commit the new data, descriptions and `web/data.js` (`git add -A` is safe: generated files such as `web/guide/index.json` and the local-only release text are git-ignored). Commit with the project identity (tau / tau-samsara@users.noreply.github.com) and no personal email. Do not push: tell the user to run `git pull --rebase` (only if GitHub has new commits) and `git push`, then hard-refresh the site once the deploy finishes. The deploy workflow rebuilds the Game Guide page list by itself.
