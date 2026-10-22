// GameState - everything about the run that isn't spatial:
// stats, clock, inventory and story flags.

class GameState {
    stats: Stats
    clock: Clock
    inventory: string[]
    flags: string[]   // story flags set by events (Day 2)

    constructor() {
        this.stats = new Stats()
        this.clock = new Clock()
        this.inventory = []
        this.flags = []
    }

    hasItem(id: string): boolean { return this.inventory.indexOf(id) >= 0 }
    addItem(id: string): void {
        if (!this.hasItem(id)) this.inventory.push(id)
    }
    removeItem(id: string): void {
        const i = this.inventory.indexOf(id)
        if (i >= 0) this.inventory.removeAt(i)
    }

    hasFlag(f: string): boolean { return this.flags.indexOf(f) >= 0 }
    setFlag(f: string): void {
        if (!this.hasFlag(f)) this.flags.push(f)
    }
}
