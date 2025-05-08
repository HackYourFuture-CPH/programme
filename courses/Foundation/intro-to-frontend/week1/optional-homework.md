# Optional Homework

> [!WARNING]
> These are optional homework exercises that you can complete on top of your [assignment project](../../assignment-projects/), if you wish. There is no requirement for these to be reviewed, but feel free to ask a mentor if you wish for some feedback.

## So why this homework?

**Interacting with the DOM is a crucial part** of building a website. If we cannot interact with the DOM then the javascript we write cannot change what we see in the browser. **Connecting javascript to the browser opens up a new world of possibilities** where only the imagination is the limiting factor.

## Overview of homework

## 1. Problem solving cardio

Lets exercise our problem solving abilities!

![mind exercise](https://media.giphy.com/media/l41m04gr7tRet7Uas/giphy.gif)

### 1.1. codeWars!

Complete these Katas:

- [8kyu Remove First and Last Character](https://www.codewars.com/kata/56bc28ad5bdaeb48760009b0)
- [8kyu Counting sheep...](https://www.codewars.com/kata/54edbc7200b811e956000556)
- [7kyu String ends with?](https://www.codewars.com/kata/51f2d1cafc9c0f745c00037d)
- [7kyu Odd or Even?](https://www.codewars.com/kata/5949481f86420f59480000e7)

### 1.2. Find and count the Danish letters

Find the individual number and the total number of Danish letters in a string.

```js
const danishString = "Jeg har en blå bil";
notThisFunctionName(danishString); // returns {total: 1, å: 1}

const danishString2 = "Blå grød med røde bær";
notThisFunctionName(danishString2); // returns {total: 4, æ: 1, ø: 2, å: 1}
```

## 2. Spirit animal name generator

Let's create a page where **a user writes his name** in an input element. The user then clicks a button. The user will now **receive a spirit animal name**, e.g. Benjamin - The full moon wolf.

### 2.1. Markup time!

Create an input element, a button and a tag to display the spirit animal into.

### 2.2. Setting up the events

When the user clicks the button, get the name the user wrote in the input field.

### 2.3. Spirit animal part

Now we can get the users name, next step is to **add the spirit animal string** and display that the users name, a dash and then the spirit animal. e.g. Name: Peter: Peter - The crying butterfly
For creating the spirit animal create an array with 10 string representing spirit animals. Now get a random item in the array that will represent the spirit animal.

### 2.4. New spirit animal

Now a user tells us that he wants a new spirit animal. No problem we say. Let's create functionality where a user can press a button and then get a new spirit animal.

### 2.5. No input

What if the user clicks the generate new spirit animal and there is no text in the input?

### 2.6. Event types - _Optional and a little tricky_

Give the user the possibility to select **when the spirit animal should be created**. Should it be when the user clicks the button or when the user hovers the input field or when text is written in the input field?

How can we give a user multiple options to select from in html? Maybe time for google!

An example is: A user select that she only wants to generate a spirit animal when the input is hovered. That means that if the user writes her name in the input and clicks the button nothing happens. BUT when she hovers the input, NOW a new spirit animal is generated.

![Spirit animal](https://media.giphy.com/media/IMSq59ySKydYQ/giphy.gif)

## 3. hyfBay - get the okay'est products here

We have been **hired for a company** to do a SPA - Single Page App for them. It is a website where a user can search for products. The products can also be **filtered and sorted** based on what products the user wants to see.

We are going to be building this website step by step, so have patience :)

### 3.1. Lets get started!

In the [optional-homework/hyf-bay folder](optional-homework/hyf-bay) there is a project template you should continue working on. So copy all the files into your `hyf-homework/javascript/javascript2/week1` folder.

The `index.html` is very basic. It simply loads two javascript files and include some css. The two javascript files are `hyfBayHelpers.js` and the `main.js`. `hyfBayHelpers.js` contains a function (`getAvailableProducts`) that we can use to get an array of products. In the `main.js` we will be writing all our code!

### 3.2. Requirements

- Using the `getAvailableProducts` array we will render an html list of products
- The list should contain `title`, `price` and `rating`
- The list of products should be generated through calling a function called `renderProducts(products)`

#### Example

```js
const products = getAvailableProducts();

function renderProducts(products) {
  // your code here
}

renderProducts(products); // This should create the ul and the li's with the individual products details
```

So after calling the `renderProducts` function, the output should be like the output you can see here: <https://codesandbox.io/s/hyf-bay-first-week-oml13>

#### So how can I do that?

Here is a possible way to render the products

1. In the html create a `ul` that will contain all the products. Select that `ul` using `document.querySelector`
2. For each `product` in the `products` array:
   1. [create an `li`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
   2. Set the innerHTML of that `li` to the contain the title, price and rating
   3. [Append the `li`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) to the `ul`

## 4. Weather app

Lets create a **weather app** that based on a **users location** can find the relevant weather for that user.

If you get stuck, read up on [fetch](https://javascript.info/fetch) and [JSON](https://javascript.info/json).

### Sign up for api key

Go to <https://openweathermap.org/appid> and **sign up for an api key**. This key we will use for getting access to the weather api.

### First call to the weather api

We are going to be using the current weather api: <https://openweathermap.org/current>

To get some data from the api go to <https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=YOUR_APP_ID>, where `YOUR_APP_ID` is substituted with the key you signed up for in the first step.

If you go to the [above url](https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=YOUR_APP_ID) and see some weather json data then congrats 🎉.

If not, try and **read the error 💻** and see if you can figure out what went wrong. Or ask in the slack group :)

### Fetch weather data from a city

Create a javascript file and an html file and import the javascript file in the html file.

**Fetch weather json data** from the api using a city a user has specified: Add an **input element** and **a button** to the html. When the button is clicked, get the text from the input (which should be a city name) and fetch the relevant weather data from that city.

Remember to show some **loading text**. What if a user **writes nothing in the input?**

### Display the data

This data should be showed in your app:

- The chosen city
- Temperature
- Icon for the weather type
- Wind speed
- How cloudy it is
- When sunrise and sunset is
- _Optional_ a map showing where the city is located

You decide how the data should be displayed. You could maybe be inspired by googling for "weather app ui".

### Your feature here

Now its your time to **come up with a feature**. No matter how big or small.

### Use my current position _optional_

Investigate the [geo location api](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). Add a button to your page, clicking this button will **get the users current position**. Use that position to fetch weather data from that position.

Hint: We have to change the weather api url, so we are not using city but position. Look into the documentation!

### Save my location _optional_

Imagine if a user did not have to either write a city or click the get my position button, but could just save the location. Lets do that!

When a user has gotten a location through either the input element or the geo location api, save that location using [localstorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Localstorage is a **way to save data** even when you close the browser.

Now when loading the page and there is a city in the localstorage, use that to get the current weather.

![Man holding an umbrella against driving rain](https://media.giphy.com/media/3ohzdJlyD2InWwbJle/giphy.gif)

## 5. Giphy api

Create a site where a **user can search for any word**. When searching a word the application will **find a gif** using the **searched word** using the giphy api: <https://developers.giphy.com/docs/>
Here is how it is going to work: The user can write some text indicating the gif he is looking for, click a button and then a gif will be found (using the searched word) and the gif will be displayed to the user.

Add an input element, where the user can specify how many gif results the user wants.

Try break this problem into **smaller problems** and write down how you are going to solve the problem **BEFORE you start coding.**

If you get stuck, read up on [fetch](https://javascript.info/fetch) and [JSON](https://javascript.info/json).

![giphy search](assets/giphy-search.gif)
