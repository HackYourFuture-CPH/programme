# Session Plan

## Session Materials

- [Slides](./session-materials/js_oop_classes.pdf) – 41-slide deck covering all topics below
- [Demo](./session-materials/demo/) – In-session live coding: plain-object motivation, `Comment` class, methods, flagged comments, then Errors / Web Components as “real world” context. **index.js** = worksheet; **index-solution.js** = reference. [README](./session-materials/demo/README.md).
- [Code inspiration](./session-materials/code-inspiration.md) – Snippets for the board or live coding

## Session Outline

Start VERY simple — build the mental model before touching code. **Only teach Inheritance & Composition if trainees are solid on classes and methods.** It's the last major section and can be cut if needed. Design Patterns (slides 35–41) are optional/bonus only.

### 1. The Mental Model

Concepts before code. Slides 1–8.

- Class vs Instance (blueprint vs real thing)
- Properties, Methods, Static
- **[Code inspiration — constructor/instance](./session-materials/code-inspiration.md#constructor)**

### 2. From Object to Class

Slides 9–14. Bridge from object literals to class syntax.

- Object literal → problem at scale → class
- `class`, `constructor`, `this`, `new`
- **[Exercise 1: User class with DOM rendering](./session-materials/exercises.md#1-user-class-with-dom-rendering)** — parts 1 & 2

### 3. Methods & `this`

Slides 15–22.

- Methods, `this`, async methods, static methods & properties
- **[Code inspiration — methods/static](./session-materials/code-inspiration.md#methods)**
- **[Exercise 1](./session-materials/exercises.md#1-user-class-with-dom-rendering)** — part 3
- **[Exercise 2: Creating a CV class](./session-materials/exercises.md#2-creating-a-cv-class)**

### 4. Design Challenge: FoodDash

Slides 23–26. Paper only — no code.

- Small groups, 8 min: design classes for a food delivery app (name, properties, methods, relationships)
- Each group presents; debrief surfaces shared-behavior question → leads into inheritance
- **[Exercise 3: Design Challenge: FoodDash](./session-materials/exercises.md#3-design-challenge-fooddash)**

### 5. Inheritance & Composition

**Only teach if trainees are solid on classes and methods.** Slides 27–34.

- Inheritance: `extends`, `super()`, “is-a” relationship
- When inheritance gets awkward (diamond problem, forced overrides)
- Composition: “has-a” — delegate to injected parts
- Rule of thumb: favor composition; inheritance for clear, stable “is-a” only
- **[Code inspiration — inheritance/composition](./session-materials/code-inspiration.md#inheritance)**

### 6. Optional: Design Patterns

Slides 35–41. **Bonus only — skip unless time allows and trainees are engaged.**

- Strategy, Factory, Observer, Singleton
- **[Bonus Exercise: Build FoodDash](./session-materials/exercises.md#bonus-build-fooddash)**

## Exercises

See the separate [Exercises](./session-materials/exercises.md) document.

## Code inspiration

See the separate [Code inspiration](./session-materials/code-inspiration.md) document.
