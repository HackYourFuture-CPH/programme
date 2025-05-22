# Front End & Back End

<!--
  Key points:
  - To make our web page available, we have to have a host
  - That host needs to run some software: a web (http) server
  - The host needs whatever software _it_ runs, plus files for the client
  - Some of our code runs on the host; some of our code runs in the browser
  - This is "front end" and "back end"
-->

## A simple game

Let's say you've created a game, to be played in a web browser.

It doesn't really matter here what the game does. Maybe it's "guess what number I'm thinking of" or something. Anything.

The point is, you've made a page.

Here are the files which make up your game-page:

- index.html
- styles.css
- cat.jpg
- gameplay.js

## How can I play your game?

You've made a game; you've created those four files.

I would like to play your game! How can I do that?

1. You need a server
1. That server needs a name. e.g. `webgame.example.net`
1. You put those four files onto the server.
1. But the server isn't _doing_ anything yet. In order to become a _web_ server, which is to say an _HTTP_ server, it'll need something more. We can do that with one more bit of JavaScript, let's call it `server.js`.
1. You put `server.js` onto the server too, and run it.
1. Your game is now ready! You need to tell people the URL: `https://webgame.example.net/`
1. Because I want to play your game, I enter that URL into my web browser:
   1. The browser issues a `GET /` request, and gets sent the contents of the `index.html` file, marked as `Content-Type: text/html`
   2. My browser reads that HTML it just received, and finds references to the other three things, so it requests them, too, in the same manner:
      - `GET /styles.css`
      - `GET /cat.jpg`
      - `GET /gameplay.js`
   3. My browser then diplays the page and starts running `gameplay.js`
1. I am now happily playing your cat game.

Continue to [The Front End](../4-the-front-end/README.md)
