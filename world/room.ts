// Room - one screen of space. Owns its GameObjects; entities refer to the
// room they're in by roomId.

class Room {
    id: string
    wallColor: number
    floorColor: number
    floorY: number
    objects: GameObject[]

    constructor(id: string, wallColor: number, floorColor: number) {
        this.id = id
        this.wallColor = wallColor
        this.floorColor = floorColor
        this.floorY = Config.FLOOR_Y
        this.objects = []
    }

    minX(): number { return Config.WALL_W }
    maxX(): number { return Config.SCREEN_W - Config.WALL_W }

    // x = left edge; y is derived from floor + elevation.
    add(obj: GameObject, x: number, elevation: number = 0): GameObject {
        obj.roomId = this.id
        obj.elevation = elevation
        obj.x = x
        obj.y = this.floorY - obj.h - elevation
        this.objects.push(obj)
        return obj
    }

    findObject(name: string): GameObject {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name == name) return this.objects[i]
        }
        return null
    }

    update(world: World, dt: number): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].update(world, dt)
        }
    }

    renderBackground(target: Image): void {
        const top = Config.HUD_H
        // back wall
        target.fillRect(0, top, Config.SCREEN_W, this.floorY - top, this.wallColor)
        // floor
        target.fillRect(0, this.floorY, Config.SCREEN_W, Config.SCREEN_H - this.floorY, this.floorColor)
        // side walls
        target.fillRect(0, top, Config.WALL_W, this.floorY - top, Colors.BLACK)
        target.fillRect(Config.SCREEN_W - Config.WALL_W, top, Config.WALL_W, this.floorY - top, Colors.BLACK)
    }

    renderObjects(target: Image): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(target)
        }
    }
}
