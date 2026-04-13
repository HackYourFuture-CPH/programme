# Assignment

## 1. Node tasks

As usual, create a PR in your HYF assignments repository.

In the repository, create a `nodejs-week1` branch from `main` to work on the assignment (`git checkout -b nodejs-week1` )

### Setup

Go to `nodejs/week1` in your `hyf-assignment` repo:

```shell
npm init -y
npm pkg set type="module"
npm i express
npm pkg set scripts.dev="node --watch app.js"
```

You should ensure that the `node_modules/` folder is ignored by Git:

```shell
echo node_modules/ >> .gitignore
```

Create `app.js` and as a starting point you can use the following code:

```js
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

### Part A: Add more snippets and tags

You will continue working with the schema used in the session. This week you will build more endpoints, developing some [CRUD operations](https://www.freecodecamp.org/news/crud-operations-explained/) to be able to add more data via your backend.

#### Excercise goal

We have users and users post snippets. We need to be able to post those snippets to the database and also edit or delete the snippets via backend endpoints.

We also need some categorisation mechanics. Let's add a **tags** table, that will store tags available to be added to our snippets, so it is easier to search them. Each snippet can have many tags and each tag can belong to many snippets.

_Note: you need to modify the snippets column in the database on top of adding new tables to achieve this._

#### Routes

For this week's assignment, we will have two categories of routes: snippets and tags.

- The routes for snippets will go into `/api/src/routers/snippets.js`
- The tags routes will live in `/api/src/routers/tags.js`

This means that we will end up having two Routers: a snippets and tags router.
You can [read more about Express Routers](https://expressjs.com/en/guide/routing.html).

##### Snippets

| Route               | HTTP method | Description                        |
| ------------------- | ----------- | ---------------------------------- |
| `/api/snippets`     | GET         | Returns all snippets               |
| `/api/snippets`     | POST        | Adds a new snippet to the database |
| `/api/snippets/:id` | GET         | Returns the snippet by `id`        |
| `/api/snippets/:id` | PUT         | Updates the snippet by `id`        |
| `/api/snippets/:id` | DELETE      | Deletes the snippet by `id`        |

##### Tags

Now that you have built the basic set of endpoints for **snippets**, you can get some more practice and expand your app backend by creating the same for **tags**:

| Route           | HTTP method | Description                    |
| --------------- | ----------- | ------------------------------ |
| `/api/tags`     | GET         | Returns all tags               |
| `/api/tags`     | POST        | Adds a new tag to the database |
| `/api/tags/:id` | GET         | Returns a tag by `id`          |
| `/api/tags/:id` | PUT         | Updates the tag by `id`        |
| `/api/tags/:id` | DELETE      | Deletes the tag by `id`        |

##### Requests

All the `POST` or `PUT` endpoints will require a request body - the information that your database will be updated with.

##### Responses

All the specified `GET` routes should respond with JSON with the available columns from the associated tables.

The `GET`, `PUT` and `DELETE` routes that include an `/:id` in the path should make sure to handle the case when the row with that ID does not exist.

> Think about what special HTTP status code would be appropriate for that scenario.

When designing your responses, make sure to:

- Use appropriate HTTP status codes:
  - `200` for successful reads and updates.
  - `201` when a new resource is created.
  - `400` when the client sends invalid data (missing required fields, wrong types, impossible values).
  - `404` when a snippet or tag with the given `id` does not exist.
  - `500` for unexpected server-side problems.
- Return a consistent JSON error structure, for example:

```json
{ "error": "Snippet not found" }
```

Use the same shape for your other error responses so clients know what to expect.

You are free to decide on the response for a successful `POST`, `PUT` and `DELETE` request. Some ideas:

- Respond with an acknowledgement message: `{ "message": "Deleted snippet" }`
- Respond with data from the row itself like with `GET`

And lastly, if the `POST` request is successful, the response status code should be 201 Created, as that would indicate something was _created_.

##### Knex

Your usage of Knex should be getting a bit more advanced now. You will move from `knex.raw` on to different `knex` function, for example:

- `.select`, `.from`, `.where`
- `.insert`
- `.update`
- `.del` (for deletion)

Check out the [Knex cheatsheet](https://devhints.io/knex)!

As you work with these routes, test them using Postman:

- Create a basic Postman collection for your service.
- Add a request for each `snippets` and `tags` endpoint you implement (for all HTTP methods you use).
- Use these requests to verify both successful responses and the different error cases you implemented.

When you submit your PR, include either a Postman collection link or an exported collection file so mentors can see how you tested your API.

### Part B: search engine

For the excercise you're going to build a search engine. The search engine will have 3 routes:

- `GET /search`
- `GET /snippets/:id`
- `POST /search`

#### `GET /search`

This endpoint will accept a query parameter called `q`, short for _query_. A bit confusing to have a query parameter called q(uery) but hang in there 💪

- If `q` is not provided, the endpoint should return all documents.
- If `q` is provided, the endpoint should return the documents with some field that matches the value of `q`.

Example response if we call `GET /search?q=react`:

```json
[
  {
    "id": 2,
    "title": "React Hooks",
    "contents": "Explaining useState and useEffect with examples."
  }
]
```

#### `GET /snippets/:id`

This endpoint is simple: find and respond with the snippet matching the `id` parameter. If there is no such snippet, respond with a 404 Not Found.
You can assume that the snippet IDs are unique so there's no need to handle duplicates.

#### `POST /search`

This endpoint is sort of like `GET /search`.

It also accepts a query parameter called `q` and it should behave just like `GET /search`.
But it also accepts a field called `fields` in the JSON request body. `fields` is an object where it will be possible to filter by specific fields.

Example request:

```text
POST /search
{
    "fields": {
        "tags": "React"
    }
}
```

Response to the example request:

```json
[
  {
    "id": 1,
    "title": "React Hooks",
    "contents": "Explaining useState and useEffect with examples.",
    "tags": ["React"]
  }
]
```

If both `q` (query parameter) and `fields` (in body) are provided, we should respond with status 400 Bad Request and explain that both can't be provided.

## 2. Events Startup Project

Continue progress on the [Events Startup Project](/courses/backend/events-startup-project/README.md). Check the [Weekly Plan](/courses/backend/events-startup-project/weekly-plan.md) for specific tasks to complete this week.
