# Session Plan

## Session Materials

- [Slides](./session-materials/js_oop_classes.pdf) – 41-slide deck covering all topics below
- [Demo](./session-materials/demo/) – In-session live coding: plain-object motivation, `Comment` class, methods, flagged comments, then Errors / Web Components as “real world” context. **index.js** = worksheet; **index-solution.js** = reference. [README](./session-materials/demo/README.md).
- [Code inspiration](./session-materials/code-inspiration.md) – Snippets for the board or live coding

## Session Outline

Start VERY simple — build the mental model before touching code. **Only teach Inheritance & Composition if trainees are solid on classes and methods.** It's the last major section and can be cut if needed. Design Patterns (slides 35–41) are optional/bonus only.

### 1. The Mental Model

Concepts before code. Get this right and the syntax will feel natural.

- **Class vs Instance:** class = blueprint (the concept), instance = the real thing
  - “Car” the concept vs that red Tesla parked outside
  - One class → many instances, each with its own data
- **Properties, Methods & Static:**
  - Properties = what it IS — the data that makes each instance unique
  - Methods = what it DOES — behaviors that use or change properties
  - Static = shared truths, same for ALL instances (not specific to one)
- Show the full picture (slide 6): blueprint on the left → two instances on the right

### 2. From Object to Class

Bridge from what trainees already know.

- Start with an object literal: `const myCar = { brand: “Tesla”, drive() { ... } }` — fine for ONE car
- Problem: what if you need 50? Copy-pasting 50 objects is a nightmare → you need a blueprint → a class
- Show the class syntax: `class`, `constructor`, `this`
  - `class` keyword defines the blueprint
  - `constructor` runs automatically when you call `new`
  - `this.___` assigns properties to the new instance
- What `new` does step by step (slide 10): creates empty object → sets `this` → runs constructor → returns object
  - [Code inspiration — constructor](./session-materials/code-inspiration.md#constructor)
  - [Code inspiration — instance](./session-materials/code-inspiration.md#instance)
- **[Exercise 1: User class with DOM rendering](./session-materials/exercises.md#1-user-class-with-dom-rendering)** — parts 1 & 2 (create class + instantiate)

### 3. Methods & `this`

- Adding methods: functions defined inside the class, no `function` keyword needed
- **`this` = the thing left of the dot** — that's all they need to know
  - `tesla.drive(100)` → `this` is `tesla`; `honda.drive(60)` → `this` is `honda`
  - Same method, different instance → different `this` → different result
  - Avoid going into edge cases (`bind`, `apply`, `call`) — trainees will forget it immediately
- Methods calling other methods via `this.method()`
- Async methods: just add the `async` keyword — works exactly like regular async functions, returns a Promise
- Static methods & properties: belong to the class itself, not any instance
  - Called on the class name: `Car.numberOfWheels` ✓ vs `myCar.numberOfWheels` ✗
  - Bridge to Promises: `Promise.resolve()`, `Promise.all()` — they already use static methods!
  - [Code inspiration — static methods](./session-materials/code-inspiration.md#static-methods)
- [Code inspiration — methods](./session-materials/code-inspiration.md#methods)
- **[Exercise 1: User class with DOM rendering](./session-materials/exercises.md#1-user-class-with-dom-rendering)** — part 3 (add `getFullName` + `render()`)
- **[Exercise 2: Creating a CV class](./session-materials/exercises.md#2-creating-a-cv-class)**

### 4. Design Challenge: FoodDash

Paper only — no code. This builds design thinking and sets up the inheritance discussion.

- **Brief:** food delivery app — customers browse restaurants, add items, driver delivers
- **Rules:** paper only; for each class: name + properties + methods; show relationships between classes
- 8 minutes in small groups, then each group presents their design
- Discussion questions to guide debrief (slide 21):
  - Which classes did different teams create?
  - Did anyone make `Driver extends User`? `Customer extends User`?
  - How did you handle the relationship between `Order` and `Restaurant`?
  - Where did shared behavior come up? How did you handle it?
- That last question leads naturally into the next section
- **[Exercise 3: Design Challenge: FoodDash](./session-materials/exercises.md#3-design-challenge-fooddash)**

### 5. Inheritance & Composition

**Only teach this section if trainees are solid on classes and methods.**

- **Inheritance: `extends` and `super()`**
  - A child class IS A type of the parent — gets all parent properties and methods
  - `super(...)` calls the parent's constructor — must come before using `this`
  - `extends` = “is-a”: a Car IS A Vehicle
  - [Code inspiration — inheritance](./session-materials/code-inspiration.md#inheritance)
- **When inheritance works:** clean “is-a” relationship, stable parent, max one level deep
  - Good examples: `Vehicle → Car, Truck`; `Shape → Circle, Rectangle`; `Account → CheckingAccount, SavingsAccount`
- **When inheritance gets awkward:** `ElectricCar extends Vehicle` — forced to override `refuel()` with an error
  - Adding `charge()` to `Vehicle` breaks gas cars; overriding to disable is a code smell
- **Composition: “has-a” instead of “is-a”**
  - Car HAS an Engine, HAS a GPS — create parts as classes and delegate to them
  - [Code inspiration — composition](./session-materials/code-inspiration.md#composition)
- **Passing dependencies in:** inject the engine from outside — swap behaviors without changing the class
- **Back to FoodDash:** inheritance approach hits a wall (a driver who is also a customer — JS has no multiple inheritance); composition handles it cleanly
- **Rule of thumb:** favor composition; use inheritance only when there's a clear, stable “is-a” relationship

### 6. Optional: Design Patterns

Bonus only — skip unless there is plenty of time and trainees are engaged.

- **Strategy:** swap behavior by passing in a different object (the composition idea taken further)
- **Factory:** a function that hides `new` and setup details from the caller
- **Observer:** “when something happens, notify everyone who cares” — think `addEventListener`; how DOM events, Node EventEmitter, and most UI frameworks work
- **Singleton:** only one instance ever exists — useful for DB connections or config, but global state in disguise, use sparingly
- **[Bonus Exercise: Build FoodDash](./session-materials/exercises.md#bonus-build-fooddash)**

## Exercises

See the separate [Exercises](./session-materials/exercises.md) document.

## Code inspiration

See the separate [Code inspiration](./session-materials/code-inspiration.md) document.
