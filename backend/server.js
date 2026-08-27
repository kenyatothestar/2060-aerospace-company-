const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

let missions = [];

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    const file = path.join(__dirname, "../frontend/index.html");
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(fs.readFileSync(file));
    return;
  }

  if (req.method === "OPTIONS") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      service: "2060 Mission Control API",
      status: "online"
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/missions") {
    sendJson(res, 200, missions);
    return;
  }

  if (req.method === "POST" && req.url === "/api/missions") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      let data = {};

      try {
        data = body ? JSON.parse(body) : {};
      } catch {
        sendJson(res, 400, {
          error: "Invalid JSON"
        });
        return;
      }

      const mission = {
        id: "MC-" + String(missions.length + 1).padStart(3, "0"),
        name: data.name || "Unnamed Mission",
        vehicle: data.vehicle || "2060-X1",
        destination: data.destination || "Low Earth Orbit",
        status: "READY",
        createdAt: new Date().toISOString()
      };

      missions.push(mission);

      sendJson(res, 201, mission);
    });

    return;
  }

  sendJson(res, 404, {
    error: "Endpoint not found"
  });

});

server.listen(PORT, () => {
  console.log("2060 Mission Control API running on port " + PORT);
});
