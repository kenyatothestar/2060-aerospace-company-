// 2060 Mission Control
// Backend API V1.0

const http = require("http");

const telemetry = {
  missionId: "MC-001",
  vehicleId: "2060-X1",
  status: "READY",
  altitudeKm: 0,
  speedKmh: 0,
  fuelPercent: 100,
  temperatureC: 20,
  signal: "NOMINAL",
  timestamp: new Date().toISOString()
};

const server = http.createServer((req, res) => {

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.url === "/api/health") {

    res.writeHead(200);

    res.end(JSON.stringify({
      system: "2060 Mission Control",
      status: "ONLINE"
    }));

    return;
  }

  if (req.url === "/api/telemetry") {

    res.writeHead(200);

    res.end(JSON.stringify({
      ...telemetry,
      timestamp: new Date().toISOString()
    }));

    return;
  }

  res.writeHead(404);

  res.end(JSON.stringify({
    error: "Endpoint not found"
  }));

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(
    `2060 Mission Control API running on port ${PORT}`
  );
});
