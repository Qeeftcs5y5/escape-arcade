// GameObject - base class for static things in a room (furniture, doors,
// containers). They don't move by themselves; the player can interact with
// the ones marked interactable.

class GameObject extends Box {
    interactable: boolean
    // Height above the floor (0 = standing on the floor, >0 = wall-mounted).
    elevation: number
    // Set by World each tick when this is the player's interaction target.
    focused: boolean

    constructor(name: string, w: number, h: number, color: number) {
        super(name, w, h, color)
        this.interactable = false
        this.elevation = 0
        this.focused = false
    }

    // Override: what happens when the player presses A next to this object.
    interact(world: World, player: Player): void { }

    render(target: Image): void {
        super.render(target)
        if (this.visible && this.focused) {
            // 1px white outline marks the current interaction target.
            target.drawRect(Math.round(this.x) - 1, Math.round(this.y) - 1,
                this.w + 2, this.h + 2, Colors.WHITE)
        }
    }
}

// Plain furniture: bed, sofa, table... decoration only.
class Furniture extends GameObject {
    constructor(name: string, w: number, h: number, color: number) {
        super(name, w, h, color)
    }
}
