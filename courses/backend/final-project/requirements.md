# Backend Requirements

This document describes all requirements that you _must_ complete as part of finishing your project. You are strongly encouraged to implement your own ideas to showcase the range of your technical abilities - now is the time to push yourself! Don't forget to implement the requirements below, first, though.

## Product Requirements

Users must be able to:

- [ ] Browse or query the main resource(s) of your API (e.g. list, search, filter, paginate)
- [ ] View detailed information about a specific resource
- [ ] Create an account and log in
- [ ] Perform authenticated actions (e.g. create, update, or delete resources they own)
- [ ] Receive meaningful error messages when something goes wrong (e.g. validation errors, unauthorized access, missing resources)
- [ ] Integrate with at least 1 third-party service or API (e.g. email delivery, file storage, payment simulation, geolocation, weather data)

## Technical Requirements

- [ ] Database
  - [ ] Use PostgreSQL as the database
  - [ ] Design and document your schema with an Entity-Relationship Diagram (ERD)
  - [ ] All database queries must use parameterised queries or a query builder (no SQL injection vulnerabilities)

- [ ] API design
  - [ ] RESTful API design following consistent resource naming and HTTP method conventions
  - [ ] API routes documented with Swagger / OpenAPI
  - [ ] Appropriate use of HTTP status codes (e.g. 201 for created, 404 for not found, 401/403 for auth errors)

- [ ] Authentication and authorisation
  - [ ] User registration with securely hashed passwords (e.g. bcrypt)
  - [ ] Login flow that returns a token or establishes a session
  - [ ] Protected routes that require authentication
  - [ ] Basic authorisation (e.g. users can only modify their own resources)

- [ ] Security and error handling
  - [ ] Input validation on incoming requests (e.g. required fields, correct types)
  - [ ] Centralised error handling middleware
  - [ ] No sensitive data (passwords, tokens) exposed in API responses

- [ ] External service integration
  - [ ] Securely integrate with a third-party service or API (e.g. without exposing secrets)

## Organisational Requirements

- [ ] Work as a team of 4-5 trainees to complete the project together
- [ ] Assign clear roles and/or areas of ownership between each team member
- [ ] Use Trello to organise your project tasks and visualise your progress
- [ ] Define all of your tasks clearly using Trello cards
- [ ] Organise your team using weekly sprints
- [ ] Run weekly planning sessions to decide on the next tasks and priority order for the sprint
- [ ] Submit small pull request(s) for each task, ready to be reviewed by other team members before merging

## Deliverables

To submit your finished project, you will need:

- [ ] A deployed and working API accessible via a public URL
- [ ] Deployed and viewable API docs describing all of your functionality
- [ ] A PostMan collection and test script(s) to demo your API
- [ ] Code versioned using git along with meaningful commit messages
- [ ] Code pushed to a public GitHub repo on your profile
- [ ] A README in the root of your repo including:
  - [ ] A project description
  - [ ] How to run it locally
  - [ ] A link to your deployed API, docs and PostMan deliverables
  - [ ] Key technical summary & decisions
  - [ ] Known limitations & future improvements

## Optional Ideas

These are not required, and you must complete all other requirements and deliverables first to pass this project. Then you are welcome to implement these ideas or use them for inspiration to improve your project and develop your skills further.

- [ ] Build a simple frontend (e.g. with React) that consumes your API
- [ ] Add role-based access control (e.g. admin vs regular user)
- [ ] Implement rate limiting on your API
- [ ] Add automated tests (e.g. integration tests for key endpoints)
- [ ] Set up a CI pipeline (e.g. GitHub Actions) to run your tests and linting on each PR
- [ ] Add pagination, sorting, and filtering across all list endpoints
- [ ] Implement real-time features using WebSockets (e.g. notifications, live updates)
