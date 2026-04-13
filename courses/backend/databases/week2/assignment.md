# Week 2 Assignment

## 1. Advanced Database Concepts

> **💡 New this week:** Parts A, C, and D of this assignment can be explored and validated in your browser using the **DB Playground** — a local SQLite environment that runs without any server or setup. See [Getting Started with the Playground](#getting-started-with-the-playground) below.

---

### Background

You will continue working with the `tasks.sqlite3` database from the Week 1 assignment. It should have the following tables: `user`, `task`, `status`, `category`, and `task_category`.

In this assignment you will write aggregate queries for reporting, learn to identify and prevent SQL injection vulnerabilities through a realistic scenario, and use transactions to safely handle multi-step operations.

---

### Getting Started with the Playground

For **Parts A, C, and D** of this assignment, you can use the **DB Playground** — a single HTML file that runs a full SQLite database directly in your browser using WebAssembly. No installation, no server, no configuration.

> **Note:** Part B (SQL Injection) requires written answers and code — it cannot be validated in the Playground. You will need to submit those answers in your `.sql` file as comments.

#### Option A — Use the Playground (recommended for Parts A, C & D)

1. Open the **[DB Playground](https://amazing-brigadeiros-357b84.netlify.app/)** in **Chrome or Edge** (Firefox is not supported for file saving)
2. Click **New DB** — this seeds the database with the same schema and sample data you worked with in Week 1, plus some additional rows for this week's exercises
3. Click any question in the right panel to load a starter template into the editor
4. Write your SQL in the editor and press **⌘/Ctrl + Enter** to run it
5. When you're happy with your answer, click **✓ Check Answer** — the playground will validate your result automatically and tick the checkbox if correct
6. When you're done, click **Save** to save your `tasks.sqlite3` file to disk — you can reopen it next session and your progress is remembered

> **💡 Tip:** The playground validates your _results_, not the exact query you wrote. There are often multiple correct ways to write the same query — as long as your output matches the expected values, it passes.

#### Option B — Local SQLite

If you prefer to work locally with the `sqlite3` CLI or DBeaver for SQLite, that works too. Submit a single `.sql` file with all your queries and comments, structured as shown in the [Submission](#submission) section.

---

### Part A: Aggregate Functions & Reporting

Use aggregate functions (`COUNT`, `AVG`, `SUM`, `MIN`, `MAX`) and `GROUP BY` to answer the following business questions. Save each query in your `.sql` file.

1. Count the total number of tasks in the database
2. Count how many tasks each user has been assigned (include users with zero tasks)
3. Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")
4. Find the user who has the most tasks assigned
5. Calculate the average number of tasks per user (only count users who have at least one task)
6. Find the earliest and latest due date across all tasks
7. List each category along with the number of tasks it contains, ordered from most to least tasks
8. Find all users who have more than 2 tasks assigned to them

> **💡 Hint:** For question 8, look into the `HAVING` clause — it works like `WHERE` but filters on aggregated values.

---

### Part B: SQL Injection

#### The Scenario

Imagine you are working on a **task management web app** for a small company. The app has a search feature: a manager types a colleague's name into a text box and sees all tasks assigned to that person.

The backend is written in Node.js. A junior developer on the team wrote the following function to power the search:

```javascript
function getTasksByUser(userName) {
  const query = `SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '${userName}')`;
  db.all(query, (err, rows) => console.log(rows));
}
```

It works fine in testing. Everyone types normal names like `Alice` or `Bob`. The feature ships to production.

Three weeks later, the company's entire task database is wiped. The attacker never had an account. They just typed something carefully crafted into the search box.

> **💡 See it live:** Before answering the questions below, open the **[SQL Injection Demo](https://curious-sfogliatella-f8d2f9.netlify.app/)** and try the attack strings yourself. Switch between the vulnerable and protected modes to understand what changes — and why.

---

#### 1. Spot the Vulnerability

The function above builds a SQL query using **string concatenation** — it glues user input directly into the query string without any sanitisation.

1. Explain in a comment in your `.sql` file: what would happen if `userName` was set to `' OR '1'='1`? What data would be returned, and why is this dangerous?
2. Write the malicious string that an attacker could use to delete all tasks from the database. You do **not** need to run it — just write it as a comment with an explanation of how it works.

> **💡 Key insight:** The attacker doesn't need to know anything about your database schema. They just need to find one input box that isn't protected — and then they can experiment. Once `' OR '1'='1` returns unexpected results, they know the door is open.

#### 2. Fix the Vulnerability

The vulnerable function can be rewritten so that user input never gets concatenated directly into the query string. Research how database libraries handle this safely and rewrite `getTasksByUser` using the appropriate pattern.

Write your fixed version as a code comment in your `.sql` file.

> **💡 Key takeaway:** User input should never be directly concatenated into SQL strings. Every major database library has a built-in mechanism for handling this — find out what it is called and how it works.

---

### Part C: Transactions

Transactions ensure that a group of operations either **all succeed** or **all fail** — leaving the database in a consistent state. This is especially important for operations that touch multiple rows or tables.

#### Scenario

A user is leaving the team and all their tasks need to be **reassigned to another user**. This involves two steps:

1. Updating all tasks assigned to the departing user
2. Deleting the departing user from the `user` table

If step 2 fails, step 1 should be rolled back — you don't want tasks pointing to a non-existent user.

#### Tasks

Write the following queries and save them in your `.sql` file:

1. Write a transaction that reassigns all tasks from one user to another, then deletes the original user. Use `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK`.

   ```sql
   -- Example structure:
   BEGIN TRANSACTION;
     UPDATE task SET user_id = ? WHERE user_id = ?;
     DELETE FROM user WHERE id = ?;
   COMMIT;
   ```

2. Write a second transaction that demonstrates a **deliberate rollback**: attempt to reassign tasks and then intentionally trigger a failure (e.g., try to insert a task with a non-existent `status_id`). The whole transaction should roll back so no changes are saved.

---

### Part D: Putting It All Together

Combine everything from Parts A–C to solve the following real-world scenarios:

1. Write a transaction that:
   - Creates a new category called `"Urgent"`
   - Finds all tasks that are "In Progress" or "To Do"
   - Assigns all of those tasks to the new `"Urgent"` category
   - If anything goes wrong (e.g., duplicate category name), rolls back the entire operation

2. Write a query that generates a simple dashboard summary with a single result set containing:
   - Total number of tasks
   - Number of completed tasks (status = "Done")
   - Number of overdue tasks (due_date < today)
   - Number of users with at least one task

   > **💡 Hint:** You can use subqueries or `CASE` expressions inside a single `SELECT` to combine multiple aggregations.

---

### Submission

Submit your assignment as a **single `.sql` file** containing all your queries and explanations, clearly labeled with comments. This is the required format regardless of whether you used the Playground or worked locally — the Playground is a tool to help you write and validate your queries, but your final submission is always the `.sql` file.

Make sure your file runs without errors from top to bottom in SQLite.

Structure your file clearly with a comment header for each part and question:

```sql
-- ============================================================
-- Week 2 Assignment — Databases
-- Student: Your Name
-- ============================================================

-- Part A, Question 1: ...your query here...

-- Part A, Question 2: ...your query here...

-- Part B.1: ...your explanation and attack string as comments...

-- Part B.2: ...your fix as a code comment...

-- Part C, Question 1: ...your transaction here...

-- ... and so on
```

> **💡 If you're stuck:** Ask on Slack, check the hints in the Playground, or re-read the Week 2 slides on GROUP BY and HAVING before reaching for the answer.

## 2. Events Startup Project

Continue progress on the [Events Startup Project](/courses/backend/events-startup-project/README.md). Check the [Weekly Plan](/courses/backend/events-startup-project/weekly-plan.md) for specific tasks to complete this week.