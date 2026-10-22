// Input - polled once per tick so every system sees the same button state.
// Note: MakeCode requires an explicit constructor when fields are initialised.

class Input {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    a: boolean
    b: boolean

    // true only on the first tick the button is held
    upPressed: boolean
    downPressed: boolean
    aPressed: boolean
    bPressed: boolean

    constructor() {
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.a = false
        this.b = false
        this.upPressed = false
        this.downPressed = false
        this.aPressed = false
        this.bPressed = false
    }

    update(): void {
        const up = controller.up.isPressed()
        const down = controller.down.isPressed()
        const a = controller.A.isPressed()
        const b = controller.B.isPressed()

        this.upPressed = up && !this.up
        this.downPressed = down && !this.down
        this.aPressed = a && !this.a
        this.bPressed = b && !this.b

        this.left = controller.left.isPressed()
        this.right = controller.right.isPressed()
        this.up = up
        this.down = down
        this.a = a
        this.b = b
    }

    // -1, 0 or 1
    horizontal(): number {
        let h = 0
        if (this.left) h -= 1
        if (this.right) h += 1
        return h
    }
}
