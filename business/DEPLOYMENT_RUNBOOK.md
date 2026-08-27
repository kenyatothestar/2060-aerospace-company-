# 2060 Mission Control — Deployment Runbook

## Before deployment

1. Confirm the correct Git branch.
2. Confirm the latest changes are committed.
3. Run application syntax checks.
4. Run available automated tests.
5. Verify environment variables are configured securely.
6. Confirm database configuration.
7. Confirm backups and rollback procedures.

## Deployment

1. Push the approved release to the production repository.
2. Deploy using the configured hosting platform.
3. Monitor deployment logs.
4. Confirm the application starts.
5. Confirm the frontend loads.
6. Confirm the API responds.
7. Verify the health/status endpoint where available.

## After deployment

- Test the public website.
- Test authentication.
- Test important API routes.
- Review logs.
- Monitor errors.
- Record the deployment version.

## Rollback

If a deployment causes a serious problem:

1. Stop further changes.
2. Identify the last known working release.
3. Roll back using the hosting platform.
4. Verify service recovery.
5. Document the incident.

## Important

Do not connect this prototype to real spacecraft systems.
Production aerospace use requires appropriate engineering,
cybersecurity, safety and regulatory validation.
