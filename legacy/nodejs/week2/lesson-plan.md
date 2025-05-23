# Lesson plan

- Focus on having lots of in class exercises.
- DON'T teach everything, let the students investigate topics on their own as well!
- Focus on how to read documentation, google answers and google errors!!
- Teach towards the students being able to solve the homework.

Remember to add the code you wrote in the class to the relevant class branch's class work folder. If the branch has not been created just create and push it :) If you don't have access, write to one from the core team. You can see an example below!

To find examples of what teachers have taught before go to the class branches in the classwork folder, e.g. [class 07](https://github.com/HackYourFuture-CPH/JavaScript/tree/class07/JavaScript1/Week1/classwork)

If you find anything that could be improved then please create a pull request! We welcome changes, so please get involved if you have any ideas!!!

---

- Express
  - What is express
  - Routing (focus on `get` requests)
    - `app.use`
    - `app.get`
    - [Live coding](#app-get-vs-app-use)
    - Params `users/:id`
    - Query parameters `users?limit=5`
    - [Live coding](#query-parameters-vs-parameters)
    - Exercise
    - Route order
      - [Live coding](#route-order)
    - Logging and debugging
      - Focus on the students understanding **the order** in which things are executed
  - Middleware
    - `next` method
    - Modifying `request` and `response`
    - <https://fullstackopen.com/en/part3/node_js_and_express#express>
    - [Live coding](#middleware)
    - Exercise
- Postman
  - Create collection and save queries
  - Sending get requests requests
    - Query parameters
    - Parameters

## Flipped classroom videos

[Flipped classroom videos](https://github.com/HackYourFuture-CPH/node.js/blob/main/week1/preparation.md#flipped-classroom-videos)

## Code inspiration

### app get vs app use

Go to the `teacher-live-coding` [repo](https://github.com/HackYourFuture-CPH/teacher-live-coding), run `npm install` and run using `nodemon ./src/backend/app-use-vs-app-get.js`. Try and implement this functionality from the bottom while explaining.

### Query parameters vs parameters

Run `nodemon ./src/backend/query-parameters-vs-parameters.js`. Try and implement this functionality from the bottom while explaining.

### Route order

Run `nodemon ./src/backend/route-order.js`. Try and implement this functionality from the bottom while explaining.

### Middleware

Run using `nodemon ./src/backend/middleware.js`. Try and implement this functionality from the bottom while explaining.

## Exercises

1. [Server](./exercises/01-server.md): Setup project
1. [DB schema](./exercises/02-schema.md): Setup MySQL database schema
1. [API](./exercises/03-api.md): Snippets API exercises
   - [POST endpoint](./exercises/04-post-endpoint.md)
   - [GET endpoints](./exercises/05-get-endpoints.md)
   - [Authentication](./exercises/06-auth.md)
