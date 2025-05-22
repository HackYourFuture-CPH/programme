# Lesson Plan

## What is Node.js?

Node.js is software that allows you to use JavaScript to write the application part of the backend. The application is written in different .js files, and are then read and executed using the node command in the Command Line. For example, node script.js.

Read the following article and code along: Introduction into Node.js

Software builds on other software. Node.js is powerful because it allows us to use software others have written to help build our own unique applications. In Node.js these are called modules/packages/dependencies (can be used interchangeably). An easy way to get access to these is by using the Node Package Manager, also known as npm.

Read the following article and code along: A Beginner’s Guide to npm — the Node Package Manager

It is also powerful because we can use the language we already know, JavaScript, to write backend applications. Watch the following video and code along: Node.js Crash Course

## Code inspiration

### Building a simple http webserver

Go to the `teacher-live-coding` [project repository](https://github.com/HackYourFuture-CPH/teacher-live-coding), run using `nodemon ./src/backend/simple-webserver.js`. Try and implement this functionality from the bottom while explaining.

### Exercises

1. [Server](../exercises/01-server.md): Setup project and create a server with Express
1. [Database](../exercises/02-database.md): Connect to your MySQL database from Node.js and Express
1. [User routes](../exercises/03-user-routes.md): Declare new routes that interact with a `users` table
