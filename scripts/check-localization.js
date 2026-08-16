const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const htmlPages = fs.readdirSync(root).filter((name) => name.endsWith(".html")).sort();
const sources = [...htmlPages, "assets/js/app.js"];
const errors = [];
let localizedTagCount = 0;

function attributesFrom(tag) {
  return new Map([...tag.matchAll(/\s([^\s=]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

for (const sourceName of sources) {
  const source = fs.readFileSync(path.join(root, sourceName), "utf8");
  for (const match of source.matchAll(/<[^>]+>/gs)) {
    const tag = match[0];
    const attributes = attributesFrom(tag);
    const localizedKeys = [...attributes.keys()].filter((key) => key === "data-de" || key.startsWith("data-de-"));
    if (localizedKeys.length) localizedTagCount += 1;

    for (const germanKey of localizedKeys) {
      const persianKey = `data-fa${germanKey.slice("data-de".length)}`;
      const germanValue = attributes.get(germanKey);
      const persianValue = attributes.get(persianKey);
      if (!germanValue) errors.push(`${sourceName}: ${germanKey} must not be empty`);
      if (!persianValue) errors.push(`${sourceName}: missing or empty ${persianKey}`);

      const suffix = germanKey.slice("data-de-".length);
      const renderedName = suffix === "aria" ? "aria-label" : suffix;
      const isBodyDocumentTitle = /^<body\b/i.test(tag) && suffix === "title";
      if (["alt", "aria", "placeholder", "title"].includes(suffix) && !isBodyDocumentTitle && attributes.get(renderedName) !== germanValue) {
        errors.push(`${sourceName}: initial ${renderedName} does not match ${germanKey}`);
      }
    }

    for (const persianKey of [...attributes.keys()].filter((key) => key === "data-fa" || key.startsWith("data-fa-"))) {
      const germanKey = `data-de${persianKey.slice("data-fa".length)}`;
      if (!attributes.has(germanKey)) errors.push(`${sourceName}: ${persianKey} has no ${germanKey} pair`);
    }
  }

  if (sourceName.endsWith(".html")) {
    if (!/<html\b[^>]*\blang="de"[^>]*\bdir="ltr"/i.test(source)) errors.push(`${sourceName}: default html lang/dir must be de/ltr`);
    const body = source.match(/<body\b[^>]*>/i)?.[0] || "";
    const bodyAttributes = attributesFrom(body);
    const germanTitle = bodyAttributes.get("data-de-title");
    const persianTitle = bodyAttributes.get("data-fa-title");
    const documentTitle = source.match(/<title>([^<]+)<\/title>/i)?.[1];
    if (!germanTitle || !persianTitle) errors.push(`${sourceName}: localized document titles are required`);
    if (documentTitle !== `${germanTitle} | Gather`) errors.push(`${sourceName}: initial document title does not match data-de-title`);
  }
}

const appSource = fs.readFileSync(path.join(root, "assets/js/app.js"), "utf8");
if (!appSource.includes('const prefix = language === "fa" ? "fa" : "de";')) errors.push("assets/js/app.js: localValue must use lowercase language prefixes");
if (!appSource.includes('element.dataset[`${prefix}${key}`]')) errors.push("assets/js/app.js: localValue must read the lowercase dataset key");
if (!appSource.includes("if (value) element.setAttribute(name, value);")) errors.push("assets/js/app.js: localized attributes must not be replaced with empty values");
if (!appSource.includes('document.querySelectorAll("button[data-language]")')) errors.push("assets/js/app.js: language state must only be applied to switcher buttons");
if (!appSource.includes('event.target.closest("button[data-language]")')) errors.push("assets/js/app.js: language clicks must only target switcher buttons");
if (!appSource.includes("window.requestAnimationFrame(() => {")) errors.push("assets/js/app.js: overlay focus must move after the opening click completes");

const localValueSource = appSource.match(/function localValue\(element, key, language\) \{[\s\S]*?\n  \}/)?.[0];
if (!localValueSource) {
  errors.push("assets/js/app.js: localValue function could not be tested");
} else {
  const context = {};
  vm.runInNewContext(localValueSource, context);
  const dataset = {
    deAlt: "German alt",
    faAlt: "Persian alt",
    deAria: "German aria",
    faAria: "Persian aria",
    dePlaceholder: "German placeholder",
    faPlaceholder: "Persian placeholder",
    deTitle: "German title",
    faTitle: "Persian title"
  };
  for (const key of ["Alt", "Aria", "Placeholder", "Title"]) {
    for (const language of ["de", "fa"]) {
      const expected = dataset[`${language}${key}`];
      const actual = context.localValue({ dataset }, key, language);
      if (actual !== expected) errors.push(`assets/js/app.js: localValue returned an incorrect ${language}${key} value`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlPages.length} HTML pages and the shared script: ${localizedTagCount} localized tags are complete, and localValue passed 8 attribute lookup cases.`);
