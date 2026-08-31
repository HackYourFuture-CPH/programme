// monsters/your-monster.js
// see dragon.js for a reference example

import { Monster } from "../core/monster.js";
import { DamageAbility, HealAbility, ArmorAbility } from "../core/ability.js";

// ── Step 1: write your ability ────────────────────────────────────────────────
// Extend one of the three base types. Override activate() and describe().
//
//   triggerChance = budget / amount   (higher amount = rarer trigger)
//   DamageAbility budget: 15   HealAbility budget: 12   ArmorAbility budget: 8

class MyAbility extends DamageAbility {
  // swap DamageAbility → HealAbility or ArmorAbility if you want a different effect
  activate(attacker, opponent) {
    return this.amount;
  }

  describe(attacker, amount) {
    return `${attacker.name} hits for ${amount} bonus damage!`;
  }
}

// ── Step 2: write your monster ────────────────────────────────────────────────

export class YourMonster extends Monster {
  // rename class + file to your monster's name (case-sensitive!)
  constructor() {
    // STAT BUDGET: health + attackPower * 3 must be ≤ 300
    super("YourMonster", 100, 15, new MyAbility(20));
    // pre-create extra abilities here if you want to swap in onTakeDamage:
    // this._secondAbility = new HealAbility(15);
  }

  // onTakeDamage(amount) {
  //   this.hitsTaken++;                      // track state, read in activate()
  //   // this.ability = this._secondAbility; // swap ability
  // }

  // reset() {
  //   super.reset();                  // restores original ability + charges
  //   this._secondAbility.reset();    // reset swapped ability charges too
  //   this.hitsTaken = 0;
  // }
}
