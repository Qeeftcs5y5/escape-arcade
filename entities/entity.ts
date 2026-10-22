// Entity - base class for things that move and act (player, NPCs).
// Entities only walk left/right and always stand on the room floor.

class Entity extends Box {
    speed: number      // px per second
    facing: number     // -1 left, 1 right
    // Whether this entity counts as "watching" the player: risky actions
    // get caught if a watcher is in the same room.
    watchesPlayer: boolean

    constructor(name: string, w: number, h: number, color: number, speed: number) {
        super(name, w, h, color)
        this.speed = speed
        this.facing = 1
        this.watchesPlayer = false
    }

    // Move horizontally, staying inside the room's walls.
    // Returns the distance actually moved.
    moveX(dx: number, room: Room): number {
        if (dx > 0) this.facing = 1
        else if (dx < 0) this.facing = -1
        const oldX = this.x
        this.x = clamp(this.x + dx, room.minX(), room.maxX() - this.w)
        return this.x - oldX
    }

    // Put the entity on the floor of a room at a given center x.
    placeIn(room: Room, centerX: number): void {
        this.roomId = room.id
        this.y = room.floorY - this.h
        this.x = clamp(centerX - this.w / 2, room.minX(), room.maxX() - this.w)
    }
}
