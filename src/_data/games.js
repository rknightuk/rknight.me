const PLATFORMS = [
    { "name": "Master System", "key": "sega", "color": "#0089CF" },
    { "name": "N64", "key": "n64", "color": "" },
    { "name": "GameCube", "key": "gamecube", "color": "#6A5FBB" },
    { "name": "3DS", "key": "3ds", "color": "#D12228" },
    { "name": "Wii", "key": "wii", "color": "#8B8B8B" },
    { "name": "Switch", "key": "switch", "color": "#e60012" },
    { "name": "Xbox", "key": "xbox", "color": "#107C10" },
    { "name": "Xbox 360", "key": "xbox", "color": "#107C10" },
    { "name": "Xbox One", "key": "xbox", "color": "#107C10" },
    { "name": "PS1", "key": "ps1" },
    { "name": "PS2", "key": "ps2", "color": "#003791" },
    { "name": "PS3", "key": "ps3", "color": "#003791" },
    { "name": "PS4", "key": "ps4", "color": "#003791" },
    { "name": "PS5", "key": "ps5", "color": "#003791" }
]
const GAMES = {
    "PS2": [
      {
        "gameID": 23444,
        "platformID": 11,
        "title": "Atari Anthology"
      },
      {
        "gameID": 5869,
        "platformID": 11,
        "title": "Airblade"
      },
      {
        "gameID": 9640,
        "platformID": 11,
        "title": "Buzz! The BIG Quiz"
      },
      {
        "gameID": 9650,
        "platformID": 11,
        "title": "Dave Mirra Freestyle BMX 2"
      },
      {
        "gameID": 4920,
        "platformID": 11,
        "title": "EyeToy: Play"
      },
      {
        "gameID": 73235,
        "platformID": 11,
        "title": "Eyetoy Play 2"
      },
      {
        "gameID": 17930,
        "platformID": 11,
        "title": "Batman: Rise of Sin Tzu"
      },
      {
        "gameID": 34884,
        "platformID": 11,
        "title": "Canis Canem Edit"
      },
      {
        "gameID": 7196,
        "platformID": 11,
        "title": "Crazy Taxi"
      },
      {
        "gameID": 22561,
        "platformID": 11,
        "title": "Disney's Extreme Skate Adventure"
      },
      {
        "gameID": 68081,
        "platformID": 11,
        "title": "Buzz! Brain of the UK"
      },
      {
        "gameID": 9639,
        "platformID": 11,
        "title": "Buzz! The Music Quiz"
      },
      {
        "gameID": 18389,
        "platformID": 11,
        "title": "Buzz! Pop Quiz"
      },
      {
        "gameID": 27516,
        "platformID": 11,
        "title": "Buzz! The Hollywood Quiz"
      },
      {
        "gameID": 28233,
        "platformID": 11,
        "title": "Buzz! The Mega Quiz"
      },
      {
        "gameID": 7256,
        "platformID": 11,
        "title": "FIFA Street"
      },
      {
        "gameID": 12984,
        "platformID": 11,
        "title": "FIFA Street 2"
      },
      {
        "gameID": 39055,
        "platformID": 11,
        "title": "Friends: The One With All The Trivia"
      },
      {
        "gameID": 4915,
        "platformID": 11,
        "title": "Futurama"
      },
      {
        "gameID": 26656,
        "platformID": 11,
        "title": "Ghost Rider"
      },
      {
        "gameID": 7283,
        "platformID": 11,
        "title": "GoldenEye: Rogue Agent"
      },
      {
        "gameID": 3929,
        "platformID": 11,
        "title": "Gran Turismo 4"
      },
      {
        "gameID": 4165,
        "platformID": 11,
        "title": "Grand Theft Auto III"
      },
      {
        "gameID": 4166,
        "platformID": 11,
        "title": "Grand Theft Auto: Vice City"
      },
      {
        "gameID": 3930,
        "platformID": 11,
        "title": "Grand Theft Auto: San Andreas"
      },
      {
        "gameID": 5381,
        "platformID": 11,
        "title": "Iron Man"
      },
      {
        "gameID": 7289,
        "platformID": 11,
        "title": "Grand Theft Auto: Vice City Stories"
      },
      {
        "gameID": 7288,
        "platformID": 11,
        "title": "Grand Theft Auto: Liberty City Stories"
      },
      {
        "gameID": 7189,
        "platformID": 11,
        "title": "Guitar Hero"
      },
      {
        "gameID": 7290,
        "platformID": 11,
        "title": "Guitar Hero III: Legends of Rock"
      },
      {
        "gameID": 19749,
        "platformID": 11,
        "title": "Guitar Hero Encore: Rocks the 80s"
      },
      {
        "gameID": 7972,
        "platformID": 11,
        "title": "Herdy Gerdy"
      },
      {
        "gameID": 7299,
        "platformID": 11,
        "title": "Hot Wheels: Stunt Track Challenge"
      },
      {
        "gameID": 4877,
        "platformID": 11,
        "title": "The Incredible Hulk: Ultimate Destruction"
      },
      {
        "gameID": 4865,
        "platformID": 11,
        "title": "Jak and Daxter: The Precursor Legacy"
      },
      {
        "gameID": 7187,
        "platformID": 11,
        "title": "Guitar Hero II"
      },
      {
        "gameID": 15178,
        "platformID": 11,
        "title": "Guitar Hero 5"
      },
      {
        "gameID": 7188,
        "platformID": 11,
        "title": "Guitar Hero: World Tour"
      },
      {
        "gameID": 4867,
        "platformID": 11,
        "title": "Jak II"
      },
      {
        "gameID": 4872,
        "platformID": 11,
        "title": "Jak 3"
      },
      {
        "gameID": 9720,
        "platformID": 11,
        "title": "Jak X: Combat Racing"
      },
      {
        "gameID": 12580,
        "platformID": 11,
        "title": "Jak and Daxter: The Lost Frontier"
      },
      {
        "gameID": 4840,
        "platformID": 11,
        "title": "LEGO Star Wars: The Video Game"
      },
      {
        "gameID": 4845,
        "platformID": 11,
        "title": "LEGO Star Wars II: The Original Trilogy"
      },
      {
        "gameID": 15763,
        "platformID": 11,
        "title": "Lemmings"
      },
      {
        "gameID": 4572,
        "platformID": 11,
        "title": "The Matrix: Path of Neo"
      },
      {
        "gameID": 4170,
        "platformID": 11,
        "title": "Max Payne"
      },
      {
        "gameID": 10831,
        "platformID": 11,
        "title": "LEGO Indiana Jones: The Original Adventures"
      },
      {
        "gameID": 61935,
        "platformID": 11,
        "title": "London Racer II"
      },
      {
        "gameID": 43190,
        "platformID": 11,
        "title": "Mashed: Fully Loaded"
      },
      {
        "gameID": 7797,
        "platformID": 11,
        "title": "Ratchet & Clank"
      },
      {
        "gameID": 28315,
        "platformID": 11,
        "title": "Micro Machines"
      },
      {
        "gameID": 7369,
        "platformID": 11,
        "title": "Micro Machines V4"
      },
      {
        "gameID": 4816,
        "platformID": 11,
        "title": "Mortal Kombat: Deadly Alliance"
      },
      {
        "gameID": 15790,
        "platformID": 11,
        "title": "MX Rider"
      },
      {
        "gameID": 7797,
        "platformID": 11,
        "title": "Ratchet & Clank"
      },
      {
        "gameID": 13384,
        "platformID": 11,
        "title": "Ratchet & Clank: Size Matters"
      },
      {
        "gameID": 32257,
        "platformID": 11,
        "title": "Rayman: 10th Anniversary Collection"
      },
      {
        "gameID": 5376,
        "platformID": 11,
        "title": "Red Dead Revolver"
      },
      {
        "gameID": 39465,
        "platformID": 11,
        "title": "Rumble Racing"
      },
      {
        "gameID": 70957,
        "platformID": 11,
        "title": "Ratchet & Clank 2"
      },
      {
        "gameID": 3940,
        "platformID": 11,
        "title": "Ratchet & Clank 3"
      },
      {
        "gameID": 37165,
        "platformID": 11,
        "title": "Ratchet: Gladiator"
      },
      {
        "gameID": 13385,
        "platformID": 11,
        "title": "Secret Agent Clank"
      },
      {
        "gameID": 5389,
        "platformID": 11,
        "title": "Sega Classics Collection"
      },
      {
        "gameID": 35524,
        "platformID": 11,
        "title": "Sega Mega Drive Collection"
      },
      {
        "gameID": 37435,
        "platformID": 11,
        "title": "Shadow of Memories"
      },
      {
        "gameID": 16548,
        "platformID": 11,
        "title": "The Simpsons Game"
      },
      {
        "gameID": 5420,
        "platformID": 11,
        "title": "The Simpsons: Hit & Run"
      },
      {
        "gameID": 5421,
        "platformID": 11,
        "title": "The Simpsons: Road Rage"
      },
      {
        "gameID": 4776,
        "platformID": 11,
        "title": "The Simpsons Skateboarding"
      },
      {
        "gameID": 20111,
        "platformID": 11,
        "title": "Singstar Rocks!"
      },
      {
        "gameID": 20116,
        "platformID": 11,
        "title": "SingStar '80s"
      },
      {
        "gameID": 20112,
        "platformID": 11,
        "title": "SingStar '90s"
      },
      {
        "gameID": 28332,
        "platformID": 11,
        "title": "Singstar: Boybands vs. Girlbands"
      },
      {
        "gameID": 20113,
        "platformID": 11,
        "title": "SingStar Legends"
      },
      {
        "gameID": 28334,
        "platformID": 11,
        "title": "SingStar Party"
      },
      {
        "gameID": 28330,
        "platformID": 11,
        "title": "SingStar Anthems"
      },
      {
        "gameID": 16587,
        "platformID": 11,
        "title": "SingStar Take That"
      },
      {
        "gameID": 28335,
        "platformID": 11,
        "title": "Singstar Pop Hits"
      },
      {
        "gameID": 16592,
        "platformID": 11,
        "title": "SingStar Queen"
      },
      {
        "gameID": 23489,
        "platformID": 11,
        "title": "Sonic Gems Collection"
      },
      {
        "gameID": 4778,
        "platformID": 11,
        "title": "Spider-Man 2"
      },
      {
        "gameID": 9817,
        "platformID": 11,
        "title": "Smuggler's Run"
      },
      {
        "gameID": 19762,
        "platformID": 11,
        "title": "Sonic Mega Collection Plus"
      },
      {
        "gameID": 55179,
        "platformID": 11,
        "title": "Space Invaders Anniversary"
      },
      {
        "gameID": 4777,
        "platformID": 11,
        "title": "Spider-Man: The Movie"
      },
      {
        "gameID": 5368,
        "platformID": 11,
        "title": "Spider-Man 3"
      },
      {
        "gameID": 24719,
        "platformID": 11,
        "title": "Splashdown"
      },
      {
        "gameID": 9799,
        "platformID": 11,
        "title": "Spy Hunter"
      },
      {
        "gameID": 14507,
        "platformID": 11,
        "title": "Stuntman"
      },
      {
        "gameID": 18519,
        "platformID": 11,
        "title": "Swing Away Golf"
      },
      {
        "gameID": 9232,
        "platformID": 11,
        "title": "TimeSplitters"
      },
      {
        "gameID": 3878,
        "platformID": 11,
        "title": "TimeSplitters 2"
      },
      {
        "gameID": 9231,
        "platformID": 11,
        "title": "TimeSplitters: Future Perfect"
      },
      {
        "gameID": 28379,
        "platformID": 11,
        "title": "Who Wants to be a Millionaire: Party Edition"
      },
      {
        "gameID": 66216,
        "platformID": 11,
        "title": "World Snooker Championship 2005"
      },
      {
        "gameID": 4770,
        "platformID": 11,
        "title": "Ultimate Spider-Man"
      },
      {
        "gameID": 14092,
        "platformID": 11,
        "title": "Tony Hawk's Project 8"
      },
      {
        "gameID": 4772,
        "platformID": 11,
        "title": "Tony Hawk's Pro Skater 3"
      },
      {
        "gameID": 9309,
        "platformID": 11,
        "title": "Tony Hawk's Underground 2"
      },
      {
        "gameID": 15489,
        "platformID": 11,
        "title": "Tony Hawk's Proving Ground"
      },
      {
        "gameID": 4773,
        "platformID": 11,
        "title": "Tony Hawk's American Wasteland"
      },
      {
        "gameID": 9743,
        "platformID": 11,
        "title": "Tony Hawk's Pro Skater 4"
      },
      {
        "gameID": 37273,
        "platformID": 11,
        "title": "Tony Hawk's Downhill Jam"
      },
      {
        "gameID": 4774,
        "platformID": 11,
        "title": "Tony Hawk's Underground"
      }
    ],
    "PS5": [
      {
        "gameID": 73752,
        "platformID": 4980,
        "title": "Sackboy: A Big Adventure"
      },
      {
        "gameID": 73917,
        "platformID": 4980,
        "title": "Marvel's Spider-Man: Miles Morales [Launch Edition]"
      },
      {
        "gameID": 77471,
        "platformID": 4980,
        "title": "Immortals Fenyx Rising"
      },
      {
        "gameID": 79393,
        "platformID": 4980,
        "title": "Pathless"
      },
      {
        "gameID": 73744,
        "platformID": 4980,
        "title": "Ratchet & Clank: Rift Apart"
      },
      {
        "gameID": 73721,
        "platformID": 4980,
        "title": "Deathloop"
      },
      {
        "gameID": 92653,
        "platformID": 4980,
        "title": "Hot Wheels Unleashed"
      },
      {
        "gameID": 97933,
        "platformID": 4980,
        "title": "Horizon II: Forbidden West [Special Edition]"
      },
      {
        "gameID": 100122,
        "platformID": 4980,
        "title": "Sifu [Vengeance Edition]"
      },
      {
        "gameID": 92522,
        "platformID": 4980,
        "title": "Alan Wake Remastered"
      },
      {
        "gameID": 87596,
        "platformID": 4980,
        "title": "Marvel's Guardians of the Galaxy"
      },
      {
        "gameID": 101298,
        "platformID": 4980,
        "title": "Last of Us Part I [Firefly Edition]"
      }
    ],
    "N64": [
      {
        "gameID": 173,
        "platformID": 3,
        "title": "Perfect Dark"
      },
      {
        "gameID": 178,
        "platformID": 3,
        "title": "Diddy Kong Racing"
      },
      {
        "gameID": 161,
        "platformID": 3,
        "title": "The Legend of Zelda: Ocarina of Time"
      },
      {
        "gameID": 390,
        "platformID": 3,
        "title": "Pokémon Snap"
      },
      {
        "gameID": 1230,
        "platformID": 3,
        "title": "V-Rally Edition '99"
      },
      {
        "gameID": 266,
        "platformID": 3,
        "title": "Mario Kart 64"
      },
      {
        "gameID": 1150,
        "platformID": 3,
        "title": "MRC: Multi-Racing Championship"
      },
      {
        "gameID": 1100,
        "platformID": 3,
        "title": "F-1 World Grand Prix"
      },
      {
        "gameID": 160,
        "platformID": 3,
        "title": "GoldenEye 007"
      },
      {
        "gameID": 1102,
        "platformID": 3,
        "title": "FIFA: Road to World Cup 98"
      }
    ],
    "3DS": [
      {
        "gameID": 34961,
        "platformID": 4912,
        "title": "Chibi-Robo! Zip Lash"
      },
      {
        "gameID": 27917,
        "platformID": 4912,
        "title": "Code Name: S.T.E.A.M."
      },
      {
        "gameID": 42663,
        "platformID": 4912,
        "title": "Poochy & Yoshi's Woolly World"
      },
      {
        "gameID": 65193,
        "platformID": 4912,
        "title": "The Legend of Zelda: Ocarina of Time 3D [Nintendo Selects]"
      },
      {
        "gameID": 12733,
        "platformID": 4912,
        "title": "Mario Kart 7"
      }
    ],
    "GameCube": [
      {
        "gameID": 64119,
        "platformID": 2,
        "title": "Mario Kart: Double Dash!! Includes Bonus Disc With Playable Demos"
      },
      {
        "gameID": 166,
        "platformID": 2,
        "title": "Mario Kart: Double Dash!!"
      }
    ],
    "Xbox": [
      {
        "gameID": 10395,
        "platformID": 14,
        "title": "Oddworld: Munch's Oddysee"
      },
      {
        "gameID": 6076,
        "platformID": 14,
        "title": "Grand Theft Auto: San Andreas"
      }
    ],
    "Master System": [
      {
        "gameID": 2677,
        "platformID": 35,
        "title": "Action Fighter"
      },
      {
        "gameID": 1613,
        "platformID": 35,
        "title": "After Burner"
      },
      {
        "gameID": 2981,
        "platformID": 35,
        "title": "Asterix"
      },
      {
        "gameID": 5245,
        "platformID": 35,
        "title": "Batman Returns"
      },
      {
        "gameID": 2706,
        "platformID": 35,
        "title": "Black Belt"
      },
      {
        "gameID": 18804,
        "platformID": 35,
        "title": "Desert Speedtrap starring Road Runner and Wile E. Coyote"
      },
      {
        "gameID": 2795,
        "platformID": 35,
        "title": "Ghouls'n Ghosts"
      },
      {
        "gameID": 2910,
        "platformID": 35,
        "title": "Mick & Mack: Global Gladiators"
      },
      {
        "gameID": 2803,
        "platformID": 35,
        "title": "GP Rider"
      },
      {
        "gameID": 3076,
        "platformID": 35,
        "title": "Ninja"
      },
      {
        "gameID": 2991,
        "platformID": 35,
        "title": "Rescue Mission"
      },
      {
        "gameID": 79115,
        "platformID": 35,
        "title": "Sonic the Hedgehog (EU)"
      },
      {
        "gameID": 3104,
        "platformID": 35,
        "title": "Winter Olympics: Lillehammer '94"
      },
      {
        "gameID": 2926,
        "platformID": 35,
        "title": "Mortal Kombat"
      }
    ],
    "PS1": [
      {
        "gameID": 18518,
        "platformID": 10,
        "title": "Bishi Bashi Special"
      },
      {
        "gameID": 8771,
        "platformID": 10,
        "title": "Mat Hoffman's Pro BMX"
      },
      {
        "gameID": 619,
        "platformID": 10,
        "title": "Tomb Raider II - Starring Lara Croft"
      },
      {
        "gameID": 10775,
        "platformID": 10,
        "title": "Tomb Raider Chronicles"
      },
      {
        "gameID": 2420,
        "platformID": 10,
        "title": "Oddworld: Abe's Oddysee"
      },
      {
        "gameID": 2780,
        "platformID": 10,
        "title": "Tomb Raider"
      },
      {
        "gameID": 11668,
        "platformID": 10,
        "title": "Tony Hawk's Pro Skater 4"
      },
      {
        "gameID": 11667,
        "platformID": 10,
        "title": "Tony Hawk's Pro Skater 3"
      },
      {
        "gameID": 4177,
        "platformID": 10,
        "title": "Tony Hawk's Pro Skater"
      },
      {
        "gameID": 9353,
        "platformID": 10,
        "title": "Tony Hawk's Pro Skater 2"
      }
    ],
    "Wii": [
      {
        "gameID": 5334,
        "platformID": 9,
        "title": "Call of Duty: Modern Warfare (Reflex Edition)"
      },
      {
        "gameID": 7593,
        "platformID": 9,
        "title": "Carnival Games"
      },
      {
        "gameID": 8080,
        "platformID": 9,
        "title": "The Legend of Zelda: Skyward Sword"
      },
      {
        "gameID": 109,
        "platformID": 9,
        "title": "The Legend of Zelda: Twilight Princess"
      },
      {
        "gameID": 7659,
        "platformID": 9,
        "title": "Mario Strikers Charged"
      },
      {
        "gameID": 18432,
        "platformID": 9,
        "title": "Carnival Games: Mini-Golf"
      },
      {
        "gameID": 3466,
        "platformID": 9,
        "title": "Game Party"
      },
      {
        "gameID": 2248,
        "platformID": 9,
        "title": "Link's Crossbow Training"
      },
      {
        "gameID": 5233,
        "platformID": 9,
        "title": "Mario & Sonic at the Olympic Games"
      },
      {
        "gameID": 44577,
        "platformID": 9,
        "title": "My Fitness Coach: Get In Shape"
      },
      {
        "gameID": 5345,
        "platformID": 9,
        "title": "Red Steel"
      },
      {
        "gameID": 824,
        "platformID": 9,
        "title": "Red Steel 2"
      },
      {
        "gameID": 170,
        "platformID": 9,
        "title": "New Super Mario Bros. Wii"
      },
      {
        "gameID": 169,
        "platformID": 9,
        "title": "Mario Kart Wii"
      },
      {
        "gameID": 3299,
        "platformID": 9,
        "title": "GoldenEye 007"
      },
      {
        "gameID": 7736,
        "platformID": 9,
        "title": "Tony Hawk's Downhill Jam"
      },
      {
        "gameID": 3257,
        "platformID": 9,
        "title": "Wii Fit"
      },
      {
        "gameID": 3495,
        "platformID": 9,
        "title": "Wii Play"
      },
      {
        "gameID": 64855,
        "platformID": 9,
        "title": "Super Mario All-Stars [Nintendo Selects]"
      },
      {
        "gameID": 25857,
        "platformID": 9,
        "title": "Tony Hawk: Ride"
      },
      {
        "gameID": 3194,
        "platformID": 9,
        "title": "Wii Sports Resort"
      },
      {
        "gameID": 14859,
        "platformID": 9,
        "title": "Tony Hawk: Shred"
      },
      {
        "gameID": 76992,
        "platformID": 9,
        "title": "Wii Sports [Pack In]"
      }
    ],
    "PS4": [
      {
        "gameID": 43904,
        "platformID": 4919,
        "title": "Crash Bandicoot N. Sane Trilogy"
      },
      {
        "gameID": 48142,
        "platformID": 4919,
        "title": "Detroit: Become Human"
      },
      {
        "gameID": 20954,
        "platformID": 4919,
        "title": "Grand Theft Auto V"
      },
      {
        "gameID": 23993,
        "platformID": 4919,
        "title": "LEGO Batman 3: Beyond Gotham"
      },
      {
        "gameID": 45323,
        "platformID": 4919,
        "title": "LEGO CITY Undercover"
      },
      {
        "gameID": 42062,
        "platformID": 4919,
        "title": "LEGO Harry Potter Collection"
      },
      {
        "gameID": 18573,
        "platformID": 4919,
        "title": "LEGO Marvel Super Heroes"
      },
      {
        "gameID": 50022,
        "platformID": 4919,
        "title": "LEGO Star Wars: The Force Awakens"
      },
      {
        "gameID": 52796,
        "platformID": 4919,
        "title": "Shadow of the Colossus"
      },
      {
        "gameID": 67615,
        "platformID": 4919,
        "title": "Shadow of the Tomb Raider Definitive Edition"
      },
      {
        "gameID": 76868,
        "platformID": 4919,
        "title": "Tony Hawk's Pro Skater 1 + 2"
      },
      {
        "gameID": 35301,
        "platformID": 4919,
        "title": "Uncharted 4: A Thief's End Libertalia Collector's Edition"
      },
      {
        "gameID": 41187,
        "platformID": 4919,
        "title": "OlliOlli Epic Combo Edition"
      },
      {
        "gameID": 29275,
        "platformID": 4919,
        "title": "Ratchet & Clank"
      },
      {
        "gameID": 48363,
        "platformID": 4919,
        "title": "Uncharted: The Lost Legacy"
      },
      {
        "gameID": 68992,
        "platformID": 4919,
        "title": "Untitled Goose Game"
      },
      {
        "gameID": 55247,
        "platformID": 4919,
        "title": "Red Dead Redemption 2"
      },
      {
        "gameID": 21182,
        "platformID": 4919,
        "title": "The Last of Us Remastered"
      },
      {
        "gameID": 75692,
        "platformID": 4919,
        "title": "Life is Strange: Before the Storm [Limited Edition] (EU)"
      },
      {
        "gameID": 31758,
        "platformID": 4919,
        "title": "Uncharted: The Nathan Drake Collection"
      },
      {
        "gameID": 35162,
        "platformID": 4919,
        "title": "Life is Strange - Limited Edition"
      },
      {
        "gameID": 52805,
        "platformID": 4919,
        "title": "God of War"
      },
      {
        "gameID": 43221,
        "platformID": 4919,
        "title": "Horizon Zero Dawn Collector's Edition"
      },
      {
        "gameID": 61067,
        "platformID": 4919,
        "title": "Marvel's Spider-Man [Collector's Edition]"
      },
      {
        "gameID": 69686,
        "platformID": 4919,
        "title": "Last of Us Part II [Collector’s Edition]"
      },
      {
        "gameID": 70831,
        "platformID": 4919,
        "title": "Sayonara Wild Hearts"
      },
      {
        "gameID": 67500,
        "platformID": 4919,
        "title": "Monkey King: Hero is Back"
      },
      {
        "gameID": 63395,
        "platformID": 4919,
        "title": "Starlink: Battle for Atlas (Starter Pack)"
      }
    ],
    "Xbox 360": [
      {
        "gameID": 8913,
        "platformID": 15,
        "title": "F1 2010"
      },
      {
        "gameID": 10918,
        "platformID": 15,
        "title": "The Orange Box"
      },
      {
        "gameID": 7579,
        "platformID": 15,
        "title": "skate."
      },
      {
        "gameID": 12518,
        "platformID": 15,
        "title": "Far Cry 3"
      },
      {
        "gameID": 76297,
        "platformID": 15,
        "title": "Assassin's Creed : Brotherhood [Platinum Hits]"
      },
      {
        "gameID": 17924,
        "platformID": 15,
        "title": "Assassin's Creed IV: Black Flag"
      },
      {
        "gameID": 7139,
        "platformID": 15,
        "title": "Assassin's Creed"
      },
      {
        "gameID": 8854,
        "platformID": 15,
        "title": "Assassin's Creed: Revelations"
      },
      {
        "gameID": 11954,
        "platformID": 15,
        "title": "Assassin's Creed III"
      },
      {
        "gameID": 22485,
        "platformID": 15,
        "title": "Assassin's Creed Rogue"
      },
      {
        "gameID": 2762,
        "platformID": 15,
        "title": "Assassin's Creed II"
      },
      {
        "gameID": 17412,
        "platformID": 15,
        "title": "Batman: Arkham Origins"
      },
      {
        "gameID": 7153,
        "platformID": 15,
        "title": "Bully: Scholarship Edition"
      },
      {
        "gameID": 12895,
        "platformID": 15,
        "title": "Call of Juarez"
      },
      {
        "gameID": 7167,
        "platformID": 15,
        "title": "Crackdown"
      },
      {
        "gameID": 15561,
        "platformID": 15,
        "title": "FIFA Street 3"
      },
      {
        "gameID": 8862,
        "platformID": 15,
        "title": "Driver: San Francisco"
      },
      {
        "gameID": 12516,
        "platformID": 15,
        "title": "Family Guy: Back to the Multiverse"
      },
      {
        "gameID": 41824,
        "platformID": 15,
        "title": "Bulletstorm - Epic Edition"
      },
      {
        "gameID": 9333,
        "platformID": 15,
        "title": "Deus Ex: Human Revolution"
      },
      {
        "gameID": 12062,
        "platformID": 15,
        "title": "Crackdown 2"
      },
      {
        "gameID": 24,
        "platformID": 15,
        "title": "Gears of War 2 (PAL)"
      },
      {
        "gameID": 15490,
        "platformID": 15,
        "title": "Gears of War: Judgment"
      },
      {
        "gameID": 7481,
        "platformID": 15,
        "title": "Gears of War"
      },
      {
        "gameID": 935,
        "platformID": 15,
        "title": "Gears of War 3"
      },
      {
        "gameID": 12699,
        "platformID": 15,
        "title": "Grand Theft Auto IV: The Complete Edition"
      },
      {
        "gameID": 13353,
        "platformID": 15,
        "title": "Grand Theft Auto V"
      },
      {
        "gameID": 13859,
        "platformID": 15,
        "title": "L.A. Noire: The Complete Edition"
      },
      {
        "gameID": 13091,
        "platformID": 15,
        "title": "Lips"
      },
      {
        "gameID": 13090,
        "platformID": 15,
        "title": "Lips: Number One Hits"
      },
      {
        "gameID": 13200,
        "platformID": 15,
        "title": "LEGO Star Wars: The Complete Saga"
      },
      {
        "gameID": 7515,
        "platformID": 15,
        "title": "LEGO Batman: The Videogame"
      },
      {
        "gameID": 13092,
        "platformID": 15,
        "title": "Lips: Party Classics"
      },
      {
        "gameID": 11008,
        "platformID": 15,
        "title": "Max Payne 3"
      },
      {
        "gameID": 13093,
        "platformID": 15,
        "title": "Lips: I Love the 80s"
      },
      {
        "gameID": 12565,
        "platformID": 15,
        "title": "LEGO Batman 2: DC Super Heroes"
      },
      {
        "gameID": 13198,
        "platformID": 15,
        "title": "LEGO Pirates of the Caribbean: The Video Game"
      },
      {
        "gameID": 13038,
        "platformID": 15,
        "title": "LEGO Indiana Jones: The Original Adventures"
      },
      {
        "gameID": 12800,
        "platformID": 15,
        "title": "LEGO Indiana Jones 2: The Adventure Continues"
      },
      {
        "gameID": 12773,
        "platformID": 15,
        "title": "LEGO Star Wars III: The Clone Wars"
      },
      {
        "gameID": 12328,
        "platformID": 15,
        "title": "Saints Row: The Third"
      },
      {
        "gameID": 16306,
        "platformID": 15,
        "title": "Rayman Legends"
      },
      {
        "gameID": 63699,
        "platformID": 15,
        "title": "Red Dead Redemption: Game of the Year Edition"
      },
      {
        "gameID": 12637,
        "platformID": 15,
        "title": "Saints Row 2"
      },
      {
        "gameID": 7572,
        "platformID": 15,
        "title": "Saints Row"
      },
      {
        "gameID": 65003,
        "platformID": 15,
        "title": "Perfect Dark Zero (Limited Collector's Edition)"
      },
      {
        "gameID": 17218,
        "platformID": 15,
        "title": "Saints Row IV"
      },
      {
        "gameID": 8306,
        "platformID": 15,
        "title": "Skate 3"
      },
      {
        "gameID": 14789,
        "platformID": 15,
        "title": "Skate 2"
      },
      {
        "gameID": 12523,
        "platformID": 15,
        "title": "SSX"
      },
      {
        "gameID": 7623,
        "platformID": 15,
        "title": "Stranglehold"
      },
      {
        "gameID": 15784,
        "platformID": 15,
        "title": "Tony Hawk's American Wasteland"
      },
      {
        "gameID": 7693,
        "platformID": 15,
        "title": "Tony Hawk's Project 8"
      },
      {
        "gameID": 12843,
        "platformID": 15,
        "title": "Sonic & All-Stars Racing Transformed"
      },
      {
        "gameID": 7694,
        "platformID": 15,
        "title": "Tony Hawk's Proving Ground"
      }
    ],
    "PS3": [
      {
        "gameID": 82909,
        "platformID": 12,
        "title": "007: Quantum of Solace [Collector Edition] (PAL)"
      },
      {
        "gameID": 12353,
        "platformID": 12,
        "title": "Borderlands - Game of the Year Edition"
      },
      {
        "gameID": 17631,
        "platformID": 12,
        "title": "Bureau: XCOM Declassified"
      },
      {
        "gameID": 6631,
        "platformID": 12,
        "title": "Street Fighter IV"
      },
      {
        "gameID": 10392,
        "platformID": 12,
        "title": "The Last of Us"
      },
      {
        "gameID": 28552,
        "platformID": 12,
        "title": "Ratchet & Clank: Tools of Destruction"
      },
      {
        "gameID": 46,
        "platformID": 12,
        "title": "Mirror's Edge"
      },
      {
        "gameID": 12816,
        "platformID": 12,
        "title": "The Sly Collection"
      },
      {
        "gameID": 34237,
        "platformID": 12,
        "title": "Classics HD: The Ratchet & Clank Trilogy"
      },
      {
        "gameID": 319,
        "platformID": 12,
        "title": "Heavy Rain"
      },
      {
        "gameID": 8303,
        "platformID": 12,
        "title": "Call of Duty: Modern Warfare 3"
      },
      {
        "gameID": 31413,
        "platformID": 12,
        "title": "SEGA Mega Drive: Ultimate Collection"
      },
      {
        "gameID": 12706,
        "platformID": 12,
        "title": "Need for Speed: Hot Pursuit"
      },
      {
        "gameID": 11126,
        "platformID": 12,
        "title": "Ratchet & Clank: Full Frontal Assault"
      },
      {
        "gameID": 13124,
        "platformID": 12,
        "title": "The Tomb Raider Trilogy"
      },
      {
        "gameID": 13482,
        "platformID": 12,
        "title": "Ratchet & Clank: Quest For Booty"
      },
      {
        "gameID": 6624,
        "platformID": 12,
        "title": "Prince of Persia"
      },
      {
        "gameID": 20162,
        "platformID": 12,
        "title": "LEGO The Hobbit"
      },
      {
        "gameID": 10967,
        "platformID": 12,
        "title": "ModNation Racers"
      },
      {
        "gameID": 31,
        "platformID": 12,
        "title": "Heavenly Sword"
      },
      {
        "gameID": 18224,
        "platformID": 12,
        "title": "Ratchet & Clank: Into the Nexus"
      },
      {
        "gameID": 42586,
        "platformID": 12,
        "title": "The Jak and Daxter Trilogy"
      },
      {
        "gameID": 12716,
        "platformID": 12,
        "title": "Lost Planet 2"
      },
      {
        "gameID": 36,
        "platformID": 12,
        "title": "Killzone 2"
      },
      {
        "gameID": 15780,
        "platformID": 12,
        "title": "Gran Turismo 5 Prologue"
      },
      {
        "gameID": 28550,
        "platformID": 12,
        "title": "Little Big Planet"
      },
      {
        "gameID": 6626,
        "platformID": 12,
        "title": "Ratchet & Clank Future: A Crack in Time"
      },
      {
        "gameID": 62644,
        "platformID": 12,
        "title": "Uncharted 3: Drake's Deception (Special Edition)"
      },
      {
        "gameID": 6637,
        "platformID": 12,
        "title": "Tony Hawk's Project 8"
      }
    ],
    "Xbox One": [
      {
        "gameID": 20800,
        "platformID": 4920,
        "title": "Crackdown 3"
      },
      {
        "gameID": 20792,
        "platformID": 4920,
        "title": "Sunset Overdrive"
      },
      {
        "gameID": 21415,
        "platformID": 4920,
        "title": "Batman: Arkham Knight"
      },
      {
        "gameID": 53379,
        "platformID": 4920,
        "title": "LEGO Marvel Super Heroes 2"
      },
      {
        "gameID": 41601,
        "platformID": 4920,
        "title": "Trials Fusion The Awesome Max Edition"
      },
      {
        "gameID": 46199,
        "platformID": 4920,
        "title": "Batman: Return to Arkham"
      },
      {
        "gameID": 20491,
        "platformID": 4920,
        "title": "Watch Dogs"
      },
      {
        "gameID": 32132,
        "platformID": 4920,
        "title": "Rare Replay"
      },
      {
        "gameID": 41765,
        "platformID": 4920,
        "title": "LEGO Jurassic World"
      },
      {
        "gameID": 34840,
        "platformID": 4920,
        "title": "LEGO Marvel's Avengers"
      },
      {
        "gameID": 40680,
        "platformID": 4920,
        "title": "Back to the Future: The Game"
      },
      {
        "gameID": 19196,
        "platformID": 4920,
        "title": "Tomb Raider: Definitive Edition"
      },
      {
        "gameID": 32352,
        "platformID": 4920,
        "title": "Gears of War 4"
      },
      {
        "gameID": 20798,
        "platformID": 4920,
        "title": "Rise of the Tomb Raider"
      },
      {
        "gameID": 23924,
        "platformID": 4920,
        "title": "The LEGO Movie Videogame"
      },
      {
        "gameID": 35012,
        "platformID": 4920,
        "title": "Dishonored: Definitive Edition"
      }
    ],
    "Switch": [
      {
        "gameID": 61026,
        "platformID": 4971,
        "title": "Yoshi's Crafted World"
      },
      {
        "gameID": 42320,
        "platformID": 4971,
        "title": "Super Mario Odyssey"
      },
      {
        "gameID": 52671,
        "platformID": 4971,
        "title": "Mario Tennis Aces"
      },
      {
        "gameID": 76855,
        "platformID": 4971,
        "title": "Super Mario 3D All-Stars"
      },
      {
        "gameID": 60223,
        "platformID": 4971,
        "title": "Captain Toad Treasure Tracker"
      },
      {
        "gameID": 63380,
        "platformID": 4971,
        "title": "Pokémon Sword"
      },
      {
        "gameID": 63379,
        "platformID": 4971,
        "title": "Legend of Zelda: Link's Awakening, The"
      },
      {
        "gameID": 55725,
        "platformID": 4971,
        "title": "Pokémon: Let’s Go, Eevee!"
      }
    ]
}

module.exports = function() {
    const sortedGames = {}
    let count = 0
    Object.keys(GAMES).map(key => {
        sortedGames[key] = GAMES[key].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        count += GAMES[key].length
    })
    return {
        platforms: PLATFORMS,
        games: sortedGames,
        count: {
            games: count,
            platforms: PLATFORMS.length,
        },
    }
}
