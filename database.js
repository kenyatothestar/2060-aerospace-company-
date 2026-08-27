const missions = [];

function createMission(data) {
  const mission = {
    id: "MC-" + String(missions.length + 1).padStart(3, "0"),
    name: data.name || "2060-ALPHA",
    status: "ACTIVE",
    altitude: 384243,
    velocity: 27.4,
    fuel: 82.6,
    progress: 68,
    createdAt: new Date().toISOString()
  };

  missions.push(mission);
  return mission;
}

function getMissions() {
  return missions;
}

function getMission(id) {
  return missions.find(m => m.id === id);
}

module.exports = {
  createMission,
  getMissions,
  getMission
};
