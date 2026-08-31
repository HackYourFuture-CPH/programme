// monsters/Troll.js — example monster
//
// The Troll regenerates steadily but hits weakly.
// When cornered (HP < 40), it panics and switches to a big heal.

import { Monster } from "../core/monster.js";
import { HealAbility } from "../core/ability.js";

class TrollRegen extends HealAbility {
  activate(attacker, _opponent) {
    // panic heal when low — higher amount means rarer trigger (24% vs 80%)
    return attacker.hp.current < 65 ? 50 : 15;
  }

  describe(attacker, amount) {
    const panic = attacker.hp.current < 65;
    return panic
      ? `${attacker.name} desperately regenerates ${amount} HP!`
      : `${attacker.name} slowly regenerates ${amount} HP.`;
  }
}

export class Troll extends Monster {
  constructor() {
    // STAT BUDGET: 210 + 30 × 3 = 300 ✓  (max 300)
    super("Troll", 210, 30, new TrollRegen(15));
  }

  get imagePath() {
    return "assets/monsters/Troll.svg";
  }
}
