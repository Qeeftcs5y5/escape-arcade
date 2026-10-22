// Real-time day clock. One day = Config.DAY_LENGTH_MS of real time,
// split into four phases.

enum DayPhase {
    Morning,
    Afternoon,
    Evening,
    Night
}

class Clock {
    day: number
    timeMs: number   // time into the current day

    constructor() {
        this.day = 1
        this.timeMs = 0
    }

    // 0..1 progress through the day
    progress(): number {
        return this.timeMs / Config.DAY_LENGTH_MS
    }

    phase(): DayPhase {
        const p = this.progress()
        if (p < 0.3) return DayPhase.Morning
        if (p < 0.6) return DayPhase.Afternoon
        if (p < 0.85) return DayPhase.Evening
        return DayPhase.Night
    }

    // Returns true on the tick a new day starts.
    update(dt: number): boolean {
        this.timeMs += dt * 1000
        if (this.timeMs >= Config.DAY_LENGTH_MS) {
            this.timeMs -= Config.DAY_LENGTH_MS
            this.day++
            return true
        }
        return false
    }
}
