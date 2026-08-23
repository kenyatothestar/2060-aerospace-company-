// 2060 Mission Control
// Mission Registry V1.0

const missions = [];

function createMission(data) {
  const mission = {
    missionId: `MC-${String(missions.length + 1).padStart(3, "0")}`,
    vehicleId: data.vehicleId || "2060-X1",
    missionName: data.missionName || "Unnamed Mission",
    status: "PLANNED",
    launchSite: data.launchSite || "KENYA",
    createdAt: new Date().toISOString()
  };

  missions.push(mission);

  return mission;
}

function getMissions() {
  return missions;
}

function getMissionById(missionId) {
  return missions.find(
    mission => mission.missionId === missionId
  );
}

module.exports = {
  createMission,
  getMissions,
  getMissionById
};
