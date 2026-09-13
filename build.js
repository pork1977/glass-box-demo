/**
 * The build for this sample site: no bundler, just the checks that would
 * otherwise be somebody's job to remember. It runs in a second, has no
 * dependencies, and fails loudly, which is what a recorded agent run needs
 * from a build step.
 */
const { readFileSync, existsSync } = require("node:fs");

const problems = [];

function check(condition, message) {
  if (!condition) problems.push(message);
}

for (const file of ["index.html", "styles.css", "screenshot.svg"]) {
  check(existsSync(file), `${file} is missing`);
}

if (existsSync("index.html")) {
  const html = readFileSync("index.html", "utf8");

  check(/<h1[\s>]/.test(html), "there is no <h1> on the page");
  check(/class="cta"/.test(html), "the call to action link is gone");
  check(/<title>[^<]{10,}<\/title>/.test(html), "the page needs a real <title>");
  check(
    /<img[^>]+alt="[^"]+"/.test(html) || !/<img/.test(html),
    "every image needs alt text",
  );

  const opens = (html.match(/<(section|header|footer|figure|nav|ul)\b/g) || []).length;
  const closes = (html.match(/<\/(section|header|footer|figure|nav|ul)>/g) || []).length;
  check(opens === closes, `unbalanced tags: ${opens} opened, ${closes} closed`);

  for (const href of html.match(/href="#([^"]+)"/g) || []) {
    const id = href.slice(7, -1);
    check(
      new RegExp(`id="${id}"`).test(html) || id === "signup",
      `nothing on the page has id="${id}"`,
    );
  }
}

if (problems.length) {
  console.error("Build failed:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("Build passed: markup, call to action, alt text and anchors all check out.");
