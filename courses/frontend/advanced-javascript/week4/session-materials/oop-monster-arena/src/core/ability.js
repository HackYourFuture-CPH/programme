/**
 * ability.js — three base ability types students extend to write their own.
 *
 * ## How abilities work
 * After every normal attack, the arena engine calls `ability.tryActivate()`.
 * If the roll succeeds and charges remain, it calls `activate()` to get the
 * effect amount, applies it via `_applyEffect()`, then calls `describe()` to
 * produce the battle log entry.
 *
 * You only need to override two methods:
 * - `activate(attacker, opponent)` — return the effect amount for this turn.
 * - `describe(attacker, amount)`   — return the battle log string.
 *
 * ## Trigger chance and the budget rule
 * Each ability type has a fixed budget. Trigger chance is derived automatically:
 *
 *   triggerChance = (budget × chargeMultiplier) / amount
 *
 * A higher `amount` means a stronger hit but a rarer trigger — the trade-off
 * is built in. You never set triggerChance directly.
 *
 * ## Charges and the budget
 * Charges are part of the budget. A limited-charge ability can fire at most N times
 * per bout, so each trigger is worth more — the budget scales up to compensate.
 * The multiplier is based on a reference of 5 expected triggers per bout (what an
 * unlimited ability would fire in a typical fight):
 *
 *   chargeMultiplier = 5 / min(charges, 5)
 *
 * | charges    | multiplier | DamageAbility budget |
 * |------------|------------|----------------------|
 * | ∞ (or ≥ 5) |    ×1.0    |          15          |
 * |     3      |    ×1.67   |          25           |
 * |     2      |    ×2.5    |         37.5          |
 * |     1      |    ×5.0    |          75           |
 *
 * A single-charge DamageAbility with amount ≤ 75 is guaranteed to fire (100%).
 * A 2-charge HealAbility at amount 30 now has 75% trigger chance instead of 40%.
 *
 * | Type          | Budget | amount 10 | amount 20 | amount 30 |
 * |---------------|--------|-----------|-----------|-----------|
 * | DamageAbility |   15   |   100%    |    75%    |    50%    |
 * | HealAbility   |   12   |   100%    |    60%    |    40%    |
 * | ArmorAbility  |    8   |    80%    |    40%    |    27%    |
 * (table above shows unlimited / ≥ 5 charges; finite charges raise all percentages)
 *
 * ## Charges (optional)
 * Pass a second argument to limit how many times the ability can fire per bout.
 * Omit it (or pass `Infinity`) for unlimited uses.
 *
 * ```js
 * new DamageAbility(40, 2)   // 2 charges → budget ×2.5 → 93% trigger chance
 * new DamageAbility(40)      // unlimited → budget ×1   → 37% trigger chance
 * new HealAbility(20)        // unlimited uses, 60% trigger
 * ```
 *
 * ## Dynamic amount
 * `activate()` can return a different amount each turn based on game state.
 * Trigger chance is recalculated live from whatever value you return.
 *
 * ```js
 * activate(attacker, opponent) {
 *   // grows stronger the more hits the attacker has taken
 *   return this.amount + attacker.hitsTaken * 5;
 * }
 * ```
 *
 * ## Quick-start example
 * ```js
 * import { DamageAbility } from '../core/ability.js';
 *
 * class VenomStrike extends DamageAbility {
 *   activate(attacker, opponent) {
 *     return 25; // fixed 25 damage → triggerChance = 15/25 = 60%
 *   }
 *   describe(attacker, amount) {
 *     return `${attacker.name} injects venom for ${amount} damage!`;
 *   }
 * }
 * ```
 */

