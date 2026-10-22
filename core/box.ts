// Box - common base for anything with a position, size and colour.
// Both GameObject (static things) and Entity (moving things) extend it.
// x, y are the top-left corner in screen pixels.

class Box {
    uid: number
    name: string
    x: number
    y: number
    w: number
    h: number
    color: number
    roomId: string
    visible: boolean

    constructor(name: string, w: number, h: number, color: number) {
        this.uid = newUid()
        this.name = name
        this.x = 0
        this.y = 0
        this.w = w
        this.h = h
        this.color = color
        this.roomId = ""
        this.visible = true
    }

    left(): number { return this.x }
    right(): number { return this.x + this.w }
    top(): number { return this.y }
    bottom(): number { return this.y + this.h }
    centerX(): number { return this.x + this.w / 2 }

    // Horizontal gap between the two boxes; 0 when they overlap on x.
    gapX(other: Box): number {
        if (this.right() < other.left()) return other.left() - this.right()
        if (other.right() < this.left()) return this.left() - other.right()
        return 0
    }

    overlaps(other: Box): boolean {
        return this.left() < other.right() && other.left() < this.right()
            && this.top() < other.bottom() && other.top() < this.bottom()
    }

    // Override in subclasses. dt is in seconds.
    update(world: World, dt: number): void { }

    render(target: Image): void {
        if (!this.visible) return
        target.fillRect(Math.round(this.x), Math.round(this.y), this.w, this.h, this.color)
    }
}
