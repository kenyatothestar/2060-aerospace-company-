// 2060 Mission Control
// Mission Operations API V1.2

const http = require("http");
const mission = require("../database/mission");

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // System health
  if (req.method === "GET" && req.url === "/api/health") {
    sendJSON(res, 200, {
      system: "2060 Mission Control",
      status: "ONLINE",
      version: "1.2.0",
      environment: "development"
    });
    return;
  }

  // Mission information
  if (req.method === "GET" && req.url === "/api/mission") {
    sendJSON(res, 200, mission);
    return;
  }

  // Telemetry
  if (req.method === "GET" && req.url === "/api/telemetry") {
    sendJSON(res, 200, {
      missionId: mission.missionId,
      vehicleId: mission.vehicleId,
      timestamp: new Date().toISOString(),
      ...mission.telemetry
    });
    return;
  }

  // API information
  if (req.method === "GET" && req.url === "/api") {
    sendJSON(res, 200, {
      name: "2060 Mission Control API",
      version: "1.2.0",
      endpoints: [
        "/api/health",
        "/api/mission",
        "/api/telemetry"
      ]
    });
    return;
  }

  sendJSON(res, 404, {
    error: "Endpoint not found",
    path: req.url
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    `2060 Mission Control API running on port ${PORT}`
  );
});
