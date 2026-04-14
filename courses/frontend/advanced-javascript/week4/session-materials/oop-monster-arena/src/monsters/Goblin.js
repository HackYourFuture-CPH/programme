// monsters/Goblin.js — example monster
//
// The Goblin is a glass cannon: low HP, high attack.
// Its ability tracks hits received and grows more dangerous over time.
// After 4 hits it swaps to a debuff ability to cripple the opponent's attack.

import { Monster } from "../core/monster.js";
import { DamageAbility, ArmorAbility } from "../core/ability.js";

class GoblinStab extends DamageAbility {
  activate(attacker, _opponent) {
    // each hit received adds 4 to the next stab — trigger chance drops accordingly
    return this.amount + attacker.hitsTaken * 4;
  }

  describe(attacker, amount) {
    return `${attacker.name} stabs for ${amount} bonus damage! (${attacker.hitsTaken} hits taken)`;
  }
}

export class Goblin extends Monster {
  constructor() {
    // STAT BUDGET: 70 + 70 × 3 = 280 ✓  (max 300)
    super("Goblin", 70, 70, new GoblinStab(10));
    this.hitsTaken = 0;
    this._debuff = new ArmorAbility(12, 2); // 2-charge debuff, unlocked after 4 hits
  }

  onTakeDamage(_amount) {
    this.hitsTaken++;
    if (this.hitsTaken === 4) {
      this.ability = this._debuff;
    }
  }

  reset() {
    super.reset();
    this.hitsTaken = 0;
    this._debuff.reset();
  }

  get imagePath() {
    return "assets/monsters/Goblin.svg";
  }
}
