## 📘 React & Next.js Module Restructuring Plan Proposal

### 🎯 Goal

The purpose of this restructuring is to enhance trainees' learning experience by clearly distinguishing foundational React concepts from the advanced features provided by Next.js. The current structure mixes fundamental and framework-specific topics, which has caused confusion and hindered deeper understanding. By separating these topics into two distinct, focused modules—one dedicated to mastering core React concepts and another specifically for exploring Next.js—we aim to improve comprehension, reinforce skills through targeted exercises, and ultimately empower trainees to confidently build real-world applications using modern development practices.

---

## ORIGINAL MODULE STRUCTURE

![draw io 2025-05-10 15 15 20](https://github.com/user-attachments/assets/1129af41-d894-422a-8b56-b7ef8fd42d07)
![draw io 2025-05-10 15 15 30](https://github.com/user-attachments/assets/b3cee13d-472e-4e47-ac66-689b3b840ee1)


## 🧱 PROPOSED MODULE STRUCTURE

### React Module (4 Weeks)

**Description:**
Covers everything essential about React and building React applications, including component lifecycle, state management, and routing. After completion, trainees should confidently create applications using React.

**Teaching Methodology:**

* **Flipped classroom:** With preparation materials, class sessions are dedicated to solving problems and practical implementation rather than theoretical explanations. \[From my experience, this amount of matherial might become 4-hours-lecture instead of 4-hours-practice]
* **Preparation Materials:** Improve beyond React documentation for effective flipped classroom learning.

**Technical Recommendations:**

* Use Vite or similar library for a client-only React setup to simplify configuration and focus more on React itself.

**Homework Strategy:**

* "Meal Sharing" project can be integrated progressively during the course, rather than post-module only.

![draw io 2025-05-10 15 15 50](https://github.com/user-attachments/assets/8c98a4ae-aeed-41d1-afc2-33667ff6bd44)


#### Weekly Goals and Topics:

**Week 1:** Everything about rendering a single component.

* React Introduction
* JSX fundamentals
* Components, props, CSS imports

**Week 2:** Master state management (passing, storing, updating state).

* useState Hook
* Conditional rendering, dynamic rendering

**Week 3:** Component lifecycle, data management (events, API), and refs.

* Event handlers, form management
* useEffect Hook
* API integration

**Week 4:** Context, Routing, Libraries, handling real-world cases.

* React Context
* (Optional): Reducers (I haven’t seen it used in production a lot), advanced state management
* Component libraries (UI libraries)
* &#x20;Routing
* Introduction to easy deployment (Vercel)

---

### Next.js Module (1 Week)

**Description:** An advanced module specifically for Next.js and advanced topics it coveres: server-side rendering (SSR), static site generation (SSG), differentiating between client and server components. It clearly explains how Next.js solves problems previously encountered in React.

Since trainees has already seen most of fundamental concepts and how they solved in pure React (fx Routing), it should be easier to explain how Next.js solves it, without focusing on what it is in general.

**Teaching Methodology:**

* **Preparation Materials:** Use “Next.js” original introduction course.

![draw io 2025-05-10 15 16 06](https://github.com/user-attachments/assets/bece24ea-418c-436d-b6d3-89da91b631e4)

#### Topics:

* Introduction to Next.js (why Next.js, recommended by React)
* SSR & SSG
* Next.js App Router
* When to use client vs server components
* Optional Advanced: Server Actions, API Routes
