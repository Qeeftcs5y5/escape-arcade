// Global tunables, palette names and tiny helpers.
// Every other file may depend on this one; it depends on nothing.

namespace Config {
    export const SCREEN_W = 160
    export const SCREEN_H = 120
    // Top band reserved for the Day 2 HUD (stat bars, clock).
    export const HUD_H = 16
    // y coordinate of the floor surface; everything stands on it.
    export const FLOOR_Y = 104
    export const WALL_W = 4
    // Clamp frame time so a lag spike can't teleport things through walls.
    export const MAX_DT_MS = 100

    export const PLAYER_SPEED = 40   // px per second
    export const NPC_SPEED = 25      // px per second
    // Max horizontal gap (px) between player and object to allow interaction.
    export const INTERACT_RANGE = 6

    // One in-game day in real milliseconds (real-time clock).
    export const DAY_LENGTH_MS = 180000
}

// MakeCode Arcade default palette indices.
namespace Colors {
    export const WHITE = 1
    export const RED = 2
    export const PINK = 3
    export const ORANGE = 4
    export const YELLOW = 5
    export const TEAL = 6
    export const GREEN = 7
    export const BLUE = 8
    export const LIGHT_BLUE = 9
    export const PURPLE = 10
    export const LIGHT_PURPLE = 11
    export const DARK_PURPLE = 12
    export const TAN = 13
    export const BROWN = 14
    export const BLACK = 15
}

function clamp(v: number, lo: number, hi: number): number {
    if (v < lo) return lo
    if (v > hi) return hi
    return v
}

let nextUid = 1
function newUid(): number {
    return nextUid++
}
