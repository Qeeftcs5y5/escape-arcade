// NPC - generic non-player character with a simple wander behaviour inside
// its current room. Day 2 will extend this with schedules.
// Parent and Adult are the concrete NPC types used by the story.

class NPC extends Entity {
    targetX: number      // center x it's walking to (-1 = pick a new one)
    idleTimer: number    // seconds left to stand still
    wanders: boolean

    constructor(name: string, w: number, h: number, color: number) {
        super(name, w, h, color, Config.NPC_SPEED)
        this.targetX = -1
        this.idleTimer = 0
        this.wanders = true
    }

    update(world: World, dt: number): void {
        if (!this.wanders) return
        const room = world.getRoom(this.roomId)
        if (!room) return

        if (this.idleTimer > 0) {
            this.idleTimer -= dt
            return
        }
        if (this.targetX < 0) {
            this.targetX = Math.randomRange(room.minX() + this.w, room.maxX() - this.w)
        }
        const diff = this.targetX - this.centerX()
        const step = this.speed * dt
        if (Math.abs(diff) <= step) {
            this.moveX(diff, room)
            this.targetX = -1
            this.idleTimer = Math.randomRange(10, 30) / 10   // 1.0 - 3.0 s
        } else {
            this.moveX(diff > 0 ? step : -step, room)
        }
    }

    // Teleport to another room (Day 2 schedules will use this).
    goToRoom(room: Room, centerX: number): void {
        this.placeIn(room, centerX)
        this.targetX = -1
    }
}

// The abuser. Watches the player; can be away from home.
class Parent extends NPC {
    // Escape condition 2. Day 2 schedule toggles it.
    isHome: boolean

    constructor() {
        super("parent", 10, 24, Colors.RED)
        this.watchesPlayer = true
        this.isHome = true
    }

    update(world: World, dt: number): void {
        if (!this.isHome) return
        super.update(world, dt)
    }

    render(target: Image): void {
        if (!this.isHome) return
        super.render(target)
    }
}

// Other adults (neighbour, adult in town...).
class Adult extends NPC {
    // Escape condition 4. Day 2 decides how trust is earned.
    trust: number

    constructor(name: string) {
        super(name, 10, 24, Colors.GREEN)
        this.trust = 0
    }
}
