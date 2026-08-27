# 2060 Mission Control — Deployment

## Backend
- Node.js server
- Default local port: 4000
- Production port is supplied through the `PORT` environment variable.

## Frontend
- Static files are in `frontend/`
- The frontend can be served by a static hosting service.

## Environment
Use:
- `NODE_ENV=production`
- `PORT=4000`

Never commit real passwords, API keys, tokens, or `.env` files.

## Important
The current mission telemetry is simulated prototype data.
Do not represent it as live spacecraft telemetry until connected to validated real systems.
