# Lesson plan

- Focus on having lots of in class exercises.
- DON'T teach everything, let the students investigate topics on their own as well!
- Focus on how to read documentation, google answers and google errors!!
- Teach towards the students being able to solve the homework

Remember to add the code you wrote in the class to the relevant class branch's class work folder. If the branch has not been created just create and push it :) If you don't have access, write to one from the core team. You can see an example below!

To find examples of what teachers have taught before go to the class branches in the classwork folder, e.g. [class 07](https://github.com/HackYourFuture-CPH/JavaScript/tree/class07/JavaScript1/Week1/classwork)

If you find anything that could be improved then please create a pull request! We welcome changes, so please get involved if you have any ideas!!!

---

- Browser environment

  - HTML vs CSS vs JS
  - Client vs server
  - Where is the script tag being loaded
  - Code debugging

- DOM

  - What is it and what do developers use the DOM for?
  - DOM manipulation
    - Get elements
    - Create elements
    - Insert elements - let students investigate `appendChild`, `insertBefore`
    - Element manipulation (`style`, `innerHTML`, `text`)
    - Document object
    - [Code inspiration simple](#dom)
    - [Code inspiration change logo](#change-logo)
    - Exercises: [Favourite dishes](#favourite-dishes), [podcasts](#podcast), [image inserter](#image-inserter)

- Event listeners - Focus on usage, no explanation of callback
  - Click, mouseover, etc. Explain one and let students investigate another, like mouseover or mousemove
  - Input Change, input
  - Event parameter
  - [Code inspiration](#event-listener)
  - [Exercise simple](#simple-event-listener)
  - [Exercise dark mode light mode](#light-mode-dark-mode)

Really try in this class to do short teaching and lots of exercises!

## Flipped classroom videos

[Flipped classroom videos](https://github.com/HackYourFuture-CPH/JavaScript/blob/main/javascript2/week1/preparation.md#flipped-classroom-videos)

## Code inspiration

### DOM

```js
const eventElement = document.querySelector(".events");
eventElement.innerHTML = "Soccer training Wednesday";
eventElement.style.backgroundColor = "blue";
console.log(eventElement);

const div = document.createElement("div");
div.innerHTML = "new div";

const body = document.querySelector("body");
body.appendChild(div);
```

### Change logo

```js
function changeLogo() {
  let logo = document.getElementById("logo");
  logo.src =
    "https://assets.fontsinuse.com/static/use-media-items/15/14246/full-2048x768/56fc6e1d/Yahoo_Logo.png?resolution=0";

  let newTitle = document.createElement("h1");
  newTitle.innerHTML = "My new title"; // <h1>My new title</h1>

  document.body.appendChild(newTitle);
}

changeLogo();
```

### Event listener

```js
// change the event type
document.querySelector("button").addEventListener("click", function (event) {
  // what does the event do?
  console.log(event);
  body.style.backgroundColor = "red";
});
```

## Exercises

### Favourite dishes

Create an array of strings with your favourite dishes.

With js select a `ul` in the DOM. You add the `ul` to the html file.

Now loop through each element of the favourite dishes array, you create an `li` element and set the text to the favourite dish.

Then append the `li` element to the `ul` element.

### Podcast

```js
const podcasts = [
  {
    name: "The mystery om of Johan Klausen Varbourg",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Tips about dogs with small legs",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "You, me, we and us",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Breakfast news - Dinner edition",
  },
];
```

1. Create a `ul`
2. Loop through the podcasts
3. For every podcast:
   1. Create an `li`
   2. Create an `h1` element
   3. Change the innerHTML of the `h1` to equal the name of the current podcast
   4. Append the `h1` to the `li`
   5. Now add an image to the `li` with the `src` set to the `imageUrl`. But only if the `imageUrl` key exists on the object!
4. Append the `li` to the `ul`

### Image inserter

Create a function that has two parameters: `imageUrl` and `elementToAppendImageTo`. The function should create an img tag and set the `src` attribute of the img to the `imageUrl` parameter. The function should then append the `img` to the `elementToAppendImageTo` - html element.

```js
// Should append a img tag to the body with the picture from 'https://picsum.photos/536/354'
notThisFunctionName(
  "https://picsum.photos/536/354",
  document.querySelector("body"),
);
```

### Simple event listener

When clicking a button, change the text on the button to say "Button clicked"

### Light mode dark mode

Clicking a button should toggle the background color of the body and the text color in the page.
If the background is white and the text is black, then clicking the button will make the background dark and the text white and vice versa

_Optional_ also make the text on the button change.
