(function () {
  "use strict";
  var D = window.DATA, rows = D.rows, app = document.getElementById("app");
  var SITE = "Unofficial Daggerfall Online Pages", SHORT = "UDFOP";
  var TYPES = ["Buff", "Nerf", "Removal", "New", "Rework", "Fix", "Performance", "Economy", "QoL", "UI", "Other"];
  var TYPE_LABEL = { Buff: "Buffs", Nerf: "Nerfs", Removal: "Removals", New: "Additions", Rework: "Reworks", Fix: "Fixes",
    Performance: "Performance", Economy: "Economy", QoL: "Quality of life", UI: "Interface", Other: "Other changes" };
  var TYPE_COLOR = { Buff: "var(--buff)", Nerf: "var(--nerf)", Removal: "var(--nerf)", New: "var(--new)", Rework: "var(--rework)", Fix: "var(--fix)" };

  /* ---------- display settings (saved in this browser only) ---------- */
  var SETTINGS_KEY = "udfop.settings";
  var SETTING_OPTIONS = { skin: ["default", "parchment", "iliac", "oblivion"], size: ["small", "medium", "large"], width: ["standard", "wide"], theme: ["auto", "light", "dark"] };
  var SETTING_DEFAULTS = { skin: "default", size: "medium", width: "standard", theme: "auto" };
  function loadSettings() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") || {}; } catch (e) {}
    var out = {};
    Object.keys(SETTING_DEFAULTS).forEach(function (k) { out[k] = SETTING_OPTIONS[k].indexOf(saved[k]) >= 0 ? saved[k] : SETTING_DEFAULTS[k]; });
    return out;
  }
  function saveSettings(st) {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(st)); return true; } catch (e) { return false; }
  }
  function applySettings(st) {
    var d = document.documentElement;
    [["skin", "default"], ["size", "medium"], ["width", "standard"], ["theme", "auto"]].forEach(function (p) {
      if (st[p[0]] === p[1]) d.removeAttribute("data-" + p[0]); else d.setAttribute("data-" + p[0], st[p[0]]);
    });
  }
  function syncHeadH() {
    var h = document.getElementById("head");
    if (h) document.documentElement.style.setProperty("--head-h", h.offsetHeight + "px");
  }
  window.addEventListener("resize", syncHeadH);
  if (window.ResizeObserver) new ResizeObserver(syncHeadH).observe(document.getElementById("head"));
  applySettings(loadSettings());
  syncHeadH();

  /* ---------- helpers ---------- */
  function vcmp(a, b) {
    var x = a.split(".").map(Number), y = b.split(".").map(Number);
    for (var i = 0; i < Math.max(x.length, y.length); i++) { var d = (x[i] || 0) - (y[i] || 0); if (d) return d; }
    return 0;
  }
  function newest(a, b) { return vcmp(b.v, a.v) || (a.id < b.id ? 1 : -1); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function enc(s) { return encodeURIComponent(s); }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function group(list, key) { var m = {}; list.forEach(function (r) { (m[r[key]] = m[r[key]] || []).push(r); }); return m; }
  function uniq(list) { var m = {}; list.forEach(function (k) { m[k] = 1; }); return Object.keys(m); }
  function vers(list) { return uniq(list.map(function (r) { return r.v; })).sort(vcmp); }
  function slugId(s) { return "s-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  var byTopic = group(rows, "e"), bySystem = group(rows, "s"), byVersion = group(rows, "v");
  var topics = Object.keys(byTopic).sort(function (a, b) { return a.localeCompare(b); });
  var versions = Object.keys(byVersion).sort(vcmp).reverse();
  var systems = Object.keys(bySystem).sort();
  var hubs = {};
  topics.forEach(function (t) { var h = D.hubs[t] || "Uncategorised"; (hubs[h] = hubs[h] || []).push(t); });
  var hubNames = Object.keys(hubs).sort(function (a, b) {
    if (a === "Uncategorised") return 1; if (b === "Uncategorised") return -1; return a.localeCompare(b);
  });
  function dateOf(v) { var r = D.releases[v]; return r ? r.date : byVersion[v][0].d; }
  function lastVer(list) { return vers(list).pop(); }
  var tagIndex = {};
  topics.forEach(function (t) {
    var m = {}; byTopic[t].forEach(function (r) { (r.g || []).forEach(function (g) { m[g] = (m[g] || 0) + 1; }); });
    tagIndex[t] = m;
  });

  /* ---------- fragments ---------- */
  function tlink(t) { return '<a href="#/topic/' + enc(t) + '">' + esc(t) + "</a>"; }
  function vlink(v) { return '<a href="#/patch/' + enc(v) + '">' + esc(v) + "</a>"; }
  function slink(s) { return '<a href="#/system/' + enc(s) + '">' + esc(s) + "</a>"; }
  function hlink(h) { return '<a href="#/hub/' + enc(h) + '">' + esc(h) + "</a>"; }
  function typeTag(r) { return '<span class="tp" data-type="' + esc(r.t) + '">' + esc(r.t) + "</span>"; }
  function dir(r) { return r.r === "+" ? " (increase)" : r.r === "−" ? " (decrease)" : ""; }
  function text(r) { return esc(cap(r.x)) + (r.n ? '<span class="dev">Developer note: ' + esc(r.n) + "</span>" : ""); }

  function page(title, body, opts) {
    opts = opts || {};
    return '<h1 class="title">' + title + '</h1><div class="tagline">From ' + SITE + "</div>" +
      (opts.hat ? '<div class="hat">' + opts.hat + "</div>" : "") + body;
  }
  function sec(id, title, lvl) { return "<h" + lvl + ' class="sec" id="' + slugId(id) + '" data-toc="' + esc(title) + '">' + esc(title) + "</h" + lvl + ">"; }

  function table(list, cols, limit) {
    list = list.slice().sort(newest);
    var more = limit && list.length > limit ? list.length - limit : 0;
    if (more) list = list.slice(0, limit);
    var h = '<div class="wrap"><table class="wikitable"><thead><tr>' + cols.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>";
    list.forEach(function (r) {
      h += "<tr>" + cols.map(function (c) {
        switch (c) {
          case "Patch": return '<td class="nowrap">' + vlink(r.v) + "</td>";
          case "Date": return '<td class="nowrap">' + esc(r.d) + "</td>";
          case "Topic": return "<td>" + tlink(r.e) + "</td>";
          case "System": return "<td>" + slink(r.s) + "</td>";
          case "Type": return "<td>" + typeTag(r) + "</td>";
          case "Direction": return '<td data-dir="' + esc(r.r) + '">' + (r.r === "n/a" ? "" : esc(r.r)) + "</td>";
          default: return "<td>" + text(r) + "</td>";
        }
      }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>" + (more ? '<p class="muted">' + plural(more, "older change") + " not shown.</p>" : "");
  }

  function bullets(list, withTopic) {
    return '<ul class="bul">' + list.slice().sort(newest).map(function (r) {
      return "<li>" + (withTopic ? "<b>" + tlink(r.e) + "</b> – " : "") + typeTag(r) + ": " + text(r) + "</li>";
    }).join("") + "</ul>";
  }

  function topicList(list, cols) {
    return '<ul class="cols">' + list.map(function (t) {
      var l = byTopic[t];
      return "<li>" + tlink(t) + (cols === false ? "" : " <small>(" + l.length + ")</small>") + "</li>";
    }).join("") + "</ul>";
  }

  function cats(items) {
    items = items.filter(Boolean);
    return '<div class="cats"><b>Categories:</b> ' + items.join(" ") + "</div>";
  }

  function filterBox(ph) { return '<input class="filter" id="f" type="search" placeholder="' + ph + '" aria-label="' + ph + '">'; }

  function relatedTopics(t) {
    var mine = tagIndex[t], hub = D.hubs[t], score = {};
    topics.forEach(function (o) {
      if (o === t) return;
      var s = 0, om = tagIndex[o];
      Object.keys(mine).forEach(function (g) { if (om[g]) s += 2; });
      if (hub && D.hubs[o] === hub) s += 1;
      if (s > 0) score[o] = s;
    });
    return Object.keys(score).sort(function (a, b) { return score[b] - score[a] || a.localeCompare(b); }).slice(0, 12);
  }

  /* ---------- views ---------- */
  var views = {};

  views.home = function () {
    var latest = versions[0], lrows = byVersion[latest];
    var recent = uniq(rows.slice().sort(newest).slice(0, 80).map(function (r) { return r.e; })).slice(0, 12);
    var big = topics.slice().sort(function (a, b) { return byTopic[b].length - byTopic[a].length; }).slice(0, 12);
    var h = '<p>Welcome to <b>UDFOP</b>, the <b>Unofficial Daggerfall Online Pages</b>, a fan-made reference for what has changed in Daggerfall Online. It covers <b>' +
      rows.length.toLocaleString() + "</b> recorded changes to <b>" + topics.length + '</b> topics across <b>' + versions.length + "</b> patches, from version " +
      esc(versions[versions.length - 1]) + " (" + esc(dateOf(versions[versions.length - 1])) + ") to " + esc(latest) + " (" + esc(dateOf(latest)) + ").</p>";
    h += '<div class="portals">';
    h += '<div class="portal"><h3>Latest patch</h3><div><p><b>' + vlink(latest) + "</b> – " + esc(dateOf(latest)) + "<br>" + plural(lrows.length, "change") + " to " +
      plural(uniq(lrows.map(function (r) { return r.e; })).length, "topic") + ".</p><ul>" +
      uniq(lrows.map(function (r) { return r.e; })).slice(0, 8).map(function (t) { return "<li>" + tlink(t) + "</li>"; }).join("") +
      '</ul><p><a href="#/recent">All recent changes →</a></p></div></div>';
    h += '<div class="portal"><h3>Recently changed topics</h3><div><ul>' + recent.map(function (t) { return "<li>" + tlink(t) + "</li>"; }).join("") + "</ul></div></div>";
    h += '<div class="portal"><h3>Most documented topics</h3><div><ul>' + big.map(function (t) { return "<li>" + tlink(t) + " <small class='muted'>(" + byTopic[t].length + ")</small></li>"; }).join("") + "</ul></div></div>";
    h += "</div>";
    h += sec("Browse by category", "Browse by category", 2) + '<ul class="cols">' + hubNames.map(function (n) {
      return "<li>" + hlink(n) + " <small>(" + hubs[n].length + ")</small></li>"; }).join("") + "</ul>";
    h += sec("Browse by game system", "Browse by game system", 2) + '<ul class="cols">' + systems.map(function (s) {
      return "<li>" + slink(s) + " <small>(" + bySystem[s].length + ")</small></li>"; }).join("") + "</ul>";
    return { title: "Main Page", html: page("Main Page", h) };
  };

  views.recent = function () {
    var shown = 8;
    var html = page("Recent changes", '<p>The newest patches first. Each entry is one change recorded in the official release notes.</p><div id="rc"></div><p><button class="more" id="more">Show older patches</button></p>');
    return { title: "Recent changes", html: html, after: function () {
      var box = document.getElementById("rc"), btn = document.getElementById("more"), n = 0;
      function more() {
        var end = Math.min(versions.length, n + shown), h = "";
        for (; n < end; n++) {
          var v = versions[n], g = group(byVersion[v], "e");
          h += '<h2 class="sec">' + vlink(v) + ' <small class="muted">– ' + esc(dateOf(v)) + "</small></h2>";
          Object.keys(g).sort().forEach(function (t) { h += "<h3 class='sec'>" + tlink(t) + "</h3>" + bullets(g[t], false); });
        }
        box.insertAdjacentHTML("beforeend", h);
        if (n >= versions.length) btn.parentNode.hidden = true;
      }
      btn.addEventListener("click", more); more();
    } };
  };

  views.topics = function () {
    var letters = {}, h = "";
    topics.forEach(function (t) { var c = /^[A-Za-z]/.test(t) ? t.charAt(0).toUpperCase() : "#"; (letters[c] = letters[c] || []).push(t); });
    var all = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");
    h += "<p>" + plural(topics.length, "topic") + ", listed alphabetically. The number in brackets is how many changes are recorded.</p>" + filterBox("Filter topics…");
    h += '<div class="alpha">' + all.map(function (c) { return letters[c] ? '<a href="#/topics" data-scroll="' + slugId("L" + c) + '">' + c + "</a>" : "<span>" + c + "</span>"; }).join(" ") + "</div>";
    all.forEach(function (c) { if (letters[c]) h += '<div class="letter"><h2 class="sec" id="' + slugId("L" + c) + '">' + c + "</h2>" + topicList(letters[c]) + "</div>"; });
    return { title: "All topics", html: page("All topics", h), after: function () { wireFilter(".letter li", ".letter"); } };
  };

  views.hubs = function () {
    var h = "<p>Topics are grouped into categories by subject.</p>" + '<ul class="cols">' + hubNames.map(function (n) {
      return "<li>" + hlink(n) + " <small>(" + plural(hubs[n].length, "topic") + ")</small></li>"; }).join("") + "</ul>";
    return { title: "Categories", html: page("Categories", h) };
  };

  views.hub = function (n) {
    if (!hubs[n]) return notFound(n);
    var all = []; hubs[n].forEach(function (t) { all = all.concat(byTopic[t]); });
    var h = "<p><b>" + esc(n) + "</b> contains " + plural(hubs[n].length, "topic") + " with " + plural(all.length, "recorded change") + ".</p>" +
      sec("Topics", "Topics", 2) + topicList(hubs[n]) + sec("Latest changes", "Latest changes", 2) + table(all, ["Patch", "Date", "Topic", "Type", "Change"], 25) +
      cats([ '<a href="#/hubs">All categories</a>' ]);
    return { title: "Category: " + n, html: page("Category: " + esc(n), h, { hat: '<a href="#/hubs">Categories</a> › ' + esc(n) }) };
  };

  views.topic = function (t) {
    var l = byTopic[t];
    if (!l) return notFound(t);
    var sys = uniq(l.map(function (r) { return r.s; })).sort(), g = group(l, "t"), hub = D.hubs[t], vs = vers(l);
    var order = TYPES.filter(function (x) { return g[x]; }).concat(Object.keys(g).filter(function (x) { return TYPES.indexOf(x) < 0; }));
    var top = order.slice().sort(function (a, b) { return g[b].length - g[a].length; })[0];

    var ib = '<table class="infobox"><caption class="ibt">' + esc(t) + "</caption><tbody>" +
      "<tr><th>Category</th><td>" + (hub ? hlink(hub) : "Uncategorised") + "</td></tr>" +
      "<tr><th>Systems</th><td>" + sys.map(slink).join(", ") + "</td></tr>" +
      "<tr><th>First recorded</th><td>" + vlink(vs[0]) + "<br><small class='muted'>" + esc(dateOf(vs[0])) + "</small></td></tr>" +
      "<tr><th>Latest change</th><td>" + vlink(vs[vs.length - 1]) + "<br><small class='muted'>" + esc(dateOf(vs[vs.length - 1])) + "</small></td></tr>" +
      "<tr><th>Changes</th><td>" + l.length + " in " + plural(vs.length, "patch") + "</td></tr>" +
      '<tr><td colspan="2" class="sub">Change types</td></tr><tr><td colspan="2"><div class="bar">' +
      order.map(function (x) { return '<i title="' + esc(x) + ": " + g[x].length + '" style="width:' + (100 * g[x].length / l.length) + "%;background:" + (TYPE_COLOR[x] || "var(--other)") + '"></i>'; }).join("") +
      "</div></td></tr>" +
      order.map(function (x) { return "<tr><th>" + esc(x) + "</th><td>" + g[x].length + "</td></tr>"; }).join("") +
      "</tbody></table>";

    var lead = D.desc && D.desc[t] ? "<p>" + esc(D.desc[t]).replace(esc(t), "<b>" + esc(t) + "</b>") + "</p>" :
      "<p><b>" + esc(t) + "</b> is a topic" + (hub ? " in the " + hlink(hub) + " category" : "") + ". It has " + plural(l.length, "recorded change") +
      " across " + (sys.length > 1 ? "the " + sys.map(slink).join(", ") + " systems" : "the " + slink(sys[0]) + " system") + ", from patch " + vlink(vs[0]) +
      (vs.length > 1 ? " to " + vlink(vs[vs.length - 1]) : "") + ". " +
      (order.length > 1 ? "Most of them are " + esc(TYPE_LABEL[top] ? TYPE_LABEL[top].toLowerCase() : top.toLowerCase()) + " (" + g[top].length + ")." : "") + "</p>";

    var h = ib + lead + '<div id="toc"></div>';
    h += sec("Latest changes", "Latest changes", 2) + bullets(l.slice().sort(newest).slice(0, Math.min(5, l.length)), false);
    h += sec("History", "History", 2) + table(l, ["Patch", "Date", "System", "Type", "Direction", "Change"]);
    if (order.length > 1) {
      h += sec("By type", "Changes by type", 2);
      order.forEach(function (x) { h += sec("type-" + x, TYPE_LABEL[x] || x, 3) + bullets(g[x], false).replace(/<span class="tp"[^>]*>[^<]*<\/span>: /g, ""); });
    }
    var rel = relatedTopics(t);
    if (rel.length) h += sec("See also", "See also", 2) + '<ul class="cols">' + rel.map(function (o) { return "<li>" + tlink(o) + "</li>"; }).join("") + "</ul>";
    h += cats((hub ? [hlink(hub)] : []).concat(sys.map(function (s) { return slink(s) + " system"; })).concat(
      Object.keys(tagIndex[t]).sort(function (a, b) { return tagIndex[t][b] - tagIndex[t][a]; }).slice(0, 4).map(function (g2) {
        return '<a href="#/search/' + enc(g2) + '">' + esc(g2) + "</a>"; })));
    return { title: t, html: page(esc(t), h, { hat: hub ? '<a href="#/hubs">Categories</a> › ' + hlink(hub) + " › " + esc(t) : "" }), toc: true };
  };

  views.systems = function () {
    var h = "<p>Each recorded change belongs to one of " + systems.length + " game systems.</p>" + '<ul class="cols">' + systems.map(function (s) {
      return "<li>" + slink(s) + " <small>(" + plural(uniq(bySystem[s].map(function (r) { return r.e; })).length, "topic") + ", " + plural(bySystem[s].length, "change") + ")</small></li>"; }).join("") + "</ul>";
    return { title: "Game systems", html: page("Game systems", h) };
  };

  views.system = function (s) {
    var l = bySystem[s];
    if (!l) return notFound(s);
    var tp = uniq(l.map(function (r) { return r.e; })).sort();
    var h = "<p><b>" + esc(s) + "</b> has " + plural(l.length, "recorded change") + " across " + plural(tp.length, "topic") + ".</p>" +
      sec("Topics", "Topics", 2) + topicList(tp) + sec("Latest changes", "Latest changes", 2) + table(l, ["Patch", "Date", "Topic", "Type", "Direction", "Change"], 30);
    return { title: s + " system", html: page(esc(s) + " system", h, { hat: '<a href="#/systems">Game systems</a> › ' + esc(s) }) };
  };

  views.patches = function () {
    var h = "<p>" + plural(versions.length, "patch") + ", newest first.</p>" + filterBox("Filter by version or date…") +
      '<table class="wikitable"><thead><tr><th>Patch</th><th>Date</th><th>Changes</th><th>Topics</th></tr></thead><tbody>' +
      versions.map(function (v) {
        return "<tr><td>" + vlink(v) + "</td><td>" + esc(dateOf(v)) + "</td><td>" + byVersion[v].length + "</td><td>" +
          uniq(byVersion[v].map(function (r) { return r.e; })).length + "</td></tr>";
      }).join("") + "</tbody></table>";
    return { title: "Patch index", html: page("Patch index", h), after: function () { wireFilter("tbody tr", "tbody tr"); } };
  };

  views.patch = function (v) {
    var l = byVersion[v];
    if (!l) return notFound("Patch " + v);
    var i = versions.indexOf(v), rel = D.releases[v], g = group(l, "e"), names = Object.keys(g).sort();
    var h = '<div class="pager">' + (i < versions.length - 1 ? '<a href="#/patch/' + enc(versions[i + 1]) + '">← Older: ' + esc(versions[i + 1]) + "</a>" : "") +
      (i > 0 ? '<a href="#/patch/' + enc(versions[i - 1]) + '">Newer: ' + esc(versions[i - 1]) + " →</a>" : "") + "</div>";
    h += "<p><b>Patch " + esc(v) + "</b> was released on " + esc(dateOf(v)) + ". It records " + plural(l.length, "change") + " to " + plural(names.length, "topic") + ".</p>";
    h += '<div id="toc"></div>';
    names.forEach(function (t) { h += sec("p-" + t, t, 2).replace(">" + esc(t) + "</h2>", ">" + tlink(t) + "</h2>") + bullets(g[t], false); });
    if (rel && rel.prs.length) h += sec("Pull requests", "Source pull requests", 2) + '<ul class="bul">' + rel.prs.map(function (p) {
      return '<li><a href="' + esc(p.u) + '" rel="noopener">#' + p.n + "</a> " + esc(p.t) + "</li>"; }).join("") + "</ul>";
    return { title: "Patch " + v, html: page("Patch " + esc(v), h, { hat: '<a href="#/patches">Patch index</a> › ' + esc(v) }), toc: names.length > 3 };
  };

  views.search = function (q) {
    q = decodeURIComponent(q || "");
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    var tm = topics.filter(function (t) { return words.every(function (w) { return t.toLowerCase().indexOf(w) >= 0; }); });
    var hit = rows.filter(function (r) {
      var s = (r.e + " " + r.x + " " + (r.n || "") + " " + (r.g || []).join(" ")).toLowerCase();
      return words.every(function (w) { return s.indexOf(w) >= 0; });
    });
    var h = "";
    if (!words.length) h = "<p>Type something in the search box.</p>";
    else {
      h = '<p>Results for <b>' + esc(q) + "</b>: " + plural(tm.length, "matching topic") + " and " + plural(hit.length, "matching change") + ".</p>";
      if (tm.length === 1 && tm[0].toLowerCase() === q.toLowerCase()) h = '<div class="mbox">There is a topic named “' + tlink(tm[0]) + "”.</div>" + h;
      if (tm.length) h += sec("Topics", "Topics", 2) + topicList(tm.slice(0, 80));
      if (hit.length) h += sec("Changes", "Changes", 2) + table(hit, ["Patch", "Topic", "Type", "Change"], 100);
      if (!tm.length && !hit.length) h += "<p>No results. Try fewer or different words.</p>";
    }
    return { title: "Search: " + q, html: page("Search", h) };
  };

  views.about = function () {
    var latest = versions[0];
    var h = "<p><b>UDFOP</b>, the <b>Unofficial Daggerfall Online Pages</b>, is a fan-made patch notes wiki that records what has changed in <b>Daggerfall Online</b>, patch by patch and topic by topic. It is not affiliated with or endorsed by the game's developers, by Bethesda Softworks or by ZeniMax. <i>The Elder Scrolls</i>, <i>Daggerfall</i> and related names are trademarks of their respective owners.</p>";
    h += sec("Where the information comes from", "Where the information comes from", 2) +
      "<p>Every change on this wiki comes from the <a href=\"https://github.com/Lattymoy/daggerfall-js-source/releases\" rel=\"noopener\">public release notes</a> of the project's GitHub repository. Each change has been rewritten in short plain sentences and filed under a topic, a game system and a type. Patch pages link to the pull requests the changes came from, and the release notes themselves remain the authoritative record.</p>";
    h += sec("How the pages are written", "How the pages are written", 2) +
      "<p>The change tables are compiled from the release notes with a small script. The opening paragraph of each topic was written with the help of an AI assistant (Claude) from that topic's change history, and describes how the topic works as of its latest change. These paragraphs can be wrong or out of date, so the <b>History</b> table on each page is the thing to trust. Corrections are welcome.</p>";
    h += sec("Credits and licence", "Credits and licence", 2) +
      "<p>Compiled and maintained by <b>tau</b>. The site code is released under the MIT licence and the topic descriptions and other original text are licensed CC BY 4.0. The change data is derived from the developer's release notes, and the game and its names belong to their owners.</p>";
    h += sec("Coverage", "Coverage", 2) + "<p>" + rows.length.toLocaleString() + " changes in " + topics.length + " topics across " + versions.length + " patches, from " + esc(versions[versions.length - 1]) + " (" + esc(dateOf(versions[versions.length - 1])) + ") to " + esc(latest) + " (" + esc(dateOf(latest)) + ").</p>";
    return { title: "About UDFOP", html: page("About UDFOP", h, { hat: '<a href="#/">Main page</a> › About' }) };
  };

  views.random = function () {
    location.replace("#/topic/" + enc(topics[Math.floor(Math.random() * topics.length)]));
    return null;
  };

  function notFound(name) {
    return { title: "Not found", html: page("Page not found", '<div class="mbox">This wiki has no page called “' + esc(name || "") + '”. Try the search box, or go to <a href="#/topics">All topics</a>.</div>') };
  }

  /* ---------- behaviours ---------- */
  function wireFilter(itemSel, hideSel) {
    var box = document.getElementById("f"); if (!box) return;
    box.addEventListener("input", function () {
      var q = box.value.trim().toLowerCase();
      Array.prototype.forEach.call(app.querySelectorAll(itemSel), function (el) { el.hidden = !!q && el.textContent.toLowerCase().indexOf(q) < 0; });
      if (hideSel === ".letter") Array.prototype.forEach.call(app.querySelectorAll(".letter"), function (s) { s.hidden = !s.querySelector("li:not([hidden])"); });
    });
  }

  function buildToc() {
    var box = document.getElementById("toc"); if (!box) return;
    var hs = app.querySelectorAll("h2.sec[data-toc], h3.sec[data-toc]");
    if (hs.length < 3) { box.remove(); return; }
    var h = "<b>Contents</b><ol>", n2 = 0, n3 = 0, open = false;
    Array.prototype.forEach.call(hs, function (el) {
      var link = '<a href="' + location.hash + '" data-scroll="' + el.id + '">' + esc(el.getAttribute("data-toc")) + "</a>";
      if (el.tagName === "H2") { if (open) { h += "</ol></li>"; open = false; } n2++; n3 = 0; h += "<li>" + link; h += "</li>"; }
      else { if (!open) { h = h.replace(/<\/li>$/, "") + "<ol>"; open = true; } n3++; h += "<li>" + link + "</li>"; }
    });
    if (open) h += "</ol></li>";
    box.innerHTML = h + "</ol>";
  }

  function scrollTo(id) { var el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-scroll]");
    if (a) { e.preventDefault(); scrollTo(a.getAttribute("data-scroll")); }
    if (document.body.classList.contains("menu-open") && !e.target.closest("#side") && !e.target.closest("#menu")) setMenu(false);
  });

  function setMenu(on) {
    if (on && typeof settingsPanel !== "undefined" && settingsPanel) settingsPanel.close(false); document.body.classList.toggle("menu-open", on); document.getElementById("menu").setAttribute("aria-expanded", on ? "true" : "false"); }
  document.getElementById("menu").addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });

  /* sidebar */
  document.getElementById("side-patches").innerHTML = versions.slice(0, 6).map(function (v) { return "<li>" + vlink(v) + "</li>"; }).join("") +
    '<li><a href="#/patches">More…</a></li>';
  document.getElementById("side-hubs").innerHTML = hubNames.map(function (n) { return "<li>" + hlink(n) + "</li>"; }).join("");
  document.getElementById("foot-stats").textContent = rows.length.toLocaleString() + " changes · " + topics.length + " topics · " + versions.length + " patches · latest " + versions[0] + " (" + dateOf(versions[0]) + ")";

  /* search box with suggestions */
  var q = document.getElementById("q"), sug = document.getElementById("suggest"), cur = -1;
  function suggestions() {
    var v = q.value.trim().toLowerCase();
    if (!v) { sug.hidden = true; return; }
    var pre = [], mid = [];
    topics.forEach(function (t) { var i = t.toLowerCase().indexOf(v); if (i === 0) pre.push(t); else if (i > 0) mid.push(t); });
    var list = pre.concat(mid).slice(0, 8);
    sug.innerHTML = list.map(function (t) { return '<li><a href="#/topic/' + enc(t) + '">' + esc(t) + "<small>" + plural(byTopic[t].length, "change") + "</small></a></li>"; }).join("") +
      '<li><a href="#/search/' + enc(q.value.trim()) + '">Search for “' + esc(q.value.trim()) + "”<small>full text</small></a></li>";
    sug.hidden = false; cur = -1;
  }
  q.addEventListener("input", suggestions);
  q.addEventListener("keydown", function (e) {
    var items = sug.querySelectorAll("a");
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!items.length) return;
      if (cur >= 0) items[cur].classList.remove("cur");
      cur = (cur + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; items[cur].classList.add("cur");
    } else if (e.key === "Escape") { sug.hidden = true; }
  });
  document.getElementById("search").addEventListener("submit", function (e) {
    e.preventDefault();
    var items = sug.querySelectorAll("a"), v = q.value.trim();
    if (cur >= 0 && items[cur]) location.hash = items[cur].getAttribute("href");
    else if (v) { var exact = topics.filter(function (t) { return t.toLowerCase() === v.toLowerCase(); })[0]; location.hash = exact ? "#/topic/" + enc(exact) : "#/search/" + enc(v); }
    sug.hidden = true; q.blur();
  });
  document.addEventListener("click", function (e) { if (!e.target.closest("#search")) sug.hidden = true; });

  /* ---------- settings panel (slides in from the right) ---------- */
  var settingsPanel = (function () {
    var panel = document.getElementById("settings-panel"), body = document.getElementById("settings-body"),
        gear = document.getElementById("gear"), st = loadSettings(), warned = false;
    var GROUPS = [
      { key: "skin", legend: "Theme", help: "The overall look. Each theme has a light and a dark version.", grid: true,
        labels: ["Default", "Parchment", "Iliac Bay", "Oblivion"], swatches: [["#ffffff", "#8a5a1a"], ["#f8f1de", "#8a2f0c"], ["#fafdfe", "#0f766e"], ["#171213", "#e4583f"]] },
      { key: "theme", legend: "Color", help: "Auto follows your device's light or dark setting.", labels: ["Auto", "Light", "Dark"] },
      { key: "size", legend: "Text size", help: "Scales all text and spacing.", labels: ["Small", "Medium", "Large"] },
      { key: "width", legend: "Page width", help: "Standard keeps lines comfortable to read; Wide uses the whole window.", labels: ["Standard", "Wide"] }
    ];
    body.innerHTML = GROUPS.map(function (g) {
      return '<fieldset class="setting"><legend>' + g.legend + "</legend><p class='muted'>" + g.help + '</p><div class="seg' + (g.grid ? " grid" : "") + '">' +
        SETTING_OPTIONS[g.key].map(function (v, i) { return '<label><input type="radio" name="' + g.key + '" value="' + v + '"><span>' + (g.swatches ? '<i class="dot" style="background:linear-gradient(135deg,' + g.swatches[i][0] + " 50%," + g.swatches[i][1] + ' 50%)"></i>' : "") + g.labels[i] + "</span></label>"; }).join("") +
        "</div></fieldset>";
    }).join("") + '<p><button class="more" id="reset-settings" type="button">Reset to defaults</button></p>' +
      '<p class="muted" id="settings-note">Saved in this browser only, so your choices do not follow you to another browser or device, and clearing your browser’s site data resets them. Nothing is sent anywhere.</p>';
    var inputs = body.querySelectorAll("input");
    function sync() { Array.prototype.forEach.call(inputs, function (i) { i.checked = st[i.name] === i.value; }); }
    function change(next) {
      st = next; applySettings(st); syncHeadH(); sync();
      if (!saveSettings(st) && !warned) {
        warned = true;
        var note = document.getElementById("settings-note");
        note.innerHTML = "<b>Your browser is blocking storage</b>, so these choices will reset when you leave this page. " + note.innerHTML;
      }
    }
    Array.prototype.forEach.call(inputs, function (i) {
      i.addEventListener("change", function () { var n = {}; Object.keys(st).forEach(function (k) { n[k] = st[k]; }); n[i.name] = i.value; change(n); });
    });
    document.getElementById("reset-settings").addEventListener("click", function () { change(JSON.parse(JSON.stringify(SETTING_DEFAULTS))); });
    function isOpen() { return document.body.classList.contains("settings-open"); }
    function open() {
      st = loadSettings(); sync();
      document.body.classList.remove("menu-open");
      document.body.classList.add("settings-open");
      gear.setAttribute("aria-expanded", "true"); panel.setAttribute("aria-hidden", "false");
      var first = body.querySelector("input:checked"); if (first) first.focus();
    }
    function close(returnFocus) {
      document.body.classList.remove("settings-open");
      gear.setAttribute("aria-expanded", "false"); panel.setAttribute("aria-hidden", "true");
      if (returnFocus) gear.focus();
    }
    gear.addEventListener("click", function () { if (isOpen()) close(true); else open(); });
    document.getElementById("settings-close").addEventListener("click", function () { close(true); });
    document.addEventListener("click", function (e) {
      if (isOpen() && window.matchMedia("(max-width: 1100px)").matches && !e.target.closest("#settings-panel") && !e.target.closest("#gear")) close(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) close(true); });
    sync();
    return { open: open, close: close };
  })();

  /* router */
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/"), name = parts[0] || "home", arg = parts.slice(1).join("/");
    if (name !== "search") { try { arg = decodeURIComponent(arg); } catch (e) {} }
    if (name === "settings") { location.replace("#/"); settingsPanel.open(); return; }
    var view = views[name], res = view ? view(arg) : notFound(location.hash);
    if (!res) return;
    app.innerHTML = res.html;
    document.title = (name === "home" ? SITE + " (Patch Notes Wiki)" : res.title + " – " + SHORT);
    var nav = { home: "home", recent: "recent", topics: "topics", topic: "topics", hubs: "hubs", hub: "hubs", systems: "systems", system: "systems", patches: "patches", patch: "patches", about: "about" }[name];
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) { a.classList.toggle("on", a.getAttribute("data-nav") === nav); });
    if (res.toc !== false) buildToc();
    if (res.after) res.after();
    setMenu(false); sug.hidden = true;
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
