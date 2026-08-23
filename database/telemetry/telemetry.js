// 2060 Mission Control
// Real Telemetry Service - V1.0

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

function getTelemetry() {
  return {
    ...telemetry,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  getTelemetry
};
