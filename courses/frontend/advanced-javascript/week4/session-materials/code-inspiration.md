# Code inspiration

Snippets aligned with the in-session [demo](./demo/README.md): same `Comment` shape (`username`, `text`), plain-object motivation, `render()` / `like()` / `hasSwearWord()`, then `Error` / `ValidationError` and a Web Components sketch. Use these on the board or as copy-paste shortcuts; the demo files are the full runnable version.

## Motivation (plain objects)

Why classes: repeated object literals are easy to get wrong; rendering and behavior live outside the data.

```js
const comment1 = {
  username: "alice",
  text: "Nice!",
  date: new Date(),
  likes: 0,
};
const comment2 = { userName: "bob", text: "Hi" }; // typo: userName → UI shows undefined
const comment3 = { username: "carol", content: "Oops" }; // wrong key for text

function renderComment(comment) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <p>@${comment.username}</p>
    <p>${comment.text}</p>
    <button>❤️ ${comment.likes}</button>
  `;
  return div;
}

function likeComment(comment) {
  comment.likes++; // data changes, but the button on screen does not update
}
```

## Constructor

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
    this.element = null;
  }
}
```

## Instance

```js
const c1 = new Comment("dave_dev", "Hello!");
const c2 = new Comment("eve_codes", "Second comment");

console.log(c1);
```

## Methods

`render()` keeps DOM in sync with state; `like()` updates and re-renders; `hasSwearWord()` drives a CSS class (e.g. `comment--flagged`) for moderation-style UI.

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
    this.element = null;
  }

  like() {
    this.likes++;
    this.render();
  }

  hasSwearWord() {
    const swearWords = ["crap", "damn", "stupid"];
    const words = this.text.toLowerCase().split(" ");
    return swearWords.some((swear) => words.includes(swear));
  }

  render() {
    if (!this.element) {
      this.element = document.createElement("div");
    }

    this.element.className = this.hasSwearWord()
      ? "comment comment--flagged"
      : "comment";

    this.element.innerHTML = `
      <div class="comment-header">
        <span class="comment-username">@${this.username}</span>
        <span class="comment-date">${this.date.toLocaleDateString()}</span>
      </div>
      <p class="comment-text">${this.text}</p>
      <button class="like-btn">❤️ ${this.likes}</button>
    `;

    this.element
      .querySelector(".like-btn")
      .addEventListener("click", () => this.like());

    return this.element;
  }
}

document.getElementById("comments-class").appendChild(c1.render());
```

## Static methods

A **static method** belongs to the class itself, not to instances. Useful for factory functions (creating instances from raw data) or utility operations.

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.date = new Date();
    this.likes = 0;
  }

  static fromJSON(data) {
    return new Comment(data.username, data.text);
  }

  // ... render(), like(), etc.
}

// Called on the class, not on an instance:
const apiData = { username: "grace_api", text: "Loaded from JSON!" };
const comment = Comment.fromJSON(apiData);
```

**You already use static methods — `Promise` is a class!**

```js
// Instance methods (called on an instance):
const p = new Promise((resolve) => resolve("done"));
p.then((value) => console.log(value));
p.catch((err) => console.log(err));

// Static methods (called on the class itself):
Promise.resolve("instant value");
Promise.all([fetch("/a"), fetch("/b")]);
Promise.race([fetch("/a"), fetch("/b")]);
```

## Inheritance

A child class inherits all properties and methods from a parent. `extends` = "is-a". `super()` calls the parent's constructor — must come before using `this`.

```js
class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }
  move() {
    console.log(`${this.brand} is moving`);
  }
}

class Car extends Vehicle {
  constructor(brand, speed, doors) {
    super(brand, speed); // calls Vehicle's constructor
    this.doors = doors;
  }
  honk() {
    console.log("Beep!");
  }
}

const car = new Car("Tesla", 0, 4);
car.move(); // inherited from Vehicle
car.honk(); // Car's own method
```

**When inheritance gets awkward** — the child is forced to break or override parent behavior:

```js
class Vehicle {
  refuel() {
    console.log("Filling up the tank...");
  }
}

// ElectricCar IS A Vehicle, but refuel() makes no sense for it
class ElectricCar extends Vehicle {
  refuel() {
    throw new Error("I don't use fuel!");
  }
}
```

When you find yourself overriding methods just to disable them, that's a sign to use composition instead.

## Composition

Instead of inheriting behavior, a class HAS parts. Each part is its own class. This is the "has-a" relationship.

