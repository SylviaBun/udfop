/* Syntax colours for fenced code blocks. No outside code: each language is a short list of patterns.
   Every piece of the text is escaped here before it is wrapped in a <span class="tk-…">, so the page's own text can never become markup.
   window.udfopHighlight.run(code, lang) returns { html, label }. An unknown or plain language returns the text escaped, uncoloured. */
(function () {
  "use strict";

  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var DQ = '"(?:[^"\\\\\\n]|\\\\.)*"', SQ = "'(?:[^'\\\\\\n]|\\\\.)*'", NUM = "\\b(?:0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)\\b";
  function words(list) { return "\\b(?:" + list.split(" ").join("|") + ")\\b"; }

  /* a language: flags and a list of [token, pattern]. The first pattern that matches at a spot wins, so comments and strings come first.
     Token names: c comment, s string, n number, k keyword, f function or link, a attribute or key, t type or built-in, v variable, m meta, h heading. */
  var LANGS = {
    json: { flags: "g", rules: [["a", DQ + "(?=\\s*:)"], ["s", DQ], ["n", "-?" + NUM], ["k", words("true false null")]] },

    js: { flags: "g", rules: [
      ["c", "\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/"], ["s", DQ + "|" + SQ + "|`(?:[^`\\\\]|\\\\.)*`"],
      ["k", words("break case catch class const continue default delete do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var void while with yield async await interface type enum implements public private protected readonly")],
      ["t", words("console document window Math JSON Object Array String Number Boolean Promise Map Set Date Error undefined null true false NaN Infinity")],
      ["n", NUM], ["f", "\\b[A-Za-z_$][\\w$]*(?=\\()"]] },

    shell: { flags: "gm", rules: [
      ["m", "^[ \\t]*[$>](?= )"], ["c", "(?<![^\\s])#.*"], ["s", DQ + "|" + SQ],
      ["v", "\\$\\{[^}\\n]*\\}|\\$\\(|\\$[A-Za-z_]\\w*|\\$[0-9?@#*!$]"],
      ["k", words("if then else elif fi for while do done case esac function in select until return exit")],
      ["t", words("echo cd ls cat grep sed awk sudo export chmod chown mkdir rm cp mv curl wget tar unzip git npm node python python3 pip apt apt-get dpkg systemctl kill ssh scp touch source set unset alias which head tail find")],
      ["a", "(?<![^\\s])--?[A-Za-z][\\w-]*"], ["n", NUM]] },

    powershell: { flags: "gmi", rules: [
      ["c", "<#[\\s\\S]*?#>|(?<![^\\s])#.*"], ["s", DQ + "|" + SQ], ["v", "\\$\\{[^}\\n]*\\}|\\$[A-Za-z_][\\w:]*"],
      ["k", words("if else elseif foreach for while do switch function param return try catch finally throw break continue in begin process end filter class using")],
      ["f", "\\b(?:Get|Set|New|Remove|Add|Start|Stop|Invoke|Write|Read|Out|Select|Where|ForEach|Test|Import|Export|Copy|Move|Rename|Clear|Enable|Disable|Install|Uninstall|Expand|Compress|Join|Split|Format|ConvertTo|ConvertFrom|Measure|Sort|Group|Show|Wait|Restart|Update|Unblock|Register|Unregister|Resolve|Push|Pop)-[A-Za-z]+\\b"],
      ["a", "(?<![^\\s])-[A-Za-z][\\w]*"], ["n", NUM]] },

    batch: { flags: "gmi", rules: [
      ["c", "(?:^[ \\t]*|(?<=[\\s&(]))(?:rem\\b.*|::.*)"], ["s", DQ],
      ["v", "%~?[0-9a-z_*]+(?:%|\\b)|%[^%\\s]+%|![^!\\s]+!"], ["f", "^[ \\t]*:[A-Za-z_]\\w*"],
      ["k", words("echo off on set if else goto call exit for in do not exist defined start pause setlocal endlocal copy move del dir cd md rd mkdir rmdir type cls errorlevel equ neq lss leq gtr geq title shift")],
      ["a", "(?<=\\s)\\/[A-Za-z?]\\w*"], ["n", NUM]] },

    ini: { flags: "gmi", rules: [
      ["c", "^[ \\t]*[;#].*"], ["t", "^[ \\t]*\\[[^\\]\\n]+\\]"], ["a", "^[ \\t]*[A-Za-z0-9_.\\-]+(?=[ \\t]*[=:])"],
      ["s", DQ + "|" + SQ], ["k", words("true false yes no on off null none")], ["n", "-?" + NUM]] },

    yaml: { flags: "gmi", rules: [
      ["c", "(?<![^\\s])#.*"], ["m", "^(?:---|\\.\\.\\.)[ \\t]*$"],
      ["a", "^[ \\t]*(?:-[ \\t]+)?(?:" + DQ + "|" + SQ + "|[A-Za-z0-9_.\\-]+)(?=[ \\t]*:(?:[ \\t]|$))"],
      ["s", DQ + "|" + SQ], ["t", "[&*][A-Za-z0-9_-]+"], ["k", words("true false yes no on off null")], ["n", "-?" + NUM]] },

    lua: { flags: "g", rules: [
      ["c", "--\\[\\[[\\s\\S]*?\\]\\]|--\\[=\\[[\\s\\S]*?\\]=\\]|--.*"], ["s", DQ + "|" + SQ + "|\\[\\[[\\s\\S]*?\\]\\]|\\[=\\[[\\s\\S]*?\\]=\\]"],
      ["k", words("and break do else elseif end false for function goto if in local nil not or repeat return then true until while")],
      ["t", words("print pairs ipairs require table string math os io type tostring tonumber setmetatable getmetatable pcall error assert select unpack next")],
      ["n", NUM], ["f", "\\b[A-Za-z_]\\w*(?=\\()"]] },

    csharp: { flags: "gm", rules: [
      ["c", "\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/"], ["m", "^[ \\t]*#[A-Za-z]+.*"],
      ["s", '@"(?:[^"]|"")*"|\\$?"(?:[^"\\\\\\n]|\\\\.)*"|' + SQ],
      ["a", "^[ \\t]*\\[[A-Z]\\w*(?:\\([^\\]\\n]*\\))?\\]"],
      ["k", words("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual volatile while async await yield get set value record init required true false null")],
      ["t", words("int string bool float double void var object long char byte decimal uint short ulong ushort sbyte dynamic List Dictionary IEnumerable Task Action Func")],
      ["n", NUM], ["f", "\\b[A-Za-z_]\\w*(?=\\()"]] },

    xml: { flags: "g", rules: [
      ["c", "<!--[\\s\\S]*?-->"], ["m", "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|<![A-Za-z][^>]*>|<\\?[\\s\\S]*?\\?>"],
      ["k", "<\\/?[A-Za-z][\\w:.-]*"], ["a", "[A-Za-z_:][\\w:.-]*(?==[\"'])"], ["s", DQ + "|" + SQ], ["n", "&#?\\w+;"]] },

    python: { flags: "gm", rules: [
      ["c", "#.*"], ["s", '[rbfRBF]{0,2}(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\')|[rbfRBF]{0,2}(?:' + DQ + "|" + SQ + ")"],
      ["m", "^[ \\t]*@[\\w.]+"],
      ["k", words("and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield True False None")],
      ["t", words("print len range int str float list dict set tuple open type isinstance enumerate zip map filter sorted sum min max abs input super self bool bytes object")],
      ["f", "(?<=\\b(?:def|class)\\s+)\\w+"], ["n", NUM]] },

    markdown: { flags: "gm", rules: [
      ["c", "^>.*"], ["m", "^(?:```.*|---[ \\t]*)$"], ["h", "^#{1,6}[ \\t].*"],
      ["s", "`[^`\\n]+`"], ["t", "\\*\\*[^*\\n]+\\*\\*|__[^_\\n]+__"],
      ["f", "!?\\[\\[[^\\]\\n]+\\]\\]|!?\\[[^\\]\\n]*\\]\\([^)\\n]*\\)"], ["n", "\\{\\{[^}\\n]+\\}\\}"],
      ["k", "^[ \\t]*(?:[-*+]|\\d+[.)])(?=[ \\t])"]] }
  };

  /* the names a writer can use, and how the label reads */
  var ALIASES = {
    json: ["json", "JSON", "json"], jsonc: ["json", "JSON"],
    js: ["js", "JavaScript"], javascript: ["js", "JavaScript"], mjs: ["js", "JavaScript"], ts: ["js", "TypeScript"], typescript: ["js", "TypeScript"],
    bash: ["shell", "Bash"], sh: ["shell", "Shell"], shell: ["shell", "Shell"], zsh: ["shell", "Zsh"], console: ["shell", "Console"],
    powershell: ["powershell", "PowerShell"], ps1: ["powershell", "PowerShell"], pwsh: ["powershell", "PowerShell"], ps: ["powershell", "PowerShell"],
    bat: ["batch", "Batch"], batch: ["batch", "Batch"], cmd: ["batch", "Batch"],
    ini: ["ini", "INI"], conf: ["ini", "Config"], cfg: ["ini", "Config"], config: ["ini", "Config"], toml: ["ini", "TOML"], properties: ["ini", "Properties"],
    yaml: ["yaml", "YAML"], yml: ["yaml", "YAML"],
    lua: ["lua", "Lua"],
    cs: ["csharp", "C#"], csharp: ["csharp", "C#"], "c#": ["csharp", "C#"],
    xml: ["xml", "XML"], html: ["xml", "HTML"], xaml: ["xml", "XAML"], svg: ["xml", "SVG"],
    python: ["python", "Python"], py: ["python", "Python"],
    markdown: ["markdown", "Markdown"], md: ["markdown", "Markdown"]
  };
  var MAX = 20000;   /* longer text is shown without colour, so a huge block can never slow the page */
  var compiled = {};

  function paint(src, name) {
    var lang = LANGS[name], re = compiled[name];
    if (!re) {
      re = compiled[name] = new RegExp(lang.rules.map(function (r) { return "(" + r[1] + ")"; }).join("|"), lang.flags);
    }
    re.lastIndex = 0;
    var out = "", last = 0, m, k;
    while ((m = re.exec(src))) {
      if (m[0] === "") { re.lastIndex++; continue; }
      out += esc(src.slice(last, m.index));
      for (k = 1; k <= lang.rules.length; k++) if (m[k] !== undefined) break;
      out += '<span class="tk-' + lang.rules[k - 1][0] + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
    }
    return out + esc(src.slice(last));
  }

  window.udfopHighlight = {
    run: function (code, lang) {
      lang = (lang || "").toLowerCase();
      var a = ALIASES[lang];
      if (!a || code.length > MAX) return { html: esc(code), label: lang ? (a ? a[1] : lang) : "", colored: false };
      return { html: paint(code, a[0]), label: a[1], colored: true };
    },
    names: Object.keys(ALIASES)
  };
})();
