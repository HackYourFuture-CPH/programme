// monsters/dragon.js
//
// ── REFERENCE EXAMPLE — read this, then write your own in monsters/your-monster.js ──
//
// What to notice:
//   1. Two classes in one file: an Ability subclass + a Monster subclass
//   2. DragonBreath extends DamageAbility        (INHERITANCE on the ability side)
//   3. Dragon extends Monster                    (INHERITANCE on the monster side)
//   4. Dragon HAS-A DragonBreath                 (COMPOSITION)
//   5. DragonBreath is injected, not created inside Monster (DEPENDENCY INJECTION)
//   6. activate() returns more when enraged — triggerChance drops automatically
//   7. onTakeDamage() tracks Monster state; activate() reads it via `attacker`

import { Monster } from "../core/monster.js";
import { DamageAbility } from "../core/ability.js";

class DragonBreath extends DamageAbility {
  activate(attacker, opponent) {
    return attacker.hitsTaken >= 3
      ? Math.ceil(this.amount * 1.5) // enraged: bigger hit, rarer trigger
      : this.amount;
  }

  describe(attacker, amount) {
    const tag = attacker.hitsTaken >= 3 ? " 💢 ENRAGED" : "";
    const note =
      this.chargesMax !== Infinity ? ` (${this.chargesLeft} charges left)` : "";
    return `🔥 ${attacker.name}${tag} breathes fire for ${amount} bonus damage${note}!`;
  }
}

export class Dragon extends Monster {
  constructor() {
    // DragonBreath(35, 3): base amount 35, 3 charges → chargeMultiplier = 5/3 ≈ 1.67
    // Normal  triggerChance = (15 × 1.67) / 35 = 71%
    // Enraged triggerChance = (15 × 1.67) / 53 = 47%  (Math.ceil(35 × 1.5) = 53)
    //
    // STAT BUDGET: 160 + 30 × 3 = 250 ✓  (max 300)
    super("Dragon", 160, 30, new DragonBreath(35, 3));
    this.hitsTaken = 0;
  }

  onTakeDamage(amount) {
    this.hitsTaken++;
  }

  reset() {
    super.reset();
    this.hitsTaken = 0;
  }

  get imagePath() {
    return "assets/monsters/Dragon.svg";
  }
}