```js
class Engine {
  start() {
    console.log("Engine started");
  }
}

class GPS {
  navigate(to) {
    console.log(`Navigating to ${to}`);
  }
}

class Car {
  constructor(brand) {
    this.brand = brand;
    this.engine = new Engine();
    this.gps = new GPS();
  }
  start() {
    this.engine.start();
  }
  goTo(address) {
    this.gps.navigate(address);
  }
}
```

**Passing dependencies in** — instead of creating the engine inside, receive it from outside. This lets you swap behaviors without changing the class:

```js
class ElectricEngine {
  start(brand) {
    console.log(`${brand}: electric engine humming`);
  }
}

class GasEngine {
  start(brand) {
    console.log(`${brand}: gas engine roaring`);
  }
}

class Car {
  constructor(brand, engine) {
    this.brand = brand;
    this.engine = engine; // passed in from outside
  }
  start() {
    this.engine.start(this.brand);
  }
}

new Car("Tesla", new ElectricEngine()).start(); // "Tesla: electric engine humming"
new Car("Ford", new GasEngine()).start(); // "Ford: gas engine roaring"
```

**Rule of thumb:** favor composition. Use inheritance only when there's a clear, stable "is-a" relationship.

## (Optional) Extending built-ins: Error and Web Components

`Error` is a built-in class; custom errors use `extends` and `super()` like any other subclass. Web Components apply the same “class + lifecycle + HTML” idea to the platform.

```js
const err = new Error("something went wrong");
console.log(err.message);
console.log(err.stack);

class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }

  toUserMessage() {
    return `❌ ${this.field}: ${this.message}`;
  }
}

try {
  throw new ValidationError("username", "Cannot be empty");
} catch (error) {
  console.log(error.toUserMessage());
  console.log(error instanceof ValidationError);
  console.log(error instanceof Error);
}

// Web Components — same pattern, browser APIs (not required to run in the demo):
//
// class CommentElement extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `<div class="comment">...</div>`;
//   }
// }
// customElements.define("my-comment", CommentElement);
// <my-comment></my-comment>
```

## (Optional) Design Patterns

Named solutions to problems that keep showing up. Use these only when they genuinely fit — don't force them.

### Strategy Pattern

Swap behavior by passing in a different object. This is the composition idea taken one step further.

```js
const electric = {
  start(b) {
    console.log(`${b}: humming`);
  },
};
const gas = {
  start(b) {
    console.log(`${b}: roaring`);
  },
};
const hybrid = {
  start(b) {
    console.log(`${b}: both!`);
  },
};

// Same class, different strategy → different behavior
new Car("Tesla", electric).start();
new Car("Ford", gas).start();
new Car("Toyota", hybrid).start();
```

**When to use it:** multiple ways to do the same thing (sorting, validation, auth); you want to switch behavior without modifying the class itself.

### Factory Pattern

A function that creates objects for you — hides `new` and setup logic from the caller.

```js
function createCar(type, brand) {
  const engines = {
    electric: {
      start(b) {
        console.log(`${b}: humming`);
      },
    },
    gas: {
      start(b) {
        console.log(`${b}: roaring`);
      },
    },
  };
  return new Car(brand, engines[type]);
}

const tesla = createCar("electric", "Tesla");
const ford = createCar("gas", "Ford");
```

**When to use it:** object creation is complex (many params, config, dependencies); you want to centralize and hide construction details.

### Observer Pattern

"When something happens, notify everyone who cares." This is how `addEventListener`, Node's `EventEmitter`, and most UI frameworks work under the hood.

```js
class Order {
  constructor() {
    this.listeners = [];
    this.status = "pending";
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.listeners.forEach((fn) => fn(this.status));
  }
}

const order = new Order();
order.onChange((s) => console.log(`Customer notified: ${s}`));
order.onChange((s) => console.log(`Driver notified: ${s}`));
order.updateStatus("ready"); // both callbacks fire
```

### Singleton Pattern

Only one instance ever exists. Every call to `new` returns the same object.

```js
class Database {
  constructor(url) {
    if (Database.instance) return Database.instance;
    this.url = url;
    this.connected = false;
    Database.instance = this;
  }
  connect() {
    this.connected = true;
  }
}

const db1 = new Database("postgres://...");
const db2 = new Database("mysql://...");
console.log(db1 === db2); // true — same instance!
```

**Good for:** DB connections, config, logging, caches — things you truly need only one of.
**Use sparingly:** singletons are global state in disguise. They make testing harder and hide dependencies.
