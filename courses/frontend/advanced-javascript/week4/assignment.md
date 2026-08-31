# Assignment

For this week's assignment we will create a web application that generates a screenshot of a website based on a URL. We will combine two APIs: one to generate the screenshot and one to allow the user to save the screenshot.

We use [Rapid API](https://rapidapi.com/apishub/api/website-screenshot6/?utm_source=RapidAPI.com%2Fguides&utm_medium=DevRel&utm_campaign=DevRel) to generate a screenshot and the [crudcrud API](https://crudcrud.com/) to save the screenshot.

![Application mockup](./session-materials/assignment-mockup.svg)

## Technical specifications

1. User can enter a URL for a website and it will send back a screenshot of the website using the website-screenshot API
2. User can hit a button to save the screenshot. It will then save the screenshot and the URL as a resource on crudcrud
3. User can get a list of all screenshots that they have saved
4. User can delete a screenshot that they have saved

### Class requirements

1. **Model your UI as classes** with a `render()` method that puts content on the page.
2. **Build an error system** with custom error classes that `extend Error`, each with a way to show a user-friendly message (e.g. `toUserMessage()`).
3. **Handle errors** with `try/catch` and use `instanceof` to treat different error types differently.

Look at your interface and think about what parts can be modeled as classes — if something has data and behavior that go together, or if it can be reused, make it a class. For example, you could create a `Screenshot` class that holds the URL and image data, knows how to render itself as a card on the page, and has a method for deleting itself from crudcrud.

For the error system, think about what kinds of errors can happen in your app — what if the user submits an empty URL? What if the API returns a bad response? What if the network is down? You might end up with classes like `ValidationError`, `ApiError`, or something else entirely — it's up to you.

---

## API Guides

### The Screenshot API (Rapid API)

Sign up at [RapidAPI](https://rapidapi.com) and subscribe to the **website-screenshot6** API (free tier is enough). You will get an API key.

|                  |                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Method**       | `GET`                                                                                  |
| **URL**          | `https://website-screenshot6.p.rapidapi.com/screenshot`                                |
| **Query params** | `url` (URL-encoded), `width`, `height`                                                 |
| **Headers**      | `x-rapidapi-host: website-screenshot6.p.rapidapi.com` · `x-rapidapi-key: YOUR_API_KEY` |
| **Response**     | JSON — `{ screenshotUrl: "https://..." }` — use the value directly as an `<img src>`   |

> **Keep your API key out of git.** Put it in a `secret.js` file and add that file to `.gitignore`.

---

### The crudcrud API

[crudcrud.com](https://crudcrud.com/) gives you a free, temporary REST API endpoint for storing JSON data. Go to the site and you will get a unique ID — your endpoint will look like:

```text
https://crudcrud.com/api/YOUR_UNIQUE_ID
```

You can create any resource name you like after it, for example `/screenshots`. For this app you need three operations:

| What you want to do       | Method   | URL                   | Body / Notes                           |
| ------------------------- | -------- | --------------------- | -------------------------------------- |
| Get all saved screenshots | `GET`    | `.../screenshots`     | —                                      |
| Save a new screenshot     | `POST`   | `.../screenshots`     | JSON with the fields you want to store |
| Delete one screenshot     | `DELETE` | `.../screenshots/:id` | —                                      |

crudcrud automatically assigns an `_id` field to each item you POST. You will need that `_id` to delete items later. POST requests must include `Content-Type: application/json` in the headers.

> **Note:** crudcrud endpoints expire after a few days on the free plan. If your app suddenly stops working, go to crudcrud.com and get a new unique ID. Keep your unique ID in `secret.js` alongside your API key.

---

## Using `render()` — when and how

The `render()` method is how a class puts itself on the page. The idea: **the class owns its own DOM element**. Call `render()` to create or update that element, then append the returned element somewhere in the DOM.

Use this base class as a starting point — every UI class in your app should extend it:

```js
class UIComponent {
  constructor() {
    this.element = null;
  }

  render() {
    throw new Error("render() must be implemented by subclass");
  }
}
```

A `Screenshot` class is a natural fit here — think about what data it needs, what its card looks like, and what it can do (hint: deleting itself is a good method).

**When to call `render()`:**

- Right after creating a new instance — to show it on screen
- After data on the instance changes and the DOM should reflect it

---

## Error handling — when and how

Not all errors are the same. A user typing nothing in the input is different from the API being down. Custom error classes let you handle each case differently.

Think about what kinds of errors can happen in your app — validation failures, API problems, network issues. Each could be its own class that `extends Error`, with a method that returns a user-friendly message. Then use `try/catch` with `instanceof` to handle each type differently.

**Where to use error handling in this app:**

- When the user submits the form: validate that the URL field is not empty
- When calling the screenshot API: catch network failures or non-2xx responses
- When calling crudcrud (save, load, delete): catch failures and tell the user

---

## Optional Tasks/Assignments

> **Note:** Users do not need to be stored in a database or API — just keep them in memory (e.g. an array of instances in your JavaScript). No need to persist them anywhere.

1. Create a user object with an email and password. Keep it in a variable or array.
2. Show a login form first.
3. If the email and password match the user you created, show the application. Otherwise show an error message.
4. Create another user. When saving a screenshot, also save the user email (or another unique identifier).
5. Make sure you only show screenshots that the logged-in user has uploaded.

---

> Keep in mind the API key for the website-screenshot API and the unique ID for crudcrud should be in a `secret.js` file which is not committed to git.
