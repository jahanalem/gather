const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const pages = fs.readdirSync(root).filter((name) => name.endsWith(".html"));
const errors = [];

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  const ids = new Set([...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const seenIds = new Set();
  for (const match of source.matchAll(/\bid="([^"]+)"/g)) {
    if (seenIds.has(match[1])) errors.push(`${page}: duplicate id #${match[1]}`);
    seenIds.add(match[1]);
  }
  for (const match of source.matchAll(/\bhref="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const [filePart, fragment] = href.split("#");
    const targetName = filePart || page;
    const targetPath = path.resolve(root, targetName);
    if (!fs.existsSync(targetPath)) {
      errors.push(`${page}: missing target ${href}`);
      continue;
    }
    if (fragment) {
      const targetSource = targetName === page ? source : fs.readFileSync(targetPath, "utf8");
      if (!new RegExp(`\\bid=["']${fragment}["']`).test(targetSource)) errors.push(`${page}: missing fragment ${href}`);
    }
  }
  if (!source.includes('lang="de"') || !source.includes('dir="ltr"')) errors.push(`${page}: missing default language or direction`);
  if (!source.includes('data-component="header"') || !source.includes('data-component="footer"')) errors.push(`${page}: missing shared header or footer target`);
  if (!ids.has("main")) errors.push(`${page}: missing #main landmark target`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Checked ${pages.length} HTML pages: all local links, fragments and shared landmarks are valid.`);
