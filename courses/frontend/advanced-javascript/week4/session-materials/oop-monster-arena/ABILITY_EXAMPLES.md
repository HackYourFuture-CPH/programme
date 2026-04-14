# Ability Examples

A reference of ability ideas you can build from.

---

## The two rules to remember

> **Higher `amount` = lower trigger chance.** The budget is fixed, so if you return `50`, it fires ~30% of the time. If you return `10`, it fires ~100% (or 80% for HealAbility). Big swings are rare; small effects are reliable.

> **Fewer charges = higher trigger chance.** Limited-charge abilities get a budget bonus to compensate. A 1-charge ability fires up to 5× more reliably than an unlimited one at the same amount — so a single-use nuke can be near-guaranteed.

---

## Budget & trigger chance

Every ability type has a fixed **budget**. The trigger chance is calculated automatically:

```text
triggerChance = (budget × chargeMultiplier) / amount   (capped at 100%)
```

### Base budgets (unlimited / ≥ 5 charges)

| Type          | Budget | amount 8 | amount 15 | amount 20 | amount 30 | amount 50 |
| ------------- | ------ | -------- | --------- | --------- | --------- | --------- |
| DamageAbility | 15     | 100%     | 100%      | 75%       | 50%       | 30%       |
| HealAbility   | 12     | 100%     | 80%       | 60%       | 40%       | 24%       |
| ArmorAbility  | 8      | 100%     | 53%       | 40%       | 27%       | 16%       |

### Charge multiplier

Charges are part of the budget. An ability with limited charges can fire fewer times per bout, so each trigger is worth more — the budget scales up automatically.

```text
chargeMultiplier = 5 / min(charges, 5)
```

| charges | multiplier | effective DamageAbility budget |
| ------- | ---------- | ------------------------------ |
| ∞ or ≥5 | ×1.0       | 15                             |
| 3       | ×1.67      | 25                             |
| 2       | ×2.5       | 37.5                           |
| 1       | ×5.0       | 75                             |

**Examples with charges:**

- `new DamageAbility(30)` → 50% trigger, fires every turn it can (unlimited)
- `new DamageAbility(30, 3)` → **83%** trigger, fires at most 3 times
- `new DamageAbility(30, 1)` → **100%** trigger, fires exactly once (guaranteed)
- `new HealAbility(20)` → 60% trigger, unlimited
- `new HealAbility(20, 2)` → **100%** trigger, fires at most twice
- `new ArmorAbility(20)` → 40% trigger, unlimited
- `new ArmorAbility(20, 1)` → **100%** trigger, fires exactly once (guaranteed)

When `activate()` returns a **variable** amount, the charge multiplier still applies and the chance is recalculated each turn based on whatever value you return.

---

## DamageAbility

Deals extra damage to the opponent each time it triggers.

**Flat bonus** — simplest case, always hits for the same extra damage.

```text
activate() returns 20 — triggers 75% of the time.
```

**Rage** — tracks how many hits you've taken; the more damage received, the harder the next hit.

```text
activate() returns 10 + (hitsReceived × 5).
Each hit you absorb adds 5 to the next ability trigger.
describe() says "Warlord retaliates with X fury damage!"
```

**Finishing blow** — checks opponent's HP; explodes when they're low.

```text
activate() returns 50 if opponent.hp.current < 30, else 10.
When the enemy is near death, you deal a huge spike.
```

**Berserk (limited charges)** — 3 charges only, but each one hits hard.

```text
new DamageAbility(40, 3) — triggers ~63% each turn (budget ×1.67), 3 uses total.
```

---

## HealAbility

Restores HP to the attacker each time it triggers.

**Steady regeneration** — modest heal every few turns.

```text
new HealAbility(15) — heals 15 HP, triggers 80% of the time.
```

**Desperate surge** — heals more when critically low.

```text
activate() returns 40 if attacker.hp.current < 20, else 8.
Nearly dead? Panic-heal for a large burst.
```

**Vampiric strike** — heals based on how hard you attack.

```text
activate() returns attacker.attackPower / 2.
Steals life proportional to your own strength.
```

---

## ArmorAbility

Reduces the opponent's `attackPower` permanently for the rest of the bout.

**Steady debuff** — grinds down the enemy's attack over time.

```text
new ArmorAbility(5) — reduces opponent attack by 5, triggers 100% of the time.
By turn 4 the enemy hits much weaker.
```

**Intimidation (one shot)** — big one-time armor shred on first contact.

```text
new ArmorAbility(20, 1) — 1 charge, reduces attack by 20 (100% guaranteed, budget ×5).
One scary moment early that sets the tone for the whole fight.
```

---

## Ability + onTakeDamage (ability swap)

The most advanced pattern — your monster **changes ability mid-fight** when hurt.

**Cornered animal** — starts defensive, switches to offense when badly hurt.

```text
Start with a HealAbility.
In onTakeDamage(): when HP drops below 50%, swap this.ability to a DamageAbility.
describe() says "Cornered, X fights back with desperation!"
```

**Growing counter** — tracks damage taken and scales the ability accordingly.

```text
this.hitsReceived = 0
onTakeDamage() increments hitsReceived
activate() returns hitsReceived × 3
The ability grows stronger the longer the fight goes on.
```
