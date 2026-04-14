// health.js — manages a monster's hit points.
// Example of COMPOSITION: Monster delegates all HP logic to this object.

export class HealthComponent {
  /** @param {number} maxHealth */
  constructor(maxHealth) {
    if (typeof maxHealth !== "number" || maxHealth < 0)
      throw new Error(
        `HealthComponent: maxHealth must be a non-negative number, got ${maxHealth}`,
      );
    this._max = maxHealth;
    this._current = maxHealth;
  }

  get current() {
    return this._current;
  }
  get max() {
    return this._max;
  }

  /** HP as a percentage 0–100 (used by the UI to set health bar widths). */
  get percentage() {
    if (this._max === 0) return 0;
    return Math.round((this._current / this._max) * 100);
  }

  /** @param {number} amount */
  takeDamage(amount) {
    this._current = Math.max(0, this._current - amount);
  }

  /** @param {number} amount */
  heal(amount) {
    this._current = Math.min(this._max, this._current + amount);
  }

  isAlive() {
    return this._current > 0;
  }

  reset() {
    this._current = this._max;
  }
}
