# Assignment

## 1. Node tasks

In this assignment, you will extend the **Snippets API** to support multiple authentication mechanisms and reflect on their trade-offs.

You will:

- Solidify the secure password and login flow you implemented in class.
- Add database-stored tokens on top of the existing login logic.
- Deepen either your JWT or session-based authentication (or both, if you have time).
- Add a simple API-key-protected machine-style endpoint.

### Setup

1. Go to/create a `node/week3` directory in your `hyf-assignment` repo.
2. Copy or link your existing Snippets API code from week 2, so that you have:
   - A working database connection and Knex setup.
   - Existing snippets-related endpoints under `/api/snippets`.
3. Make sure your database contains the required tables for the Snippets API and that you can run it locally without errors.
4. Ensure you have environment variables (or config values) for:
   - `JWT_SECRET`
   - `SESSION_SECRET`
   - `API_KEY` (for the machine-style endpoint).

> If you are missing any of these pieces, revisit the week 3 session materials and implement the in-class steps first before moving on.

### Part A – Solidify in-class implementation

Start from the state of your Snippets API at the end of the week 3 session.

Your goals:

- Make sure the secure `/login` endpoint using bcrypt is correctly implemented.
- Make sure at least one auth mechanism (JWT or sessions) from the session is working reliably.

#### Requirements

- Verify that:
  - `users` table exists and contains at least one user with a hashed password.
  - `/login`:
    - Looks up the user by email.
    - Uses `bcrypt.compare` to check the password.
    - Returns appropriate HTTP status codes on success (`200`) and failure (`401`).
  - If using **JWT**:
    - The login route issues a JWT signed with `JWT_SECRET`.
    - A middleware verifies the token and attaches user info to `req.user`.
  - If using **sessions**:
    - Session middleware is configured with `SESSION_SECRET`.
    - Login sets `req.session.userId`.
    - A middleware checks for `req.session.userId` and rejects unauthenticated requests.
- Add or update error handling so that:
  - You do not leak sensitive details in responses.
  - You log enough server-side information to debug issues.

Document briefly (e.g. in comments or a short `AUTH_NOTES.md`) which auth mechanism you have working at this stage.

### Part B – Database-stored tokens

Next, add **database-stored tokens** to your Snippets API, in addition to your existing mechanism.

#### Requirements for database stored tokens excercise

1. Create a `tokens` table with at least:
   - `id` (primary key)
   - `user_id` (foreign key to `users.id`)
   - `token` (unique string)
   - `created_at` (timestamp)
   - `expires_at` (timestamp, optional)
2. Implement a `/login-token` route that:
   - Reuses your secure username/password check.
   - Generates a random token (for example using `crypto.randomBytes`).
   - Stores the token and user ID in the `tokens` table.
   - Returns the token to the client in JSON.
3. Implement `authToken` middleware that:
   - Reads the `Authorization` header (`Bearer <token>`).
   - Looks up the token in the `tokens` table.
   - (Optionally) checks `expires_at`.
   - Attaches the user to `req.user` or returns `401` on failure.
4. Protect at least **two existing Snippets API endpoints** using `authToken`, for example:
   - `POST /api/snippets`
   - `DELETE /api/snippets/:id`
5. Implement a `/logout-token` route that:
   - Deletes or invalidates the token record from the `tokens` table.

### Part C – Authorisation using JWT

Read thoroughly the following article on [implementing authorisation using JWT and Express](https://dev.to/cerbos/authentication-and-authorization-in-nodejs-applications-12fk) or find other resources online.

Extend your implementation by:

- Improving error handling (e.g. distinguish between missing, invalid, and expired tokens in a safe way).
- Adding role-based checks in middleware:
  - all users can see snippets
  - all logged in users can post snippets
  - **some** logged in users can delete snippets

#### Requirements for JWT authorisation excercise

- Clearly document (in code comments or `AUTH_NOTES.md`) how to:
  - Obtain credentials and log in.
  - Use the improved mechanism (which headers/cookies are expected).
  - Log out or otherwise invalidate access.

### Part D – Optional: API-key-protected machine endpoint

Finally, add a simple **API-key-protected endpoint** intended for machine-to-machine use.

#### Requirements for API-key excercise

1. Choose or create a route that makes sense for a machine client, for example:
   - `GET /api/metrics`
   - `GET /api/health`
   - `GET /api/snippets/export`
2. Introduce an environment variable such as `API_KEY`.
3. Implement middleware (e.g. `requireApiKey`) that:
   - Reads the `x-api-key` header.
   - Compares it with `API_KEY`.
   - Returns `401` on missing/incorrect keys.
4. Protect your machine-style route with this middleware.

### Optional stretch: basic rate limiting

If you have time, add a very simple in-memory rate-limiting mechanism (for example, per API key) and document the limitations of such an approach.

### Reflection

Add a short reflection section to your repository (for example in `AUTH_NOTES.md`) where you answer the following questions in a few sentences or bullet points each:

1. Which auth mechanism would you choose for:
   - A SPA web app with many users?
   - A microservice-to-microservice communication scenario?
   - An internal admin tool used by a small team?
2. Why would you **not** use the other mechanisms in those scenarios?
3. What is one security improvement you would like to make next if you had more time?

## 2. Events Startup Project

Continue progress on the [Events Startup Project](/courses/backend/events-startup-project/README.md). Check the [Weekly Plan](/courses/backend/events-startup-project/weekly-plan.md) for specific tasks to complete this week.
