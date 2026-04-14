# Monster Arena ⚔️

_Created by Paolo Bozzini for HackYourFuture Denmark — modified fork from [PaoloBozzini/oop-monster-arena](https://github.com/PaoloBozzini/oop-monster-arena/tree/main)._

Each group builds a custom monster. At the end of the session, **all monsters fight in a round-robin tournament** — every monster vs every other monster, once. The arena animates each battle in real time in the browser, with a live results matrix and a 1 000-simulation Monte Carlo win-rate chart.

---

## What you'll build

A JavaScript class that extends `Monster`. Your monster has:

- A **name**, **health points**, and **attack power** (you choose the numbers)
- A **special ability** — something creative that fires after each normal attack

The base `Monster` class uses a `HealthComponent` for HP management — this is an example of **composition** (has-a relationship). Your subclass is an example of **inheritance** (is-a relationship). You'll see both OOP patterns in action.

**Stat budget:** your combined score — `health + attackPower × 3` — must be ≤ 300. Attack power is more expensive than raw HP (3 pts each vs 1 pt). Dragon uses 160 HP + 30 attack × 3 = 250 pts. Exceeding the budget throws an error immediately so you can fix it fast.

---

## Your workflow

### 1. Get the project

Clone or download this project, then create your own GitHub repository and push it there:

```bash
cd oop-monster-arena
git remote set-url origin <your-new-repo-url>
git push -u origin main
npm install
```

### 2. Copy the template

```bash
cp src/monsters/your-monster.js src/monsters/YourMonsterName.js
```

Open the new file. Read `src/monsters/Dragon.js` for a full worked example, then fill in your stats and pick an ability to inject.

### 3. Add your monster's image

- Find or generate an image for your monster (Google Images, DALL·E, Midjourney…)
- The filename **must exactly match your class name** (case-sensitive!)
- If your image is a **PNG**: save it as `assets/monsters/YourMonsterName.png` — done!
- If your image is a **JPG or other format**: save it with the right extension, then add this to your class:
  ```js
  get imagePath() { return 'assets/monsters/YourMonsterName.jpg'; }
  ```

### 4. Test your monster

```bash
npm test                              # tests src/monsters/your-monster.js
npm test src/monsters/YourMonsterName.js  # tests your renamed file
```

You should see green checks for all tests. Fix anything red before moving on.

---

## What you write

Two classes in one file — an ability and a monster:

```js
// Your ability — extends one of the three base types
class MyAbility extends DamageAbility {
  activate(attacker, opponent) {
    /* return damage amount */
  }
  describe(attacker, amount) {
    /* return a log string */
  }
}

// Your monster — extends Monster, injects your ability
export class YourMonster extends Monster {
  constructor() {
    super("Name", health, attackPower, new MyAbility(amount));
  }
  onTakeDamage(amount) {
    /* optional — react when hit, swap stats or ability */
  }
}
```

## Monster hooks

| Override               | When it's called           | What to do                                   |
| ---------------------- | -------------------------- | -------------------------------------------- |
| `onTakeDamage(amount)` | Every time you take damage | Change stats, swap ability — no return value |

## Ability base types

Extend one and override `activate()`. `triggerChance` is derived automatically as `budget / amount` — you never set it directly.

| Base type       | Budget | Default effect                        |
| --------------- | ------ | ------------------------------------- |
| `DamageAbility` | 15     | `opponent.takeDamage(this.amount)`    |
| `HealAbility`   | 12     | `attacker.hp.heal(this.amount)`       |
| `ArmorAbility`  | 8      | `opponent.attackPower -= this.amount` |

Example: `new MyAbility(30)` extends `DamageAbility` → triggerChance = 15/30 = 50%.

See `ABILITY_EXAMPLES.md` for full examples including the charge system.

---

## Study guide

| File                           | Read it?                               | Edit it?                 |
| ------------------------------ | -------------------------------------- | ------------------------ |
| `src/core/health.js`           | ✅ Yes — see how **composition** works | ❌ No                    |
| `src/core/monster.js`          | ✅ Yes — understand the base class     | ❌ No                    |
| `src/core/ability.js`          | ✅ Yes — see the three ability types   | ❌ No                    |
| `src/monsters/Dragon.js`       | ✅ Yes — your **reference example**    | ❌ No                    |
| `src/monsters/your-monster.js` | ✅ Yes                                 | ✅ **This is your file** |
| `src/arena.js`                 | Optional                               | ❌ No                    |
| `src/ui.js`                    | Optional                               | ❌ No                    |

---

## Running the arena

```bash
npm install
npm run dev
```

Open the URL shown in the terminal. To add more monsters to the tournament, update `src/main.js`:

```js
// Step 1: add an import at the top
import { Hydra } from "./monsters/Hydra.js";
import { Werewolf } from "./monsters/Werewolf.js";

// Step 2: add a new instance to the array
const monsters = [new Dragon(), new Hydra(), new Werewolf()];
```

Vite hot-reloads automatically — save `main.js` and the browser updates instantly.

---

## Checklist

- [ ] Cloned/downloaded the project, created own repo, ran `npm install`
- [ ] Copied and renamed `your-monster.js`
- [ ] Renamed the class to match the filename (case-sensitive!)
- [ ] Called `super()` with name, health, attack power, and an ability (budget: `health + attackPower × 3 ≤ 300`)
- [ ] Passed a `DamageAbility`, `HealAbility`, or `ArmorAbility` as the 4th argument
- [ ] Added an image to `assets/monsters/` (exact class name as filename)
- [ ] Ran `npm test` — all checks pass
