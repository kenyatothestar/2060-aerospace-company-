// 2060 Mission Control
// Frontend API Connector V1.0

async function getSystemHealth(apiUrl) {
  const response = await fetch(
    apiUrl + "/api/health"
  );

  if (!response.ok) {
    throw new Error("API health request failed");
  }

  return response.json();
}


async function getTelemetry(apiUrl) {
  const response = await fetch(
    apiUrl + "/api/telemetry"
  );

  if (!response.ok) {
    throw new Error("Telemetry request failed");
  }

  return response.json();
}
