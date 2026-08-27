# 2060 Aerospace Systems — Security Baseline

## Source Code

- Keep secrets out of Git.
- Use environment variables for secrets.
- Review dependencies regularly.
- Keep production and development credentials separate.

## API

- Validate incoming data.
- Authenticate protected endpoints.
- Authorize users by role.
- Rate-limit public endpoints where appropriate.
- Log security-relevant events.

## Database

- Use least-privilege database credentials.
- Back up production data.
- Encrypt sensitive data where appropriate.
- Never expose database credentials publicly.

## Deployment

- Use HTTPS.
- Keep dependencies updated.
- Restrict production access.
- Monitor application errors.
- Maintain a rollback procedure.

## Aerospace Safety

The current Mission Control platform is a software prototype.
It must not be connected to real spacecraft systems without
appropriate engineering, cybersecurity, safety validation and
regulatory review.