export class Ability {
  /**
   * @param {number} amount
   *   The base effect amount (damage dealt, HP healed, or attack reduced).
   *   Must be a positive integer. Controls trigger chance: higher = rarer.
   * @param {number} [charges=Infinity]
   *   Maximum number of times this ability can fire per bout.
   *   Use a positive integer to limit uses; omit for unlimited.
   */
  constructor(amount, charges = Infinity) {
    if (!Number.isInteger(amount) || amount < 1)
      throw new Error(
        `[Ability] amount must be an integer ≥ 1. Got: ${amount}`,
      );
    if (charges !== Infinity && (!Number.isInteger(charges) || charges < 1))
      throw new Error(
        `[Ability] charges must be a positive integer. Got: ${charges}`,
      );

    /** Base effect amount. Readable in `activate()` as `this.amount`. */
    this.amount = amount;
    /** Maximum charges per bout (`Infinity` = unlimited). */
    this.chargesMax = charges;
    /** Charges remaining this bout. Decrements on each successful trigger. */
    this.chargesLeft = charges;
  }

  /** @protected Budget constant — overridden by each concrete subclass. */
  get _budget() {
    return 15;
  }

  /**
   * Budget multiplier derived from charge count.
   *
   * Limited-charge abilities fire fewer times per bout, so each trigger is
   * worth more. The multiplier scales the budget up to compensate, using 5
   * expected triggers as the reference for an unlimited ability:
   *
   *   chargeMultiplier = 5 / min(charges, 5)
   *
   * Abilities with ≥ 5 charges (or ∞) receive no bonus (multiplier = 1).
   *
   * @protected
   */
  get _chargeMultiplier() {
    const reference = 5;
    const effective =
      this.chargesMax === Infinity
        ? reference
        : Math.min(this.chargesMax, reference);
    return reference / effective;
  }

  /**
   * Probability that this ability fires on any given turn (0–1).
   * Derived automatically from the budget, charge multiplier, and the amount
   * returned by `activate()`. You never set this directly.
   */
  get triggerChance() {
    return Math.min(1, (this._budget * this._chargeMultiplier) / this.amount);
  }

  /**
   * Override — return the effect amount to apply this turn.
   *
   * The engine calls this before the trigger roll so it can recalculate
   * the chance from whatever value you return. Return a higher value for
   * a stronger but rarer trigger; return a lower value for a weaker but
   * more frequent one.
   *
   * You have full access to both monsters' state here.
   *
   * @param {Monster} attacker  The monster using this ability.
   * @param {Monster} opponent  The monster being targeted.
   * @returns {number} A positive integer — the effect amount for this turn.
   *
   * @example
   * // Scales with hits taken — gets stronger (and rarer) as the fight goes on
   * activate(attacker, opponent) {
   *   return this.amount + attacker.hitsTaken * 4;
   * }
   */
  activate(attacker, opponent) {
    return this.amount;
  }

  /**
   * Override — return the battle log string shown when the ability fires.
   *
   * Called only after the trigger roll succeeds and the effect has been applied.
   * The `amount` parameter is the exact value returned by `activate()` this turn,
   * so your message can reflect dynamic values.
   *
   * @param {Monster} attacker  The monster that used the ability.
   * @param {number}  amount    The effect amount applied this turn.
   * @returns {string} A short, flavourful description for the battle log.
   *
   * @example
   * describe(attacker, amount) {
   *   const fury = attacker.hitsTaken >= 3 ? ' ENRAGED' : '';
   *   return `${attacker.name}${fury} strikes for ${amount} bonus damage!`;
   * }
   */
  describe(attacker, amount) {
    return null;
  }

  /** @protected Applies the effect. Overridden by each concrete subclass. */
  _applyEffect(attacker, opponent, amount) {}

