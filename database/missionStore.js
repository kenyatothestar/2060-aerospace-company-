// 2060 Mission Control
// Mission Store V1.0

const mission = require("./mission");

function getMission() {
  return mission;
}

function getTelemetry() {
  return {
    missionId: mission.missionId,
    vehicleId: mission.vehicleId,
    timestamp: new Date().toISOString(),
    ...mission.telemetry
  };
}

module.exports = {
  getMission,
  getTelemetry
};
