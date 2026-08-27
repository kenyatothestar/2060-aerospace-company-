const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 4000;

let missions = [
  {
    id: "MC-001",
    name: "Mission Alpha",
    vehicleId: "2060-X1",
    launchSite: "KENYA",
    status: "READY"
  }
];

let telemetry = {
  altitude: 0,
  velocity: 0,
  fuel: 100,
  status: "READY"
};

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  res.end(JSON.stringify(data));
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*"
  });

  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function createMission(data) {
  const number = missions.length + 1;

  const mission = {
    id: `MC-${String(number).padStart(3, "0")}`,
    name: data.name || "Mission Alpha",
    vehicleId: data.vehicleId || "2060-X1",
    launchSite: data.launchSite || "KENYA",
    status: "READY"
  };

  missions.push(mission);

  return mission;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });

    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/") {
    sendText(
      res,
      200,
      "2060 Mission Control API is online"
    );
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    sendJSON(res, 200, {
      status: "ONLINE",
      service: "2060 Mission Control API",
      version: "1.0.0"
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/status") {
    sendJSON(res, 200, {
      system: "ONLINE",
      missionControl: "ONLINE",
      vehicle: "2060-X1",
      missionStatus: telemetry.status
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/telemetry") {
    sendJSON(res, 200, telemetry);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/missions") {
    sendJSON(res, 200, {
      count: missions.length,
      missions
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/missions") {
    try {
      const data = await readBody(req);
      const mission = createMission(data);

      sendJSON(res, 201, {
        success: true,
        mission
      });
    } catch (error) {
      sendJSON(res, 400, {
        success: false,
        error: "Invalid JSON"
      });
    }

    return;
  }

  if (req.method === "POST" && url.pathname === "/api/launch") {
    telemetry.status = "IN FLIGHT";

    sendJSON(res, 200, {
      success: true,
      status: telemetry.status
    });

    return;
  }

  if (req.method === "POST" && url.pathname === "/api/abort") {
    telemetry.status = "ABORTED";

    sendJSON(res, 200, {
      success: true,
      status: telemetry.status
    });

    return;
  }

  if (req.method === "POST" && url.pathname === "/api/reset") {
    telemetry = {
      altitude: 0,
      velocity: 0,
      fuel: 100,
      status: "READY"
    };

    sendJSON(res, 200, {
      success: true,
      telemetry
    });

    return;
  }

  sendJSON(res, 404, {
    error: "Endpoint not found"
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `2060 Mission Control API running on port ${PORT}`
  );
});
