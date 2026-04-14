# Classes & Object-Oriented Programming (Week 4)

In this session, you'll learn how to use JavaScript classes to create reusable templates for objects that share common properties and behaviors. By mastering classes and inheritance, you'll be able to organize your code more efficiently and implement object-oriented programming principles. These skills will help you write cleaner, more maintainable code and understand the differences between classes and objects in JavaScript.

## Contents

- [Preparation](./preparation.md)
- [Session Plan](./session-plan.md) (for mentors)
- [Exercises](./session-materials/exercises.md)
- [Assignment](./assignment.md)

## Session Learning Goals

By the end of this session, you will be able to:

- [ ] Use **classes** to create objects with consistent structure and built-in behavior
  - [ ] Declare a class using `class`, `constructor`, and `this`
  - [ ] Instantiate objects from classes using `new`
  - [ ] Use Methods and constructors
  - [ ] Use Static methods
  - [ ] Understand the difference between classes vs objects
- [ ] Use **inheritance** and **composition** to share behavior between classes
  - [ ] Use inheritance with `extends` and `super()`
  - [ ] Recognize when inheritance is a good fit ("is-a" relationship)
  - [ ] Use composition ("has-a") as an alternative to inheritance
- [ ] _(optional)_ Recognise common **design patterns** and when to apply them
  - [ ] Strategy — swap behavior by passing in a different object
  - [ ] Factory — hide object creation complexity behind a function
  - [ ] Observer — notify listeners when state changes
  - [ ] Singleton — ensure only one instance of a class exists

```js
class Comment {
  constructor(username, text) {
    this.username = username;
    this.text = text;
    this.likes = 0;
  }

  like() {
    this.likes++;
    this.render();
  }

  render() {
    // data, behavior, and rendering live together
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>@${this.username}</strong>
      <p>${this.text}</p>
      <button>❤️ ${this.likes}</button>
    `;
    return div;
  }
}

const comment = new Comment("alice", "Great post!");
document.body.appendChild(comment.render());
```
