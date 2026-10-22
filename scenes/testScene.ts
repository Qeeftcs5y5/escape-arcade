// Day 1 test scene. Replaced by the real house/town on Day 2.
//
//   [bedroom] <-> [hallway] <-> [living]
//                     |
//                 back door (locked, needs spare_key) -> [yard]

function buildTestWorld(): World {
    const w = new World()

    const bedroom = w.addRoom(new Room("bedroom", Colors.LIGHT_PURPLE, Colors.BROWN))
    bedroom.add(new Furniture("bed", 36, 12, Colors.PINK), 10)
    bedroom.add(new Container("desk_drawer", 16, 14, ""), 60)
    bedroom.add(new Door("bedroom_door", "hallway", "hall_to_bedroom"), 140)

    const hallway = w.addRoom(new Room("hallway", Colors.TAN, Colors.BROWN))
    hallway.add(new Door("hall_to_bedroom", "bedroom", "bedroom_door"), 8)
    hallway.add(new Furniture("picture", 14, 10, Colors.ORANGE), 40, 30)
    const backDoor = hallway.add(new Door("back_door", "yard", "yard_door"), 74) as Door
    backDoor.locked = true
    backDoor.requiredItem = "spare_key"
    backDoor.color = Colors.DARK_PURPLE
    hallway.add(new Door("hall_to_living", "living", "living_door"), 140)

    const living = w.addRoom(new Room("living", Colors.LIGHT_BLUE, Colors.BROWN))
    living.add(new Door("living_door", "hallway", "hall_to_living"), 8)
    living.add(new Furniture("sofa", 40, 14, Colors.PURPLE), 40)
    living.add(new Container("cabinet", 14, 22, "spare_key"), 120)

    const yard = w.addRoom(new Room("yard", Colors.TEAL, Colors.GREEN))
    yard.add(new Door("yard_door", "hallway", "back_door"), 20)

    w.addNPC(new Parent(), "living", 80)

    w.enterRoom("bedroom", 30)
    return w
}
