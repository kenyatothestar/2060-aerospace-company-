// 2060 Mission Control
// Backend API V1.1

const http = require("http");

const mission =
  require("../database/mission");


function sendJSON(res, statusCode, data) {

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  });

  res.end(
    JSON.stringify(data)
  );
}


const server =
  http.createServer(
    (req, res) => {

      if (req.url === "/api/health") {

        sendJSON(res, 200, {
          system: "2060 Mission Control",
          status: "ONLINE",
          version: "1.0"
        });

        return;
      }


      if (req.url === "/api/mission") {

        sendJSON(res, 200, mission);

        return;
      }


      if (req.url === "/api/telemetry") {

        sendJSON(
          res,
          200,
          mission.telemetry
        );

        return;
      }


      sendJSON(
        res,
        404,
        {
          error: "Endpoint not found"
        }
      );

    }
  );


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
