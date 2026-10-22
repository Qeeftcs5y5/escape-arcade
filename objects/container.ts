// Container - something the player can search once (drawer, cabinet...).

class Container extends GameObject {
    itemId: string   // "" = nothing inside
    searched: boolean

    constructor(name: string, w: number, h: number, itemId: string) {
        super(name, w, h, Colors.YELLOW)
        this.interactable = true
        this.itemId = itemId
        this.searched = false
    }

    interact(world: World, player: Player): void {
        if (this.searched) {
            console.log("[search] " + this.name + ": already searched")
            return
        }
        this.searched = true
        if (this.itemId != "") {
            world.state.addItem(this.itemId)
            console.log("[search] " + this.name + ": found " + this.itemId)
        } else {
            console.log("[search] " + this.name + ": nothing")
        }
    }
}
