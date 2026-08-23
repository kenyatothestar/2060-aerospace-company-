const missions = new Map();

const missionStore = {
  get(id) {
    return id ? missions.get(id) || null : [...missions.values()];
  },

  create(mission) {
    const id = mission.id || `MISSION-${Date.now()}`;

    const data = {
      ...mission,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    missions.set(id, data);
    return data;
  },

  save(mission) {
    missions.set(mission.id, {
      ...mission,
      updatedAt: new Date().toISOString()
    });

    return missions.get(mission.id);
  },

  update(id, changes) {
    const existing = missions.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...changes,
      id,
      updatedAt: new Date().toISOString()
    };

    missions.set(id, updated);
    return updated;
  }
};

module.exports = missionStore;
