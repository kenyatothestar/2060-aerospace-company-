// Database model - temporary development layer// 2060 Mission Control
// Mission Data Model V1.0

const mission = {
  missionId: "MC-001",
  missionName: "Mission 001",
  vehicleId: "2060-X1",

  status: "READY",

  launchSite: "KENYA",

  createdAt: new Date().toISOString(),

  telemetry: {
    altitudeKm: 0,
    speedKmh: 0,
    fuelPercent: 100,
    temperatureC: 20,
    signal: "NOMINAL"
  }
};

module.exports = mission;
