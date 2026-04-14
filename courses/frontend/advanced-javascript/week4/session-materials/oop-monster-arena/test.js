// test.js
//
// Quick sanity-check for your monster class.
//
// Usage:
//   npm test                          ← tests src/monsters/your-monster.js
//   npm test src/monsters/Hydra.js    ← tests your renamed file

import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Which file to test? ──
const target = process.argv[2] ?? "src/monsters/your-monster.js";
const filePath = path.resolve(__dirname, target);

// ── Output helpers ──
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

let passed = 0;
let failed = 0;

function ok(label) {
  console.log(`  ${green("✓")} ${label}`);
  passed++;
}

function fail(label, reason) {
  console.log(`  ${red("✗")} ${label}`);
  console.log(`    ${red("→")} ${reason}`);
  failed++;
}

// ── Load monster module ──
console.log(`\n${bold("Monster Arena — Test Runner")}`);
console.log(`Testing: ${yellow(target)}\n`);

let MonsterClass;
try {
  const mod = await import(filePath);
  const exports = Object.values(mod).filter((v) => typeof v === "function");
  if (exports.length === 0) {
    console.log(
      red("✗ No exported class found — did you forget `export class ...`?"),
    );
    process.exit(1);
  }
  MonsterClass = exports[0];
  ok(`File loads without syntax errors`);
} catch (err) {
  console.log(red(`✗ Failed to load ${target}:`));
  console.log(`  ${err.message}`);
  process.exit(1);
}

// ── Instantiation + stat budget ──
let monster;
try {
  monster = new MonsterClass();
  ok(`new ${MonsterClass.name}() constructs without error`);
  const score = monster.hp.max + monster.attackPower * 3;
  const abilityNote = monster.ability
    ? ` | ability: ${monster.ability.constructor.name}(${monster.ability.amount}), triggerChance: ${(monster.ability.triggerChance * 100).toFixed(0)}%`
    : " | no ability";
  ok(
    `Stat budget: ${monster.hp.max} HP + ${monster.attackPower} atk × 3 = ${score}/300${abilityNote}`,
  );
} catch (err) {
  fail(`Constructor throws an error`, err.message);
  console.log(`\n${red("Fix the error above before testing further.")}`);
  process.exit(1);
}

// ── Basic properties ──
if (typeof monster.name === "string" && monster.name.length > 0) {
  ok(`name is a non-empty string: "${monster.name}"`);
} else {
  fail(
    `name must be a non-empty string`,
    `got: ${JSON.stringify(monster.name)}`,
  );
}

if (typeof monster.attackPower === "number" && monster.attackPower >= 1) {
  ok(`attackPower is a number ≥ 1: ${monster.attackPower}`);
} else {
  fail(`attackPower must be a number ≥ 1`, `got: ${monster.attackPower}`);
}

if (monster.isAlive()) {
  ok(`isAlive() returns true at full HP`);
} else {
  fail(
    `isAlive() should return true at start`,
    `returned false — health may be 0?`,
  );
}

// ── attack() shape ──
const dummy = new MonsterClass(); // opponent
let attackResult;
try {
  attackResult = monster.attack(dummy);
  if (typeof attackResult?.damage === "number" && attackResult.damage >= 1) {
    ok(
      `attack() returns { damage: ${attackResult.damage}, special: ${JSON.stringify(attackResult.special)} }`,
    );
  } else {
    fail(
      `attack() must return { damage: number, ... }`,
      `got: ${JSON.stringify(attackResult)}`,
    );
  }
} catch (err) {
  fail(`attack() threw an error`, err.message);
}

// ── ability shape ──
monster.reset();
dummy.reset();
if (monster.ability === null) {
  ok(`ability is null (no ability injected)`);
} else {
  const { Ability } = await import(
    path.resolve(__dirname, "src/core/ability.js")
  );
  if (monster.ability instanceof Ability) {
    const chance = (monster.ability.triggerChance * 100).toFixed(0);
    ok(
      `ability is a ${monster.ability.constructor.name} instance (triggerChance: ${chance}%)`,
    );
  } else {
    fail(
      `ability must be a DamageAbility, HealAbility, or ArmorAbility`,
      `got: ${monster.ability}`,
    );
  }
  try {
    const result = monster.ability.tryActivate(monster, dummy);
    if (result === null || typeof result === "string") {
      ok(
        `ability.tryActivate() returns ${result === null ? "null (did not trigger this roll)" : `a string`}`,
      );
    } else {
      fail(
        `ability.tryActivate() must return a string or null`,
        `got: ${JSON.stringify(result)}`,
      );
    }
  } catch (err) {
    fail(`ability.tryActivate() threw an error`, err.message);
  }
}

// ── reset() restores HP ──
monster.reset();
monster.hp.takeDamage(50);
const hpBefore = monster.health;
monster.reset();
if (monster.health === monster.hp.max && monster.health > hpBefore) {
  ok(`reset() fully restores HP (${hpBefore} → ${monster.health})`);
} else if (monster.health === monster.hp.max) {
  ok(
    `reset() restores HP to max (was already full or took no damage — verify manually)`,
  );
} else {
  fail(
    `reset() did not restore HP to max`,
    `expected ${monster.hp.max}, got ${monster.health}`,
  );
}

// ── Monster can die ──
monster.reset();
const target2 = new MonsterClass();
let turns = 0;
while (target2.isAlive() && turns < 500) {
  monster.attack(target2);
  turns++;
}
if (!target2.isAlive()) {
  ok(`Monster can die (took ${turns} attacks)`);
} else {
  fail(
    `Monster never died after 500 attacks`,
    `check that takeDamage() reduces HP`,
  );
}

// ── Summary ──
console.log("");
if (failed === 0) {
  console.log(green(bold(`All ${passed} checks passed! 🎉`)));
  console.log(
    `\n${yellow("Next step:")} add your monster to src/main.js and run ${yellow("npm run dev")} to see it fight!\n`,
  );
} else {
  console.log(red(bold(`${failed} check(s) failed, ${passed} passed.`)));
  console.log(
    `\nFix the issues above, then run ${yellow("npm test")} again.\n`,
  );
  process.exit(1);
}