  /**
   * Called by the engine after every attack. Handles the trigger roll,
   * charge tracking, and effect application. Do not call or override this.
   *
   * @param {Monster} attacker
   * @param {Monster} opponent
   * @returns {string|null} The battle log string, or null if the ability did not fire.
   */
  tryActivate(attacker, opponent) {
    if (this.chargesLeft <= 0) return null;

    const amount = this.activate(attacker, opponent);
    if (!Number.isInteger(amount) || amount < 1)
      throw new Error(
        `[Ability] activate() must return an integer ≥ 1. Got: ${amount}`,
      );

    // triggerChance × amount = budget × chargeMultiplier (always)
    const chance = Math.min(
      1,
      (this._budget * this._chargeMultiplier) / amount,
    );
    if (Math.random() > chance) return null;

    if (this.chargesMax !== Infinity) this.chargesLeft--;
    this._applyEffect(attacker, opponent, amount);
    return this.describe(attacker, amount);
  }

  /**
   * Resets `chargesLeft` to `chargesMax`. Called automatically by
   * `Monster.reset()` between bouts — you do not need to call this yourself
   * unless you have swapped abilities (see Monster.reset() docs).
   */
  reset() {
    this.chargesLeft = this.chargesMax;
  }
}

// ── Concrete base types ───────────────────────────────────────────────────────
//
// Extend one of these three. Override activate() and describe().
// The _budget and _applyEffect() are already set correctly for each type.

/**
 * Deals bonus damage to the opponent.
 *
 * Budget: 15
 * Default describe: "[Name] deals N bonus damage!"
 *
 * @example
 * class FireBlast extends DamageAbility {
 *   activate(attacker, opponent) { return 40; } // 40 dmg → 37% trigger
 *   describe(attacker, amount) { return `${attacker.name} blasts for ${amount}!`; }
 * }
 */
export class DamageAbility extends Ability {
  get _budget() {
    return 15;
  }
  _applyEffect(attacker, opponent, amount) {
    opponent.takeDamage(amount);
  }
  describe(attacker, amount) {
    const note =
      this.chargesMax !== Infinity ? ` (${this.chargesLeft} charges left)` : "";
    return `${attacker.name} deals ${amount} bonus damage${note}!`;
  }
}

/**
 * Heals the attacker (self-heal).
 *
 * Budget: 12
 * Default describe: "[Name] heals N HP!"
 *
 * Healing cannot exceed max HP — HealthComponent clamps automatically.
 *
 * @example
 * class Regenerate extends HealAbility {
 *   activate(attacker, opponent) { return 20; } // 20 HP → 60% trigger
 *   describe(attacker, amount) { return `${attacker.name} regenerates ${amount} HP.`; }
 * }
 */
export class HealAbility extends Ability {
  get _budget() {
    return 12;
  }
  _applyEffect(attacker, opponent, amount) {
    attacker.hp.heal(amount);
  }
  describe(attacker, amount) {
    const note =
      this.chargesMax !== Infinity ? ` (${this.chargesLeft} charges left)` : "";
    return `${attacker.name} heals ${amount} HP${note}!`;
  }
}

/**
 * Reduces the opponent's `attackPower` for the remainder of the bout.
 *
 * Budget: 8
 * Default describe: "[Name] reduces opponent's attack by N!"
 *
 * `attackPower` is clamped to a minimum of 1 so the opponent can always deal
 * at least 1 damage. The debuff is automatically reversed at the start of
 * the next bout when `Monster.reset()` restores the original `attackPower`.
 *
 * @example
 * class Weaken extends ArmorAbility {
 *   activate(attacker, opponent) { return 12; } // -12 atk → 67% trigger
 *   describe(attacker, amount) { return `${attacker.name} weakens the foe by ${amount}!`; }
 * }
 */
export class ArmorAbility extends Ability {
  get _budget() {
    return 8;
  }
  _applyEffect(attacker, opponent, amount) {
    // Monster.reset() restores attackPower to its initial value between bouts.
    opponent.attackPower = Math.max(1, opponent.attackPower - amount);
  }
  describe(attacker, amount) {
    const note =
      this.chargesMax !== Infinity ? ` (${this.chargesLeft} charges left)` : "";
    return `${attacker.name} reduces opponent's attack by ${amount}${note}!`;
  }
}
