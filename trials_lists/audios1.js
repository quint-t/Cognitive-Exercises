function getAudios1() {
    return JSON.parse(`
{
    "Animals": {
        "Arctic animals": ["Arctic fox", "Arctic wolf", "Beluga", "Fur seal", "Muskox", "Narwhal", "Orca, killer whale", "Owl", "Penguin", "Polar bear", "Seal", "Walrus", "Whale"],
        "Domestic animals": ["Canary", "Cat", "Chinchilla", "Dog", "Fish", "Guinea pig", "Hamster", "Mouse", "Parrot"],
        "Farm animals": ["Bee", "Bull", "Camel", "Cow", "Coypu", "Donkey", "Goat", "Horse", "Lama", "Pig", "Pony", "Rabbit", "Sheep"],
        "Forest animals": ["Badger", "Bear", "Bison", "Boar", "Buffalo", "Chipmunk", "Coyote", "Deer", "Ferret", "Fox", "Frog", "Hare", "Hedgehog", "Lynx", "Marmot", "Mole", "Moose", "Raccoon", "Skunk", "Sloth", "Squirrel", "Wolf", "Wolverine"],
        "Insects": ["Bee", "Bumblebee", "Dragonfly", "Fly", "Grasshopper", "Hornet", "Mosquito", "Wasp"],
        "Jungle animals": ["Cheetah", "Chimpanzee", "Crocodile", "Elephant", "Gibbon", "Giraffe", "Gorilla", "Hippopotamus", "Hyena", "Jaguar", "Kangaroo", "Leopard", "Lion", "Monkey", "Ocelot", "Panda", "Porcupine", "Red panda", "Rhinoceros", "Sifaka", "Snake", "Tiger", "Zebra"],
        "Sea animals": ["Beluga", "Crab", "Dolphin", "Fur seal", "Narwhal", "Orca, killer whale", "Sea lion", "Seal", "Walrus", "Whale"]
    },
    "Bedroom": {
        "Bedroom accessories": ["Clock"]
    },
    "Birds": {
        "Farm birds": ["Chick", "Chicken", "Duck", "Duckling", "Goose", "Ostrich", "Peacock", "Pheasant", "Quail", "Rooster", "Turkey"],
        "Wild birds": ["Bullfinch", "Crow", "Eagle", "Falcon", "Flamingo", "Hummingbird", "Owl", "Parrot", "Pelican", "Penguin", "Pigeon", "Sparrow", "Stork", "Swallow", "Swan", "Titmouse", "Vulture", "Woodpecker"]
    },
    "Hobby": {
        "Musical Instruments": ["Acoustic guitar", "Banjo", "Bongo drums", "Castanet", "Clarinet", "Electric guitar", "Harmonica", "Harp", "Piano", "Snare drum", "Trombone", "Trumpet", "Ukulele", "Violin", "Xylophone"],
        "Sports": ["Badminton", "Baseball", "Basketball", "Bowling", "Cycling", "Golf", "Roller skating", "Skateboarding", "Skiing", "Snowboarding", "Soccer", "Swimming", "Table tennis", "Tennis", "Track and field", "Trampoline", "Volleyball"]
    },
    "Holidays": {
        "Christmas": ["Bells", "Fireworks", "Santa claus"],
        "Easter": ["Chick", "Chicken"],
        "Halloween": ["Ghost"]
    },
    "Home": {
        "House": ["Brick", "Door chain", "Doorbell", "Elevator", "Faucet", "Fireplace", "Key", "Lock", "Shower"]
    },
    "Household Appliances": {
        "Electronics": ["Blender", "Hair dryer", "Microwave", "Mixer", "Sewing machine", "Shaver", "Stove", "Telephone", "Vacuum cleaner", "Washing machine"],
        "Gadgets": ["Camera", "Drone", "Keyboard", "Television"]
    },
    "Nature": {
        "Bodies of water": ["Ocean", "Waterfall"],
        "Weather": ["Lighting"]
    },
    "School": {
        "Classroom objects": ["Board marker"]
    },
    "Transport": {
        "Aircraft": ["Air balloon", "Airplane", "Helicopter", "Rocket"],
        "Bicycle transport": ["Bicycle", "Segway"],
        "Land transport": ["Ambulance", "Bus", "Car", "Carriage", "Excavator", "Fire truck", "Police car", "Race car", "Tractor", "Truck"],
        "Motorcycles": ["Motorcycle", "Scooter"],
        "Rail transport": ["Steam train", "Subway train", "Train"],
        "Water transport": ["Boat"]
    }
}
    `);
}
