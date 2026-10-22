# Escape (Design Ci prototype)

Side-view 2D game for MakeCode Arcade, written in TypeScript.
One room = one screen; characters walk left/right; rooms connect through doors.
Everything is drawn as plain coloured rectangles for now.

## Running in the MakeCode web editor

```
python3 tools/bundle.py
```

This writes `dist/main.ts` (all source files concatenated in `pxt.json` order).
Open https://arcade.makecode.com, create a new project, switch to **JavaScript**,
replace everything with the contents of `dist/main.ts`, and press play.

Edit the source files, never `dist/main.ts`.

## Source layout

Files load in the order listed in `pxt.json`; a file may only rely at load time
on files listed before it.

| File | Contents |
|---|---|
| `core/config.ts` | `Config` tunables, `Colors` palette names, `clamp`, `newUid` |
| `core/input.ts` | `Input`: per-tick button state, `aPressed` etc. fire once per press |
| `core/box.ts` | `Box`: shared base: position, size, colour, rectangle render |
| `objects/gameObject.ts` | `GameObject` (static things, base class) and `Furniture` |
| `objects/door.ts` | `Door`: leads to another room; optional lock + key item |
| `objects/container.ts` | `Container`: searchable once, may give an item |
| `entities/entity.ts` | `Entity` (moving things, base class): walking, room placement |
| `entities/player.ts` | `Player`: left/right to walk, A to interact |
| `entities/npc.ts` | `NPC` (wander AI), `Parent`, `Adult` |
| `world/room.ts` | `Room`: one screen; holds objects, draws walls/floor |
| `state/stats.ts` | `StatRules` constants and `Stats` (suspicion / health / mental) |
| `state/clock.ts` | `Clock` and `DayPhase`: real-time day cycle |
| `state/gameState.ts` | `GameState`: stats + clock + inventory + story flags |
| `world/world.ts` | `World`: owns everything; `tick()` and `render()` |
| `scenes/testScene.ts` | Day 1 test map |
| `main.ts` | Entry point: builds the world, runs the main loop |

## Class hierarchy

```
Box
├── GameObject ── Furniture, Door, Container
└── Entity ────── Player
                  NPC ── Parent, Adult
```

## Tick order (`World.tick`)

input → clock / stats → NPCs → room objects → interaction focus → player → rules (Day 2)

## Gotcha

MakeCode TypeScript does not allow field initialisers (`x = 0` on a field)
unless the class has an explicit constructor. Assign fields in the constructor.
