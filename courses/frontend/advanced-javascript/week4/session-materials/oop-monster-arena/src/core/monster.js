/**
 * monster.js — base class every monster extends.
 *
 * ## Architecture
 * Monster uses two OOP patterns working together:
 *
 * - **Inheritance** — your monster class extends Monster and can override
 *   `onTakeDamage()`, `reset()`, and `imagePath`.
 * - **Composition** — HP is delegated to a HealthComponent (`this.hp`).
 *   Monster never touches HP directly; it calls `this.hp.heal()`,
 *   `this.hp.takeDamage()`, etc.
 *
 * ## Stat budget
 * Every monster must satisfy:
 *
 *   health + attackPower × 3 ≤ 300
 *
 * This keeps fights balanced regardless of stat distribution.
 * A monster can be tanky (high HP, low attack) or a glass cannon
 * (low HP, high attack) — the formula normalises both.
 *
 * ## Ability system
 * Pass a DamageAbility, HealAbility, or ArmorAbility to the constructor.
 * The engine calls `ability.tryActivate(this, opponent)` after every attack.
 * You do not need to call it yourself.
 *
 * ## Lifecycle
 * Each tournament bout resets all monsters to full HP via `reset()`.
 * If you store extra state (counters, swapped abilities), override `reset()`
 * and call `super.reset()` first.
 *
 * ## Quick-start example
 * ```js
 * import { Monster } from '../core/monster.js';
 * import { DamageAbility } from '../core/ability.js';
 *
 * class FireSurge extends DamageAbility {
 *   activate(attacker, opponent) { return 30; }
 *   describe(attacker, amount) { return `${attacker.name} surges for ${amount}!`; }
 * }
 *
 * export class Phoenix extends Monster {
 *   constructor() {
 *     // STAT BUDGET: 150 + 50 × 3 = 300 ✓  (max 300)
 *     super('Phoenix', 150, 50, new FireSurge(30));
 *   }
 * }
 * ```
 */

import { HealthComponent } from "./health.js";
import { Ability } from "./ability.js";

export class Monster {
  static _nextId = 0;
  /**
   * @param {string} name         Display name shown in the arena UI.
   * @param {number} health       Starting HP. Must be ≥ 10.
   * @param {number} attackPower  Base damage per normal attack. Must be ≥ 1.
   * @param {Ability|null} ability
   *   One of DamageAbility, HealAbility, or ArmorAbility — or null for no ability.
   *
   * @throws If any stat is out of range or the budget is exceeded.
   *
   * Stat budget: health + attackPower × 3 ≤ 300
   */
  constructor(name, health, attackPower, ability = null) {
    if (attackPower < 1)
      throw new Error(`[Monster] "${name}": attackPower must be ≥ 1`);
    if (health < 10)
      throw new Error(`[Monster] "${name}": health must be ≥ 10`);

    const score = health + attackPower * 3;
    if (score > 300) {
      throw new Error(
        `[Monster] "${name}" exceeds the stat budget!\n` +
          `  Score: ${health} HP + ${attackPower} attack × 3 = ${score}  (max 300)\n` +
          `  Reduce your stats by ${score - 300} point(s).\n` +
          `  Tip: each attack point costs 3 budget points; each HP costs 1.`,
      );
    }

    if (ability !== null && !(ability instanceof Ability))
      throw new Error(
        `[Monster] "${name}": ability must be a DamageAbility, HealAbility, or ArmorAbility instance`,
      );

    this.id = `monster-${Monster._nextId++}`;
    this.name = name;
    this.attackPower = attackPower;
    this._initialAttackPower = attackPower;
    this.ability = ability;
    this._initialAbility = ability;

    // COMPOSITION — HP is managed by HealthComponent, not by Monster directly.
    this.hp = new HealthComponent(health);
  }

  /** Current HP. Shorthand for `this.hp.current`. */
  get health() {
    return this.hp.current;
  }

  /** Returns true while HP > 0. */
  isAlive() {
    return this.hp.isAlive();
  }

  takeDamage(amount) {
    this.hp.takeDamage(amount);
    this.onTakeDamage(amount);
  }

  /**
   * Hook called every time this monster receives damage.
   *
   * Override to react to damage: track hit counters, swap abilities,
   * trigger rage modes, etc. Do **not** modify `attackPower` here —
   * use the `activate()` return value or swap the ability instead.
   *
   * The ability can read any state you set here via the `attacker`
   * parameter in `activate(attacker, opponent)`.
   *
   * If you swap `this.ability` inside this hook, also override `reset()`
   * to reset the swapped ability's charges.
   *
   * @param {number} amount  Damage just received (after variance, before HP clamp).
   *
   * @example
   * // Track how many times this monster has been hit
   * onTakeDamage(amount) {
   *   this.hitsTaken++;
   *   if (this.hitsTaken >= 5) this.ability = this._rageAbility;
   * }
   */
  // eslint-disable-next-line no-unused-vars
  onTakeDamage(amount) {}

  /**
   * Deals `attackPower` damage to `opponent` (±15% variance, minimum 1),
   * then gives the ability a chance to trigger.
   *
   * You do not need to call or override this method. The arena engine
   * calls it automatically each turn.
   *
   * @param {Monster} opponent
   * @returns {{ damage: number, special: string|null }}
   *   `damage` — actual HP removed from the opponent this turn.
   *   `special` — the ability's description string, or null if it did not fire.
   */
  attack(opponent) {
    const actualDamage = Math.max(
      1,
      Math.round(this.attackPower * (0.85 + Math.random() * 0.3)),
    );
    opponent.takeDamage(actualDamage);
    const usedSpecial = this.ability
      ? this.ability.tryActivate(this, opponent)
      : null;
    return { damage: actualDamage, special: usedSpecial };
  }

  /**
   * Restores this monster to its initial state for the next bout.
   *
   * The arena engine calls this automatically between bouts — you do not
   * need to call it yourself.
   *
   * Override if you store extra state (counters, swapped abilities, etc.).
   * Always call `super.reset()` first, then reset your own fields.
   *
   * Base reset restores: HP to max, `attackPower` to initial value,
   * `this.ability` to the original instance, and its charge count.
   *
   * @example
   * reset() {
   *   super.reset();                   // restores HP, attackPower, ability + charges
   *   this._rageAbility.reset();       // reset any swapped abilities too
   *   this.hitsTaken = 0;              // reset your own counters
   * }
   */
  reset() {
    this.hp.reset();
    this.attackPower = this._initialAttackPower;
    this.ability = this._initialAbility;
    if (this.ability) this.ability.reset();
  }

  /**
   * Path to the monster's image displayed in the arena UI.
   *
   * Defaults to `assets/monsters/<ClassName>.png`.
   * Override to use a different path or file format (e.g. SVG).
   *
   * @example
   * get imagePath() {
   *   return 'assets/monsters/MyMonster.svg';
   * }
   */
  get imagePath() {
    return `assets/monsters/${this.constructor.name}.png`;
  }
}
