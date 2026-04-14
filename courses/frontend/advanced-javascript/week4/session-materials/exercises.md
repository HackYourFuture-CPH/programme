# Exercises

Work through these in order.

## 1. User class with DOM rendering

### 1. Create a user class

Create a `User` class with 2 properties: `firstName` and `lastName`. Hint: use `this` and `constructor`.

### 2. Create an instance of the class

Use the `new` keyword and assign the instance in a variable.

Add a **`renderUserCard(user)`** function that accepts a **`User`** instance and renders a user card on the page (e.g. a `div` with `firstName` and `lastName`).

### 3. Create a class method

1. Add **`getFullName`**: it should return the combined first and last name of the user. Use string concatenation or template literals and **`this`** to read the properties.

2. Add **`render()`** on **`User`**: it should render the user card on the page (same job as **`renderUserCard(user)`** in exercise 2, but as an instance method). Use **`this.getFullName()`** for the name you show on the card.

3. Call **`myUser.render()`** so the card appears on the page (you can stop using **`renderUserCard`** once this works).

## 2. Creating a CV class

The CV that we will be making uses three classes: `Job`, `Education` and
`CV`. The `CV` class we have made for you (with some missing functionality). The `Job` and `Education` classes you need to create.

### Part 1

Create the classes `Job` and `Education`.

- `Job` has five properties: `id`, `title`, `description`, `startDate` and `endDate` (the dates can be strings or actual `Date` objects).
- `Education` has six properties: `id`, `title`, `school`, `address`, `startDate` and `endDate`.

```js
class Job {
  ///...
}

class Education {
  ///...
}
```

### Part 2

Now add the functionality for the methods in the `CV` class.

_Remember_: jobs and educations are just arrays of class instances. So use your array manipulation knowledge for the add and remove methods.

```js
class CV {
  constructor(email) {
    this.jobs = [];
    this.educations = [];
    //this.email = ?
  }

  addJob(job) {
    // add functionality here
  }

  removeJob(job) {
    // add functionality here
  }

  addEducation(education) {
    // add functionality here
  }

  removeEducation(education) {
    // add functionality here
  }
}
```

### Part 3

1. Create a new `CV` instance using the `new` keyword, and save it in a variable called `myCV`.

2. Apply the methods you have created on the `myCV` object. Create a few `Job` and `Education` objects and add them to your CV.

3. Remove a job and an education from `myCV`.

4. Log `myCV` to the console, again, and check that the objects were removed correctly.

### Part 4

Add a method to the `CV` class called `renderCV()`. This method should render out the CV using HTML. Make sure, that view updates, when data is changed.

## 3. Design Challenge: FoodDash

You're building a food delivery app. Customers browse restaurants, add items to their order, and a driver picks it up and delivers it.

**Rules:** paper only — no code yet!

For each class you identify, write down:

- Its name
- Its properties
- Its methods
- How it relates to the other classes

Think about:

1. What classes do you need?
2. What properties does each class have?
3. What methods does each class need?
4. How do the classes relate to each other?
5. Does anything share behavior? How would you handle that?

When done, compare your design with others: which classes did different people pick? Did anyone make `Driver extends User`? How did you handle the `Order`/`Restaurant` relationship?

## Bonus: Build FoodDash

Now that you've designed FoodDash on paper, build it in code.

1. Create a `Restaurant` class with a `name` property and a `menu` property (array of items, each with a `name` and `price`).
2. Create an `Order` class that takes an array of items and a `Restaurant` instance.
   - Add an `addItem(item)` method and a `removeItem(item)` method.
   - Add an `async calculateTotal()` method that sums the prices of all items in the order.
3. Create a `User` class that receives a `name`, `email`, and `role` object via the constructor. The role object must have a `perform(name)` method.
   - Add a `doWork()` method that calls `this.role.perform(this.name)`.
4. Create two role objects (`customerRole` and `driverRole`), each with a `perform(name)` method that logs what that role does.

**Bonus:** Add a `static Order.sortByTotal(orders)` method that sorts an array of orders by total price.

## Challenge: Monster Arena

A turn-based monster battle game — design and OOP in action.

You have a starter project in [`./oop-monster-arena/`](./oop-monster-arena/). Follow the instructions in its README.

The challenge covers:

- Modeling game entities as classes (`Monster`, `Arena`, `Attack`)
- Using composition to give monsters different attack strategies
- Inheritance for shared monster behavior
- Turn-based game loop logic
