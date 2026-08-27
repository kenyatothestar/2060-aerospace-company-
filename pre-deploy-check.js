const fs = require("fs");

const files = [
  "server.js",
  "database.js",
  "auth.js",
  "package.json",
  "frontend/index.html",
  "render.yaml",
  "DEPLOYMENT.md",
  "RELEASE_CHECKLIST.md"
];

let failed = false;

for (const file of files) {
  if (fs.existsSync(file)) {
    console.log("✓ " + file);
  } else {
    console.log("✗ MISSING: " + file);
    failed = true;
  }
}

try {
  require("./database");
  console.log("✓ DATABASE MODULE: LOADABLE");
} catch (e) {
  console.log("✗ DATABASE MODULE: " + e.message);
  failed = true;
}

try {
  require("./auth");
  console.log("✓ AUTH MODULE: LOADABLE");
} catch (e) {
  console.log("✗ AUTH MODULE: " + e.message);
  failed = true;
}

if (!fs.existsSync(".gitignore")) {
  console.log("✗ .gitignore: MISSING");
  failed = true;
} else {
  console.log("✓ .gitignore: PRESENT");
}

console.log("========================================");

if (failed) {
  console.log("2060 PRE-DEPLOY STATUS: CHECK REQUIRED");
  process.exit(1);
}

console.log("2060 PRE-DEPLOY STATUS: READY");
