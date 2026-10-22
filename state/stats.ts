// Player stats: suspicion, health, mental. All 0..100.
// Day 1 only defines ranges, thresholds and the passive suspicion decay.
// Rules that react to thresholds (punishment, endings) are Day 2.

namespace StatRules {
    export const MIN = 0
    export const MAX = 100

    export const START_SUSPICION = 0
    export const START_HEALTH = 100
    export const START_MENTAL = 100

    // Suspicion naturally drops over time. Per second.
    export const SUSPICION_DECAY = 0.5

    export const PUNISH_AT_SUSPICION = 100   // -> punishment
    export const DEATH_AT = 0                // health or mental -> ending 1
}

class Stats {
    suspicion: number
    health: number
    mental: number

    constructor() {
        this.suspicion = StatRules.START_SUSPICION
        this.health = StatRules.START_HEALTH
        this.mental = StatRules.START_MENTAL
    }

    addSuspicion(v: number): void {
        this.suspicion = clamp(this.suspicion + v, StatRules.MIN, StatRules.MAX)
    }
    addHealth(v: number): void {
        this.health = clamp(this.health + v, StatRules.MIN, StatRules.MAX)
    }
    addMental(v: number): void {
        this.mental = clamp(this.mental + v, StatRules.MIN, StatRules.MAX)
    }

    shouldPunish(): boolean {
        return this.suspicion >= StatRules.PUNISH_AT_SUSPICION
    }
    isBroken(): boolean {
        return this.health <= StatRules.DEATH_AT || this.mental <= StatRules.DEATH_AT
    }

    update(dt: number): void {
        this.addSuspicion(-StatRules.SUSPICION_DECAY * dt)
    }
}
