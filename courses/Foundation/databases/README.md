# Introduction to Databases

In this class, students will be introduced to the core concepts of databases, including why we use them, how data is modeled, and how to interact with a relational database using SQL.

**Objective:**
Students should be able to explain what a database is, describe basic data modeling concepts, and perform basic SQL operations: SELECT, INSERT, UPDATE, DELETE, and simple filtering and sorting.

---

## Pre-Class Preparation

We will use **SQLite** for all exercises, as it requires no installation and works out-of-the-box with most environments. (Alternatively, a hosted PostgreSQL database may be provided.)

## TODO

Here we could provide an sqlite db file with some data in it, so that students already have some data to work with.

### Online tools:

- [DB Fiddle](https://www.db-fiddle.com/)
- [SQLite Online](https://sqliteonline.com/)
- https://sqlable.com/sqlite/
- https://www.drawdb.app/editor

### Local tools:

- [SQLite Browser](https://sqlitebrowser.org/)

---

## Main Topics

- **What is a database?**
  Why we use databases, real-life data models, and the role of databases in software systems.
- **Relational data terminology:**
  Table, row, column, primary key, foreign key.
- **Schemas and entities:**
  How to design and understand simple schemas.
- **Basic SQL operations:**
  - SELECT: Retrieving data
  - INSERT: Adding data
  - UPDATE: Modifying data
  - DELETE: Removing data
- **Filtering and sorting:**
  WHERE, LIKE, ORDER BY, LIMIT

---

## Reference Material

- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [w3schools SQL Tutorial](https://www.w3schools.com/sql/)
- [Official SQLite Documentation](https://sqlite.org/docs.html)
- [Joel Spolsky - Character Sets and Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

---

## Homework

### Start the homework

Need to brush up on the homework setup process? Check [this guide](https://github.com/HackYourFuture-CPH/Git/blob/main/homework-submission.md) out before you get into some git confusion!

### The task

Write SQL queries to answer the following:

1. How many tasks are in the task table?
2. How many tasks in the task table do not have a valid due date?
3. Find all the tasks that are marked as done.
4. Find all the tasks that are not marked as done.
5. Get all the tasks, sorted with the most recently created first.
6. Get the single most recently created task.
7. Get the title and due date of all tasks where the title or description contains **database**.
8. Get the title and status (as text) of all tasks.
9. Get the name of each status, along with a count of how many tasks have that status.
10. Get the names of all statuses, sorted by the status with most tasks first.

---

### Previous Sessions

If you want, watch the previous session recorded on video here:

- Part 1: <https://www.youtube.com/watch?v=gAeww1z5774>
- Part 2: <https://www.youtube.com/watch?v=u77w6Lw2gOY>
- Part 3: <https://www.youtube.com/watch?v=Mag9n6olmRU>

### Hand in homework

Need to brush up on the homework hand-in process?

Check [this resource](https://github.com/HackYourFuture-CPH/Git/blob/main/homework-submission.md) to remember how to hand in the homework correctly!
