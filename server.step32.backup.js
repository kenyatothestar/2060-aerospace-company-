const db = require('./database');
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let missions = [
  {
    id: "MC-001",
    name: "2060 Deep Space Mission",
    status: "ACTIVE",
    altitude: 384220,
    speed: 27.4,
    fuel: 82.6
  }
];

app.get("/", (req, res) => {
  res.json({
    service: "2060 Mission Control API",
    status: "ONLINE",
    version: "4.0.0"
  });
});

app.get("/api/missions", (req, res) => {
  res.json(missions);
});

app.get("/api/mission/:id", (req, res) => {
  const mission = missions.find(m => m.id === req.params.id);

  if (!mission) {
    return res.status(404).json({ error: "Mission not found" });
  }

  res.json(mission);
});

app.post("/api/missions", (req, res) => {
  const mission = {
    id: `MC-${String(missions.length + 1).padStart(3, "0")}`,
    name: req.body.name || "2060 Mission",
    status: "READY",
    altitude: 0,
    speed: 0,
    fuel: 100
  };

  missions.push(mission);
  res.status(201).json(mission);
});

app.get("/api/telemetry", (req, res) => {
  const mission = missions[0];

  res.json({
    missionId: mission.id,
    altitude: mission.altitude,
    speed: mission.speed,
    fuel: mission.fuel,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`2060 Mission Control API running on port ${PORT}`);
});
