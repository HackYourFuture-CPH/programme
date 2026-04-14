// index.js
//
// Entry point — import all monster classes and kick off the tournament.
// To add your monster: import it here and add an instance to the array below.
// Pattern: import { ClassName } from './monsters/ClassName.js';

import { Dragon } from "./monsters/Dragon.js";
import { Goblin } from "./monsters/Goblin.js";
import { Troll } from "./monsters/Troll.js";

import { tournament, cancelTournament, monteCarlo } from "./arena.js";
import "./ui.js"; // registers all DOM event listeners
import "./style.css";

// Add a new instance here for each monster you want in the tournament.
const monsters = [
  new Dragon(),
  new Goblin(),
  new Troll(),
  // new YourMonster(),
];

// Populate the start screen roster, then run Monte Carlo in the background.
document.dispatchEvent(
  new CustomEvent("arena:roster", {
    detail: monsters.map((m) => ({ id: m.id, name: m.name })),
  }),
);

setTimeout(() => {
  const results = monteCarlo(monsters, 1000);
  document.dispatchEvent(
    new CustomEvent("arena:montecarlo", { detail: results }),
  );
}, 0);

window.startTournament = () => {
  cancelTournament();
  tournament(monsters);
};
