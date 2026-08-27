# 2060 Release Management

## Release stages

Development → Testing → Staging → Production

## Every release must include

- Version number
- Release date
- Changes made
- Known issues
- Testing performed
- Rollback plan

## Release process

1. Create the change.
2. Test locally.
3. Commit to Git.
4. Review the change.
5. Test the release.
6. Deploy to staging when available.
7. Verify staging.
8. Approve production release.
9. Deploy.
10. Verify production.

## Emergency release

Critical security or availability fixes may follow an expedited
process, but must still be tested and documented.
