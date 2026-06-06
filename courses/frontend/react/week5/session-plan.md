# Session Plan

## Next.js

### Why Next.js?

- Purpose of Next.js

### Server-Side Rendering (SSR) and Static Site Generation (SSG)

#### Explanation of SSR and SSG

- Define Server-Side Rendering (SSR) and Static Site Generation (SSG)
- Explain the benefits of SSR and SSG over client-side rendering

#### Use cases for SSR and SSG

- Discuss when to use SSR (dynamic data, personalization, etc.)
- Discuss when to use SSG (static content, blogs, documentation, etc.)

#### Server Components for SSR

- Explain how [Server Components](https://react.dev/reference/rsc/server-components) can speed up load times by directly sending HTML to the browser
- Introduce the `"use server"` directive, allowing React components to be rendered on the server

### When to Use Client vs. Server Components?

- Re-iterate how Next.js distinguishes client and server components (`"use server"` and `"use client"`)
- Illustrate how these fit into the SSR and SSG concepts

### Introduction to Next.js App Router

#### Overview of Next.js routing system

- File-based routing system in Next.js
- Dynamic Routes
- Mention the Next.js Link Component & why it is used

#### Advantages over traditional client-side routing

- Improved performance with built-in server-side rendering and static site generation
- Simplified routing configuration
- Nested layouts and nested routes

### Basic Next.js Routing

- Explanation of routes
- Creating subfolders in `app` directory with `page.jsx` file.
- Create a component that defines a page

### Next.js Router Hooks

#### Understanding the `useParams` Hook (client-only)

- Explain the purpose of the `useParams` hook
- Discuss how to use the `[]` bracket notation to mark params in a folder/filename
- Demonstrate how to use `useParams` to access the params of the current path

#### Understanding the `useSearchParam` Hook (client-only)

- Explain the purpose of the `useSearchParams` hook
- Demonstrate how to use `useSearchParams` to access the query strings

#### Working With the `useRouter` Hook (client-only)

- Introduce the `<Link>` component for most links
- Discuss the need for redirects in web applications (authentication, URL changes, etc.)
- Introduce the `useRouter` hook
- Explain how to access various router properties (push, replace, etc.)
- Demonstrate programmatic navigation using `router.push` and `router.replace`

#### Working With `params` and `searchParams` in Server Components

- Mention that the aforementioned hooks don't work in Server Components (Next.js pages)
- Explain that we can use the object Next.js passes to page functions to get `params` and `searchParams` on the server-side
- Demonstrate usage with a sample page function like this:

```typescript jsx
// Url /{id}?query={query}
export default async function IdPage({ params, searchParams }) {
  const id = (await params).id;
  const query = (await searchParams).query;

  return <h1>Hello, the id is {id} and query is {query}</h1>
}
```

### Advanced: Server Functions & API Routes

#### Server Functions

- Explain Server Functions _(previously "Server Actions")_ as a mechanism to run JavaScript code on the server that hosts the website
- Discuss how this is different from running JavaScript in the user's browser
- Reference [the React docs for Server Functions](https://react.dev/reference/rsc/server-functions) demonstrating how to use them

#### Server Components

- Discuss how Server Components allow the use of Server Functions inside the component
- Explain that client components can use Server Functions by importing them from a file with the `"use server"` directive

#### Server Actions

- Introduce "Server Actions" as a specific type of Server Function
- Provide context by mentioning plain old `<form>`s on the internet that can be sent to a server for processing (we could call them "server functions"!)
- Explain how attaching a Server _Function_ to a (form) `action` makes it a Server _Action_

#### API Routes

- Explain how Next.js supports Server Actions and Server Components as React features
- Introduce API routes as a concept from the backend side of web development
- Provide an overview of [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) and how they allow to create an API route that returns JSON
- [_(The concept of APIs is covered in detail in the backend specialization)_](/courses/backend/node/README.md)

## Vercel

### Introducing Vercel & Good Use Cases

- Introduce Vercel as the company behind Next.js, as well as a provider of cloud infrastructure
- Explain how Vercel's hosting options allow developers to host Next.js applications with very little effort
- Highlight that hosting on Vercel is a good fit for a prototype or portfolio website built with React and/or Next.js

### Connecting a GitHub Repository With Vercel

- Demonstrate in the browser how a **public** GitHub repository from ones account can be connected to Vercel and deployed with the click of a button
- Illustrate one way to get started with Vercel by installing the Vercel CLI globally `npm -g vercel`
- Show logging in to Vercel using `vercel login` and using ones GitHub account
- Show how one can deploy a local folder with a Next.js app using the `vercel deploy` CLI command

### Limitations of Vercel

- Mention that Vercel probably works best for hosting Next.js applications or static websites
- Discuss how other frameworks are supported, but that the focus is likely on Next.js
- Mention that knowledge about DNS, domains, npm, dependencies etc. is not required, but useful when managing a site on Vercel
- Highlight that Vercel is well-suited for production applications, but that prices can apparently vary a lot based on usage

## Exercises

### 1. Installing Next.js and Getting Started

- Create a new app using `npx create-next-app@latest --javascript`, accepting defaults
- When in doubt about the option prompts, refer to [the installation guide](https://nextjs.org/docs/app/getting-started/installation)
- Explore the folder structure created and research elements you don't understand
- Run the app using `npm run dev`

### 2. Create a Page That Renders a random dog image using Server Side Rendering

- Use [the dog.ceo API](https://dog.ceo/dog-api/documentation/) to fetch a random image of a dog
- Implement [data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) to fetch the data during the render
- Render the fetched image on the page

### 3. Fetch placeholder blog posts from an API

- Follow the [“Fetching Data”/“with the fetch API” section in the Next.js docs](https://nextjs.org/docs/app/getting-started/fetching-data#with-the-fetch-api):
- Fetch the placeholder blog posts in a Server Component, using fetch, from https://jsonplaceholder.typicode.com/posts
- Show a list of all unique `userId`s in the JSON
- Show a count of the unique users

### 4. Client vs. Server Exercise

- Create a component that renders 10 articles from a JSON array
- You may use Generative AI to create **only** these articles, or use example text (search for "Lorem Ipsum generator")
- Create a page that renders the 10 articles on the server
- Create a page that renders the 10 articles on the client
- Use your browser's performance panel to measure the performance of both versions
  - Example: [Chrome Performance Tab](https://developer.chrome.com/docs/devtools/performance/overview)
- Document the two performance results and potential differences

#### Docs

- [Next.js Docs on Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

### 5. Routing and Navigation Exercise

#### Create a Blog Website With Dynamic Routes to Different Blog Posts

- Create a route `/blogs` that displays blogs
- Create a dynamic route for a blog post that displays the title from the route. For example, `/blogs/my-new-post` should dynamically display "My New Post".
- Hint: Check out the [documentation](https://nextjs.org/docs/app/api-reference/functions/use-params) for `useParams`, if you add `'use client'` to your page, otherwise check [this page to help you choose](https://nextjs.org/docs/app/getting-started/server-and-client-components#when-to-use-server-and-client-components.)

#### Create a Page That Displays a NASA EPIC Image on a Different Date Depending on a Query String Parameter Received

- Use the [NASA API](https://api.nasa.gov/#EPIC) to fetch EPIC images
- Access the query string parameter using `useSearchParams`
- Fetch and display the EPIC image for the specified date

### 6. Server Functions (or Server Actions) & API Routes Exercise

#### Server Functions (or Server Actions)

- Create a server action that `console.log`s the current time when it is triggered
- Create a page with a button that triggers the server action
- Observe the Next.js console (not your browser console) after you've clicked the button
- Does it show the time?
- [Refer to the docs when in doubt](https://nextjs.org/docs/app/getting-started/updating-data#creating-server-functions)

#### Trying out API Routes

- Create a Hello World API route at `/api/hello` that returns the following JSON

```json
[
  {
    "type": "cat",
    "message": "purr"
  },
  {
    "type": "computer",
    "message": "Hello World"
  }
]
```
