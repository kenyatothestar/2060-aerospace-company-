const missions = [];

module.exports = {
  missions,

  createMission(mission) {
    const record = {
      id: mission.id || `MC-${String(missions.length + 1).padStart(3, '0')}`,
      name: mission.name || '2060 Mission',
      status: mission.status || 'READY',
      altitude: mission.altitude ?? 0,
      speed: mission.speed ?? 0,
      fuel: mission.fuel ?? 100,
      createdAt: new Date().toISOString()
    };

    missions.push(record);
    return record;
  },

  getMissions() {
    return missions;
  }
};
