# Assignment

## 1. Node tasks

In this assignment you will continue working with the **Snippets API**. Your focus is to design and harden a small set of endpoints by:

- Demonstrating and fixing a SQL injection vulnerability.
- Extending the REST surface in a thoughtful way.
- Applying consistent error handling and validation.
- Describing your API with OpenAPI/Swagger.
- Exercising it with advanced Postman collections and tests.

### Setup

1. Go to/create a `node/week2` directory in your `hyf-assignment` repo.
2. Reuse your Snippets backend from Week 1 (or create a fresh copy of it).
3. Make sure you have:
   - A `users` and `snippets` table (you can reuse the schema from Week 1).
   - An Express app with a `snippets` router under `/api/snippets`.
   - A working Knex instance connected to your database.
4. Add a new endpoint to your `snippets` router, modelled on this **intentionally unsafe** example:

```js
snippetsRouter.get("/", async (req, res) => {
  let query = knexInstance.select("*").from("snippets");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable!
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

> You may adapt table/column names to match your own schema, but keep the overall pattern.

### Part A – Demonstrate and fix SQL injection

The current implementation of the `sort` query parameter is vulnerable to SQL injection.

1. **Demonstrate the problem**:
   - Find one or more `sort` values that produce suspicious or broken SQL.
   - Capture the generated SQL from the server logs.
   - Record a short screen capture, showing:
     - The request(s) you make.
     - The problematic SQL printed on the server.
2. **Fix the vulnerability**:
   - Introduce validation for `req.query.sort`, for example:
     - Only allow a small whitelist of sortable columns (e.g. `created_at`, `title`).
     - Only allow `ASC` or `DESC` as sort directions.
   - Replace `orderByRaw(orderBy)` with a safe combination using Knex Query Builder, such as:
     - `query = query.orderBy(column, direction);`
   - Ensure your fix does **not** rely on turning off features globally; it should be solved in your application code.

Update your logs to show the safe SQL after your fix, and include a short explanation in your PR describing your approach.

### Part B – Extend the Snippets API

Design and implement at least **two new endpoints** for the Snippets API. Some ideas:

- A search or filter endpoint, e.g. `GET /api/snippets?tag=javascript`.
- A “public feed” endpoint that only returns non-private snippets.
- Alternatively add here endpoints related to `user` created during the session or write the ones you didn't finish.

For each new endpoint:

1. Choose a RESTful URL and HTTP method.
2. Implement the route using Knex Query Builder (no `raw` SQL needed).
3. Use appropriate status codes (e.g. `200`, `201`, `400`, `404`, `500`).
4. Return consistent JSON data and error shapes, following the error-handling rules from Week 1.

### Part C – Error handling and validation

Update your existing and new endpoints with robust error handling and validation. At minimum:

1. Validate incoming data:
   - Required fields (e.g. `title`, `contents`) must be present and non-empty.
   - Path parameters like `:id` should be numbers.
2. Handle the following cases explicitly:
   - Successful requests.
   - Incorrect requests (e.g. invalid `sort` value, missing required fields).
   - Server issues (e.g. a missing table, DB connection problems).
   - A catch-all for any unexpected errors.
3. Use appropriate HTTP status codes (`400`, `404`, `500`, etc.).
4. Avoid sending internal details (SQL statements, stack traces) to the client.
5. Log enough information on the server to debug issues (errors and relevant context).

### Part D – Document your API with OpenAPI/Swagger

Create a minimal OpenAPI description for the core Snippets endpoints you now have. You can:

- Use a YAML or JSON file (for example `openapi.yml` in your Week 2 directory).
- Use the examples from the course materials as a starting point.

For each, include:

- Path and method.
- Parameters (path/query).
- Request body schema (where applicable).
- Response status codes and schemas, including error responses that match your implementation.

Include this file in your PR.

### Part E – Advanced Postman collection and tests

Use Postman to capture and test your API:

1. **Collections and environments**
   - Create a collection for your Snippets API.
   - Add requests for all endpoints you implemented in this assignment.
   - Create at least one environment with a `base_url` variable (e.g. `http://localhost:3000`), and use it in your requests.
2. **Secrets**
   - If you use any tokens or secrets in your requests, store them securely using the Postman Vault or sensitive variables.
3. **Tests**
   - For at least two requests, add tests under the **Tests** tab, checking:
     - The HTTP status code (e.g. `200`, `201`, `400`, `404`).
     - At least one field in the JSON response.
   - Optionally, add a test that verifies your error responses match the agreed error format.
4. **Share evidence**
   - Export the collection (and environment if used) and attach it to your PR, **or** share a link to the collection if you use Postman Cloud.
   - Include a screenshot or link to a collection run showing your tests passing.

### Week 2 assignment objective

After finish all the tasks, make sure (and fill in the gaps where needed) that your **entire Snippets API** is:

1. Up and running
2. Viewable in Swagger
3. Callable in Postman
4. Validated where applicable

## 2. Events Startup Project

Continue progress on the [Events Startup Project](/courses/backend/events-startup-project/README.md). Check the [Weekly Plan](/courses/backend/events-startup-project/weekly-plan.md) for specific tasks to complete this week.
