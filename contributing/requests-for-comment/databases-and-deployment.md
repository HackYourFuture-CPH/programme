# RFC: Databases and Deployment

## Summary

So far, for "database" we have used / talked about using MySQL / MariaDB, PostgreSQL, and SQLite. This creates uncertainty.

In at least some cases, it seems like we haven't covered deployment at all during the course, but then we suddenly expect the trainees to deploy their projects. This creates confusion.

To address this, we should create and document a coherent plan for how we will handle databases, and how we will get projects deployed.

## Detail

In particular,

- What specific hosting / deployment provider will we be using?
- What database is appropriate for that provider?
  - It's no use us covering MySQL, if the hosting provider doesn't provide MySQL
  - ditto PostgreSQL
  - If we use SQLite, will the database be lost at every deployment?
