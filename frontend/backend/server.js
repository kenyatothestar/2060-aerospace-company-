// 2060 Mission Control
// Mission Operations API V1.4

const http = require("http");

const missionStore =
  require("../database/missionStore");

const missionRegistry =
  require("../database/missionRegistry");


function sendJSON(res, statusCode, data) {

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data));
}


const server =
  http.createServer((req, res) => {

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }


    // SYSTEM HEALTH

    if (
      req.method === "GET" &&
      req.url === "/api/health"
    ) {

      sendJSON(res, 200, {
        system: "2060 Mission Control",
        status: "ONLINE",
        version: "1.4.0",
        environment: "development"
      });

      return;
    }


    // CURRENT MISSION

    if (
      req.method === "GET" &&
      req.url === "/api/mission"
    ) {

      sendJSON(
        res,
        200,
        missionStore.getMission()
      );

      return;
    }


    // TELEMETRY

    if (
      req.method === "GET" &&
      req.url === "/api/telemetry"
    ) {

      sendJSON(
        res,
        200,
        missionStore.getTelemetry()
      );

      return;
    }


    // LIST MISSIONS

    if (
      req.method === "GET" &&
      req.url === "/api/missions"
    ) {

      sendJSON(
        res,
        200,
        missionRegistry.getMissions()
      );

      return;
    }

// GET MISSION BY ID

if (
  req.method === "GET" &&
  req.url.startsWith("/api/missions/")
) {

  const missionId =
    req.url.split("/").pop();

  const mission =
    missionRegistry.getMissionById(
      missionId
    );

  if (!mission) {

    sendJSON(res, 404, {
      error: "Mission not found",
      missionId: missionId
    });

    return;
  }

  sendJSON(res, 200, mission);

  return;
}
    // API INFORMATION

    if (
      req.method === "GET" &&
      req.url === "/api"
    ) {

      sendJSON(res, 200, {

        name:
          "2060 Mission Control API",

        version:
          "1.4.0",

        status:
          "ONLINE",

        endpoints: [
          "/api/health",
          "/api/mission",
          "/api/telemetry",
          "/api/missions"
        ]

      });

      return;
    }


    // NOT FOUND

    sendJSON(res, 404, {

      error:
        "Endpoint not found",

      path:
        req.url

    });

  });


const PORT =
  process.env.PORT || 3000;


server.listen(
  PORT,
  () => {

    console.log(
      `2060 Mission Control API running on port ${PORT}`
    );

  }
);
