// 2060 Mission Control
// Frontend API Connector V1.1

async function getSystemHealth(apiUrl) {

  const response =
    await fetch(
      apiUrl + "/api/health"
    );

  if (!response.ok) {
    throw new Error(
      "API health request failed"
    );
  }

  return response.json();
}


async function getTelemetry(apiUrl) {

  const response =
    await fetch(
      apiUrl + "/api/telemetry"
    );

  if (!response.ok) {
    throw new Error(
      "Telemetry request failed"
    );
  }

  return response.json();
}


async function getMissions(apiUrl) {

  const response =
    await fetch(
      apiUrl + "/api/missions"
    );

  if (!response.ok) {
    throw new Error(
      "Mission list request failed"
    );
  }

  return response.json();
}


async function getMission(
  apiUrl,
  missionId
) {

  const response =
    await fetch(
      apiUrl +
      "/api/missions/" +
      missionId
    );

  if (!response.ok) {
    throw new Error(
      "Mission request failed"
    );
  }

  return response.json();
}


async function createMission(
  apiUrl,
  missionData
) {

  const response =
    await fetch(
      apiUrl + "/api/missions",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(
            missionData
          )
      }
    );

  if (!response.ok) {
    throw new Error(
      "Mission creation failed"
    );
  }

  return response.json();
}
