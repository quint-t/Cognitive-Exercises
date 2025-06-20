function getImages1() {
    return JSON.parse(`
{
    "Adjectives": {
        "Opposites": ["Big", "Black and white", "Bottom", "Clean", "Closed", "Color", "Curly", "Curve", "Dark", "Difficult", "Dirty", "Dressed", "Dry", "Edible", "Empty", "Fat", "Fragile", "Full", "Happy", "Heavy", "Hot", "Kind", "Left", "Light coloured", "Long", "Open", "Poisonous", "Poor", "Prickly", "Rich", "Right", "Ripe", "Rotten", "Sad", "Sharp", "Short", "Soft", "Straight", "Strong", "Sweet", "Tough", "Unclothed", "Wet", "Wicked"]
    },
    "Animals": {
        "Arctic animals": ["Arctic fox", "Arctic wolf", "Beluga", "Fur seal", "Giant squid", "Muskox", "Narwhal", "Orca, killer whale", "Owl", "Penguin", "Polar bear", "Seal", "Walrus", "Whale"],
        "Domestic animals": ["Canary", "Cat", "Chinchilla", "Dog", "Fish", "Guinea pig", "Hamster", "Mouse", "Parrot", "Turtle"],
        "Farm animals": ["Bee", "Bull", "Camel", "Cow", "Coypu", "Donkey", "Goat", "Horse", "Lama", "Pig", "Pony", "Rabbit", "Ram", "Reindeer", "Sheep"],
        "Forest animals": ["Badger", "Bear", "Bison", "Boar", "Buffalo", "Chipmunk", "Coyote", "Deer", "Ferret", "Fox", "Frog", "Hare", "Hedgehog", "Lynx", "Marmot", "Mole", "Moose", "Raccoon", "Skunk", "Sloth", "Squirrel", "Wolf", "Wolverine"],
        "Insects": ["Ant", "Bedbug", "Bee", "Bug", "Bumblebee", "Butterfly", "Caterpillar", "Cockroach", "Dragonfly", "Fly", "Grasshopper", "Hornet", "Ladybug", "Louse", "Mantis", "Millipede", "Mite", "Mosquito", "Scarabaeus", "Scorpion", "Spider", "Termite", "Wasp"],
        "Jungle animals": ["Anteater", "Cheetah", "Chimpanzee", "Crocodile", "Elephant", "Gibbon", "Giraffe", "Gorilla", "Hippopotamus", "Hyena", "Jaguar", "Kangaroo", "Leopard", "Lion", "Monkey", "Ocelot", "Panda", "Porcupine", "Red panda", "Rhinoceros", "Sifaka", "Snake", "Tapir", "Tiger", "White tiger", "Zebra"],
        "Sea animals": ["Beluga", "Coral", "Crab", "Crayfish", "Dolphin", "Fur seal", "Giant squid", "Jellyfish", "Lobster", "Narwhal", "Nautilus", "Octopus", "Orca, killer whale", "Sea anemone", "Sea lion", "Sea turtle", "Sea urchin", "Seahorse", "Seal", "Seaweed", "Shark", "Shell", "Shrimp", "Snail", "Sperm whale", "Squid", "Starfish", "Stingray", "Walrus", "Whale"]
    },
    "Baby": {
        "Baby clothes": ["Baby mittens", "Bib", "Bodysuit", "Jumper", "Romper", "Shoes", "Sleeper", "Socks", "Sun hat", "Trousers"],
        "Baby things": ["Baby bath", "Baby walker", "Car seat", "Changing pad", "Changing table", ["Childrens tent", "Children's tent"], "Cradle", "Crib", "High chair", "Mobile", "Nursing bottle", "Pacifier", "Pillow", "Potty", "Rattle", "Scales", "Sleeping bag", "Stroller", "Towel"],
        "Playground": ["Bench", "Bucket", "Carousel", "Horizontal bar", "Monkey bar", "Rake", "Sand molds", "Sandbox", "Seesaw", "Shovel", "Slide", "Swings", "Watering can"]
    },
    "Bedroom": {
        "Bed": ["Bed", "Blanket", "Bunk bed", "Comforter", "Cot", "Cushion", "Duvet cover", "Headboard", "Mattress pad", "Mattress", "Pillow", "Pillowcase", "Playpen", "Sheet"],
        "Bedroom accessories": ["Blinds", "Clock", "Curtain rod", "Curtains", "Dressing table", "Flower", "Hanger", "Mat", "Mirror", "Night light", "Nightstand", "Roller blind", "Room divider", "Rug", "Vase"]
    },
    "Birds": {
        "Farm birds": ["Chick", "Chicken", "Duck", "Duckling", "Goose", "Ostrich", "Peacock", "Pheasant", "Quail", "Rooster", "Turkey"],
        "Wild birds": ["Bullfinch", "Crow", "Eagle", "Falcon", "Flamingo", "Hummingbird", "Owl", "Parrot", "Pelican", "Penguin", "Pigeon", "Sparrow", "Stork", "Swallow", "Swan", "Titmouse", "Vulture", "Woodpecker"]
    },
    "Colors": {
        "Base colors": ["Black", "Blue", "Brown", "Gold", "Gray", "Green", "Orange", "Purple", "Red", "Silver", "White", "Yellow"],
        "Secondary colors": ["Aqua", "Aquamarine", "Azure", "Bisque", "Chocolate", "Coral", "Dark red", "Indigo", "Ivory", "Khaki", "Lilac", "Magenta", "Maroon", "Navy", "Olive", "Pink", "Purple", "Salmon", "Tan", "Teal"]
    },
    "Food": {
        "Berries": ["Black currant", "Blackberry", "Blueberry", "Cherry", "Cranberry", "Gooseberry", "Melon", "Raspberry", "Red currant", "Strawberry", "Watermelon"],
        "Fruits": ["Apple", "Apricot", "Avocado", "Banana", "Coconut", "Dates", "Grapefruit", "Grapes", "Guava", "Kiwi", "Lemon", "Lime", "Mango", "Orange", "Peach", "Pear", "Persimmon", "Pineapple", "Plum", "Pomegranate"],
        "Vegetables": ["Beet", "Broccoli", "Carrot", "Cauliflower", "Celery", "Chili pepper", "Chinese cabbage", "Corn", "Cucumber", "Custard squash", "Eggplant", "Garlic", "Ginger", "Lettuce", "Olives", "Onion", "Peas", "Pepper", "Potato", "Pumpkin", "Radish", "Red cabbage", "Romanesco broccoli", "Savoy cabbage", "Spinach", "Tomato", "Turnip", "White cabbage", "Zucchini"]
    },
    "Hobby": {
        "Musical Instruments": ["Acoustic guitar", "Banjo", "Bongo drums", "Castanet", "Clarinet", "Electric guitar", "Harmonica", "Harp", "Piano", "Snare drum", "Trombone", "Trumpet", "Ukulele", "Violin", "Xylophone"],
        "Sports": ["Badminton", "Baseball", "Basketball", "Bowling", "Cycling", "Golf", "Roller skating", "Skateboarding", "Skiing", "Snowboarding", "Soccer", "Swimming", "Table tennis", "Tennis", "Track and field", "Trampoline", "Volleyball"]
    },
    "Holidays": {
        "Christmas": ["Angel", "Bells", "Bow", "Candle", "Candy cane", "Christmas cracker", "Christmas lights", "Christmas mailbox", "Christmas ornament", "Christmas tree", "Father christmas", "Fireworks", "Gingerbread house", "Gingerbread man", "Holly", "Presents", "Santa claus", ["Santas cap", "Santa's cap"], ["Santas sack", "Santa's sack"], "Sleigh", "Snow globe", "Snow Maiden", "Snowballs", "Snowflake", "Snowman", "Star", "Stocking", "Wreath"],
        "Easter": ["Bible", "Candies", "Candle", "Chalice", "Chick", "Chicken", "Christ", "Church", "Communion", "Crosses", "Crown of thorns", "Crucifixion", "Easter basket", "Easter bread", "Easter bunny", "Easter cookies", "Easter egg", "Easter eggs", "Easter lamb", "Eggshell", "Eucharist wafer", "Icon", "Jelly bean", "Lily", "Prayer", "Prosfora", "Rosary", "Stained glass", "Tulips", "Willow", "Wine"],
        "Halloween": ["Bat", "Broomstick", "Cauldron", "Elf", "Ghost", "Haunted house", "Magic wand", "Monster", "Mummy", "Pumpkin", "Skeleton", "Spider", "Vampire", "Werewolf", "Witch"],
        "Mothers day": ["Bouquet", "Cake", "Chocolates", "Congratulate", "Educate", "Entertain", "Feed", "Foster", "Gift", "Grandmother", "Hug", "Jewellery", "Kiss", "Letter", "Love", "Message", "Mother", "Offer flowers", "Perfume", "Prepare a breakfast", "Read a story", "Rose", "Sympathize", "Take care", "Tulip"],
        "Valentines day": ["Balloons", "Bouquet", "Card", "Chocolates", "Cupid", "Date", "Friendship", "Heart", "Lock", "Lollipop", "Love", "Lovers", "Message", "Petals", "Presents", "Proposal", "Wedding ring"]
    },
    "Home": {
        "Furniture": ["Armchair", "Bench", "Bookcase", "Cabinet", "Cage", "Chair", "Chest of drawers", "Chest", "Coffee table", "Couch", "Cupboard", "Desk", "Dresser", "Hanger", "Laundry basket", "Long stool", "Pouf", "Rocking chair", "Safe", "Secretaire", "Shoe cabinet", "Sofa", "Stool", "Swivel chair", "Table", "TV stand", "Wall shelf", "Wardrobe"],
        "Garden": ["Barbecue", "Fence", "Flowerbed", "Fountain", "Garage", "Gate", "Gazebo", "Greenhouse", "Hammock", "Hanging basket", "Hedge", "Lawn", "Path", "Pond", "Pool", "Porch swing", "Shed", "Sun lounger"],
        "House": ["Attic", "Balcony", "Basement", "Battery", "Bolt", "Brick", "Building", "Chimney", "Column", "Door chain", "Door", "Doorbell", "Doormat", "Elevator", "Faucet", "Fireplace", "Gutter", "House", "Intercom", "Key", "Lock", "Mailbox", "Porch", "Roof", "Shower", "Staircase", "Wall", "Window"],
        "Rooms": ["Basement", "Bathroom", "Bedroom", "Billiard room", "Closet", "Dining room", "Foyer", "Hall, corridor", "Kitchen", "Library", "Living room", "Office, den", "Parking", "Playroom", "Sauna", "Swimming pool", "Veranda"]
    },
    "Household Appliances": {
        "Electronics": ["Air conditioner", "Blender", "Calculator", "Coffee machine", "Dish washer", "Dryer", "Electric kettle", "Extractor hood", "Fan", "Freezer", "Fridge", "Hair dryer", "Hand dryer", "Heater", "Iron", "Juicer", "Lamp", "Meat grinder", "Microwave", "Mixer", "Multicooker", "Oven", "Sandwich maker", "Scales", "Sewing machine", "Shaver", "Stove", "Telephone", "Toaster", "Vacuum cleaner", "Washing machine"],
        "Gadgets": ["3D glasses", "Binoculars", "Camera", "Charger", "Computer", "Drone", "E-reader", "Fitness bracelet", "Game console", "Gamepad", "Headphones", "Keyboard", "Laptop", "Lens", "Memory card", "Microphone", "Phone", "Player", "Projector", "Router", "Satellite antenna", "Security camera", "Sim-card", "Speaker", "Tablet", "Television", "TV remote", "Videocamera", "VR glasses"]
    },
    "Kitchen": {
        "Crockery and cutlery": ["Bowl", "Butter dish", "Cake server", "Carafe", "Chopsticks", "Coffee cup", "Cup", "Egg cup", "Fork", "French press", "Glass", "Jug", "Knife", "Mixing bowl", "Mug", "Napkin", "Pepper shaker", "Plate", "Salt shaker", "Samovar", "Saucer", "Serving plate", "Spoon", "Sugar bowl", "Teacup", "Teapot", "Thermos", "Tray", "Wine glass"],
        "Kitchenware": ["Bottle opener", "Bottle", "Bread bin", "Can opener", "Cheese slicer", "Colander", "Cooking tongs", "Corkscrew", "Cutting board", "Egg slicer", "Food container", "Frying pan", "Garlic press", "Grater", "Ice-cream scoop", "Jar", "Kettle", "Knife, cleaver", "Ladle", "Masher", "Meat tenderizer", "Nutcrackers", "Pasta spoon", "Peeler", "Pestle and mortar", "Pizza cutter", "Pot", "Spatula", "Strainer", "Whisk"]
    },
    "Nature": {
        "Bodies of water": ["Aquarium", "Bay", "Branch of the river", "Canal", "Cove", "Fjord", "Fountain", "Glacier", "Iceberg", "Lagoon", "Lake", "Levee", "Marsh", "Mouth of a river", "Oasis", "Ocean", "Pond", "Puddle", "Reservoir", "River cascades", "River delta", "River", "Sea", "Source of a river", "Spring", "Strait", "Stream", "Waterfall", "Well", "Wetland"],
        "Solar system": ["Asteroid", "Comet", "Crater", "Earth", "Eclipse", "Galaxy", "Jupiter", "Mars", "Mercury", "Meteorite", "Milky way", "Moon", "Nebula", "Neptune", "Pluto", "Saturn", "Solar system", "Star", "Starry sky", "Uranus", "Venus"],
        "Weather": ["Cloud", "Cloudy", "Cold", "Dew", "Fog", "Frost", "Frozen", "Hail", "Hot", "Hurricane", "Ice", "Icicles", "Leaves", "Lighting", "Polar lights", "Puddle", "Rain", "Rainbow", "Slippery ice", "Snow", "Snowdrift", "Snowfall", "Snowflake", "Storm", "Sunny", "Sunrise", "Sunset", "Thunder", "Tsunami", "Warm, calm", "Wind, windy"]
    },
    "Numbers": {
        "Counting": ["Eight", "Five", "Four", "Nine", "One", "Seven", "Six", "Ten", "Three", "Two"],
        "Numbers": ["Eight", "Eighteen", "Eleven", "Fifteen", "Five", "Four", "Fourteen", "Nine", "Nineteen", "One", "Seven", "Seventeen", "Six", "Sixteen", "Ten", "Thirteen", "Three", "Twelve", "Twenty", "Two", "Zero"]
    },
    "People": {
        "Body parts": ["Abdomen", "Arm", "Back", "Bone", "Bum", "Chest", "Elbow", "Finger", "Fist", "Foot", "Hand", "Head", "Heel", "Hip", "Knee", "Leg", "Nail", "Nape", "Neck", "Palm", "Shoulder", "Skeleton", "Skull", "Sole", "Toe", "Wrist"],
        "Face": ["Beard", "Cheek", "Chin", "Ear", "Eye", "Eyebrow", "Eyelashes", "Face", "Forehead", "Freckles", "Hair", "Jaw", "Lip", "Mouth", "Mustache", "Nose", "Nostril", "Tongue", "Tooth", "Wrinkles"],
        "Family members": ["Aunt", "Bride", "Brother", "Children", "Couple", "Daughter", "Family", "Father or dad", "Father-in-law (for husband)", "Father-in-law (for wife)", "Grandchildren", "Granddaughter", "Grandfather", "Grandmother", "Grandparents", "Grandson", "Groom", "Husband", "Mother or mom", "Mother-in-law (for husband)", "Mother-in-law (for wife)", "Nephew", "Newborn", "Niece", "Parents", "Pregnant", "Siblings", "Sister", "Son", "Twins", "Uncle", "Wife"],
        "Jobs and occupations": ["Accountant", "Analyst", "Astronaut", "Athlete", "Baker", "Bartender", "Blacksmith", "Builder", "Car mechanic", "Carpenter", "Chemist", "Cleaner", "Clerk", "Cook", "Dispatcher", "Diver", "Driver", "Electrician", "Exterminator", "Farmer", "Firefighter", "Fisherman", "Flight attendant", "Florist", "Foreman", "Gardener", "Hairdresser", "Librarian", "Loader", "Mailman", "Massage therapist", "Model", "Monk", "Nurse", "Painter", "Pensioner", "Plumber", "Policewoman", "Priest", "Realtor", "Sailor", "Seamstress", "Secretary", "Security guard", "Seller", "Waiter", "Washer", "Welder", "Worker"],
        "Professions": ["Actress", "Architect", "Audio engineer", "Ballerina", "Boss", "Captain", "Clown", "Coach", "Conductor", "Consultant", "Dancer", "Designer", "Doctor", "Engineer", "Entrepreneur", "Investigator", "Journalist", "Judge", "Lawyer", "Magician", "Musician", "Painter", "Photographer", "Pilot", "Politician", "Producer", "Professor", "Programmer", "Reporter", "Scientist", "Sculptor", "Singer", "Street performer", "Teacher", "TV presenter", "Writer"],
        "Stages": ["Adult", "Baby", "Boy", "Children", "Girl", "Lady", "Man", "Old man", "Old woman", "Teenager", "Woman", "Youth"]
    },
    "School": {
        "Classroom objects": ["Abacus", "Backpack", "Board marker", "Book", "Bookshelf", "Calculator", "Chalk", "Chalkboard", "Computer", "Desk", "Eraser", "Globe", "Glue", "Laptop", "Letter tracing", "Letters", "Lunch box", "Marker", "Microscope", "Notebook", "Numbers", "Paper leaf", "Pen", "Pencil case", "Pencil sharpener", "Pencil", "Protractor", "Pupil", "Ruler", "School bus", "School compasses", "School", "Scissors", "Teacher", "Timetable", "Whiteboard"],
        "School building": ["Art room", "Auditorium", "Classroom", "Computer room", "Dining room", "Gym", "Hall", "Lab", "Library", "Lockers", "Music class", "Office", "Playground", "Pool", "School yard", "Sports ground", "Toilet"]
    },
    "Shapes": {
        "2D shapes": ["Acute triangle", "Annulus", "Arch", "Arrow", "Circle", "Crescent", "Cross", "Decagon", "Dodecagon", "Equilateral triangle", "Gear", "Heart", "Heptagon", "Hexagon", "Isosceles triangle", "Kite", "Lens", "Nonagon", "Obtuse triangle", "Octagon", "Oval", "Parallelogram", "Pentagon", "Polygon", "Quadrilateral", "Rectangle", "Rhombus", "Right triangle", "Sector", "Segment", "Semicircle", "Square", "Star", "Trapezoid", "Triangle"],
        "3D shapes": ["Cone", "Cube", "Cuboid", "Cylinder", "Dodecahedron", "Ellipsoid", "Frustum", "Hexagonal prism", "Hexagonal pyramid", "Icosahedron", "Octahedron", "Parallelepiped", "Pentagonal prism", "Sphere", "Square pyramid", "Triangular prism", "Triangular pyramid"]
    },
    "Transport": {
        "Aircraft": ["Air balloon", "Airplane", "Biplane", "Convertiplane", "Fighter plane", "Glider", "Helicopter", "Kite", "Parachute", "Rocket", "Satellite", "Space shuttle", "Ultralight", "Zeppelin"],
        "Bicycle transport": ["3 wheel bicycle", "4 wheel bicycle", "Baby bike", "Balance bike", "Bicycle trailer", "Bicycle", "Child bike seat", "Cycling helmet", "Electric unicycle", "Kick scooter", "Pedicab", "Recumbent bike", "Segway", "Tandem", "Unicycle", "Velomobile"],
        "Land transport": ["Aerial platform", "Ambulance", "Bus", "Camper", "Car carrier trailer", "Car", "Carriage", "Covered wagon", "Double-decker bus", "Excavator", "Fire engine", "Fire truck", "Garbage truck", "Loader", "Police car", "Race car", "Refueler", "School bus", "Sleigh", "Tank", "Taxi", "Tourist bus", "Tractor unit", "Tractor", "Trailer", "Trolleybus", "Truck", "Van", "Vintage"],
        "Motorcycles": ["Auto rickshaw", "Cargo motorcycle", "Chopper", "Helmet", "Moped", "Moto gloves", "Motorcycle", "Quadracycle", "Scooter", "Sidecar", "Snowmobile", "Superbike"],
        "Rail transport": ["Autorack", "Dump car", "Electric train", "Flatcar", "Funicular", "Goods wagon", "High-speed train", "Hopper car", "Monorail", "Open wagon", "Passenger wagon", "Railway crane", "Steam train", "Subway train", "Tank car", "Tender", "Train", "Tram"],
        "Water transport": ["Aircraft carrier", "Boat", "Canoe", "Catamaran", "Container ship", "Cruise ship", "Ferry", "Hovercraft", "Inflatable dinghy", "Kayak", "Motoboat", "Sailboat", "Ship", "Steamship", "Submarine", "Tanker", "Water scooter", "Yacht"]
    },
    "Verbs": {
        "Action verbs": ["Add", "Bite", "Blow ones nose", "Blow", "Bring up", "Build", "Care", "Catch", "Clap", "Collect, gather", "Comb", "Dance", "Dig", "Dry", "Feed", "Fish", "Fix", "Give", "Hang", "Hide", "Hold", "Kick", "Knock", "Launch", "Lay", "Look into", "Mow", "Open", "Paint", "Peep out", "Play the piano", "Play", "Pour over", "Present", "Press", "Pull", "Put", "Saw", "Scratch", "Shoot", "Sing", "Sit", "Sneeze", "Squeeze", "Stand", "Sunbathe", "Swing", "Tear, rip", "Throw up", "Throw", "Whisper"],
        "Movement verbs": ["Carry", "Chase", "Climb", "Crawl", "Descend", "Dive", "Drive", "Fall", "Fly", "Go", "Jump", "Pull", "Push", "Ride", "Roll", "Row", "Run", "Swim", "Walk"],
        "Routine verbs": ["Brush teeth", "Button the buttons", "Clean, scrub", "Cook", "Do laundry", "Drink", "Eat", "Feed", "Get dressed", "Gets her hair cut", "Go shopping", "Iron", "Pee", "Play with friends", "Poop", "Put on make-up", "Put on shoes", "Relax", "Shave", "Sit on the potty", "Sleep", "Smoke", "Splash", "Sweep", "Take a bath", "Take a shower", "Tie shoelaces", "Vacuum", "Wake up", "Wash", "Watch TV", "Water", "Work"],
        "State verbs": ["Be angry", "Beat", "Call", "Confuse", "Cry", "Defend", "Dream", "Fear", "Grimace", "Has", "Hear", "Hug", "Hurt", "Kiss", "Laugh", "Look", "Pray", "See", "Shout", "Show", "Sniff", "Think", "Yawn"]
    }
}
    `);
}
