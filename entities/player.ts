// Player - the child. Walks with left/right, interacts with A.

class Player extends Entity {
    constructor() {
        // Child: smaller than adults.
        super("player", 8, 16, Colors.BLUE, Config.PLAYER_SPEED)
    }

    update(world: World, dt: number): void {
        const room = world.currentRoom
        this.moveX(world.input.horizontal() * this.speed * dt, room)

        if (world.input.aPressed && world.focusedObject) {
            world.focusedObject.interact(world, this)
        }
    }
}
