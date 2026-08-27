const http = require("http");

const port = process.env.PORT || 4000;

const request = http.get(`http://localhost:${port}`, (res) => {
  console.log(`API STATUS: HTTP ${res.statusCode}`);

  if (res.statusCode >= 200 && res.statusCode < 300) {
    console.log("✓ API HEALTH: HEALTHY");
    process.exit(0);
  }

  console.log("✗ API HEALTH: CHECK REQUIRED");
  process.exit(1);
});

request.on("error", (err) => {
  console.log("✗ API HEALTH: OFFLINE");
  console.log(err.message);
  process.exit(1);
});
