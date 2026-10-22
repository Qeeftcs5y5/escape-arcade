// Entry point: build the world and drive the main loop.
// Each frame: compute dt -> world.tick(dt); the renderable draws world.render().

const world = buildTestWorld()

scene.createRenderable(0, function (target: Image, camera: scene.Camera) {
    world.render(target)
})

let lastTickMs = game.runtime()
game.onUpdate(function () {
    const now = game.runtime()
    let dtMs = now - lastTickMs
    lastTickMs = now
    if (dtMs > Config.MAX_DT_MS) dtMs = Config.MAX_DT_MS
    world.tick(dtMs / 1000)
})
