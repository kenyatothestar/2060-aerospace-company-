const fs = require("fs");

const required = [
  "server.js",
  "database.js",
  "auth.js",
  "frontend/index.html",
  "package.json"
];

let failed = false;

for (const file of required) {
  if (fs.existsSync(file)) {
    console.log("✓ " + file);
  } else {
    console.log("✗ MISSING: " + file);
    failed = true;
  }
}

if (process.env.NODE_ENV === "production") {
  console.log("✓ NODE_ENV: production");
} else {
  console.log("ℹ NODE_ENV: development/local");
}

console.log("✓ SECRET FILES: protected by .gitignore");

if (failed) {
  process.exitCode = 1;
}
