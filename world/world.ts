// World - owns all rooms, entities and game state.
//   tick():   input -> clock/stats -> NPCs -> room objects -> focus -> player -> rules
//   render(): draws the current room only.

class World {
    input: Input
    state: GameState
    rooms: Room[]
    currentRoom: Room
    player: Player
    npcs: NPC[]
    focusedObject: GameObject
    // Day 2 dialogs/menus set this to freeze gameplay.
    paused: boolean

    constructor() {
        this.input = new Input()
        this.state = new GameState()
        this.rooms = []
        this.currentRoom = null
        this.player = new Player()
        this.npcs = []
        this.focusedObject = null
        this.paused = false
    }

    // ---- setup ----

    addRoom(room: Room): Room {
        this.rooms.push(room)
        return room
    }

    getRoom(id: string): Room {
        for (let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id == id) return this.rooms[i]
        }
        return null
    }

    addNPC(npc: NPC, roomId: string, centerX: number): NPC {
        npc.placeIn(this.getRoom(roomId), centerX)
        this.npcs.push(npc)
        return npc
    }

    // ---- room changes ----

    enterRoom(roomId: string, centerX: number): void {
        const room = this.getRoom(roomId)
        if (!room) {
            console.log("[world] missing room: " + roomId)
            return
        }
        this.currentRoom = room
        this.player.placeIn(room, centerX)
        this.focusedObject = null
        console.log("[world] entered " + roomId)
    }

    movePlayerThroughDoor(door: Door): void {
        const target = this.getRoom(door.targetRoomId)
        if (!target) {
            console.log("[world] missing room: " + door.targetRoomId)
            return
        }
        const arrival = target.findObject(door.targetDoorName)
        const x = arrival ? arrival.centerX() : Config.SCREEN_W / 2
        this.enterRoom(target.id, x)
    }

    // ---- queries used by Day 2 rules ----

    // Player is "watched" if a watcher NPC is in the same room.
    isPlayerWatched(): boolean {
        for (let i = 0; i < this.npcs.length; i++) {
            const n = this.npcs[i]
            if (n.watchesPlayer && n.roomId == this.player.roomId) {
                if (n instanceof Parent && !(n as Parent).isHome) continue
                return true
            }
        }
        return false
    }

    npcsInRoom(roomId: string): NPC[] {
        const out: NPC[] = []
        for (let i = 0; i < this.npcs.length; i++) {
            if (this.npcs[i].roomId == roomId) out.push(this.npcs[i])
        }
        return out
    }

    // ---- tick ----

    tick(dt: number): void {
        this.input.update()
        if (this.paused) return

        if (this.state.clock.update(dt)) {
            this.onNewDay()
        }
        this.state.stats.update(dt)

        // All NPCs update, even in other rooms, so the house keeps living.
        for (let i = 0; i < this.npcs.length; i++) {
            this.npcs[i].update(this, dt)
        }
        this.currentRoom.update(this, dt)

        // Focus must be computed before the player acts on A.
        this.updateFocus()
        this.player.update(this, dt)

        this.checkRules()
    }

    updateFocus(): void {
        if (this.focusedObject) this.focusedObject.focused = false
        this.focusedObject = null

        let best: GameObject = null
        let bestDist = 9999
        const objs = this.currentRoom.objects
        for (let i = 0; i < objs.length; i++) {
            const o = objs[i]
            if (!o.interactable || !o.visible) continue
            if (this.player.gapX(o) > Config.INTERACT_RANGE) continue
            const d = Math.abs(o.centerX() - this.player.centerX())
            if (d < bestDist) {
                bestDist = d
                best = o
            }
        }
        if (best) {
            best.focused = true
            this.focusedObject = best
        }
    }

    // Day 2: punishment, endings, events.
    checkRules(): void { }

    // Day 2: daily events, parent schedule reset, etc.
    onNewDay(): void {
        console.log("[clock] day " + this.state.clock.day)
    }

    // ---- render ----

    render(target: Image): void {
        target.fill(Colors.BLACK)   // HUD band stays black until Day 2
        if (!this.currentRoom) return

        this.currentRoom.renderBackground(target)
        this.currentRoom.renderObjects(target)
        for (let i = 0; i < this.npcs.length; i++) {
            if (this.npcs[i].roomId == this.currentRoom.id) this.npcs[i].render(target)
        }
        this.player.render(target)
    }
}
