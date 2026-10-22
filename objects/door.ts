// Door (or stairs) leading to another room.
// The player arrives in front of the door named targetDoorName in targetRoomId.

class Door extends GameObject {
    targetRoomId: string
    targetDoorName: string
    locked: boolean
    // Item that unlocks the door ("" = none). Whether it's consumed: Day 2.
    requiredItem: string

    constructor(name: string, targetRoomId: string, targetDoorName: string) {
        super(name, 12, 28, Colors.BROWN)
        this.interactable = true
        this.targetRoomId = targetRoomId
        this.targetDoorName = targetDoorName
        this.locked = false
        this.requiredItem = ""
    }

    interact(world: World, player: Player): void {
        if (this.locked) {
            if (this.requiredItem != "" && world.state.hasItem(this.requiredItem)) {
                this.locked = false
                console.log("[door] " + this.name + " unlocked with " + this.requiredItem)
            } else {
                console.log("[door] " + this.name + " is locked")
                return
            }
        }
        world.movePlayerThroughDoor(this)
    }
}
