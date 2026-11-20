// Placeholder sprites for the mock-up shop scene. The illustrator's real
// sprites replace these; keys map to `.px-<key>` colours in globals.css.

export const piggy = [
  "     oooooooo",
  "   oopppoooppoo",
  "  oppppppppppppo",
  " opppppppppppppo",
  "oppppppppppopppqqo",
  "opppppppppppppqqqo",
  "oppppppppppppppqqo",
  " opppppppppppppo",
  "  oppo  oppo ppo",
  "  ooo   ooo  oo",
]

export const bulb = [
  "   oooo",
  "  oyyyyo",
  " oyzyyyyo",
  " oyzyyyyo",
  " oyyyyyyo",
  " oyyyyyyo",
  "  oyyyyo",
  "   oyyo",
  "   omno",
  "   onmo",
  "   omno",
  "    oo",
]

export const bag = [
  "    oooo",
  "   o    o",
  "   o    o",
  " oooooooooo",
  " orrrrrrrso",
  " orrrrrrrso",
  " orrrrrrrso",
  " orrrrrrrso",
  " orrrrrrrso",
  " oooooooooo",
]

export const car = [
  "    oooooo",
  "   ogggggo",
  "  oggggggo",
  " occcccccccccco",
  "occccccccccccdo",
  "occccccccccccdo",
  " ottoooooootto",
  "  oo      oo",
]

export const suitcase = [
  "     oooo",
  "     o  o",
  " oooooooooooo",
  " ovvuvvvvuvvo",
  " ovvuvvvvuvvo",
  " ovvuvvvvuvvo",
  " ovvuvvvvuvvo",
  " ovvuvvvvuvvo",
  " oooooooooooo",
  "  oo      oo",
]

export const parcel = [
  " oooooooooo",
  " obbbbubbbo",
  " obbbbubbbo",
  " ouuuuuuuuo",
  " obbbbubbbo",
  " obbbbubbbo",
  " oooooooooo",
]

export const objectFor = (category: string) =>
  ({
    banking: piggy,
    finance: piggy,
    energy: bulb,
    home: bulb,
    shopping: bag,
    transport: car,
    "ride-hailing": car,
    travel: suitcase,
  })[category.toLowerCase()] ?? parcel

export const head = [
  "     HHHHHHHHHH",
  "   HHHHHHHHHHHHHH",
  "  HHHHHHHHHHHHHHHH",
  "  HHHSSSSSSSSSSHHH",
  "  HHSSSSSSSSSSSSHH",
  "  HSSSSSSSSSSSSSSH",
  "  SSSHHHSSSSHHHSSS",
  "  SSSSSSSSSSSSSSSS",
  " TSSSSEESSSSEESSSST",
  " TSSSSEESSSSEESSSST",
  "  SSSSSSSSSSSSSSSS",
  "  SSSSSSSTTSSSSSSS",
  "  SSSSSSSSSSSSSSSS",
  "   SSSSMMMMMMSSSS",
  "    SSSSSSSSSSSS",
  "     SSSSSSSSSS",
  "       TTTTTT",
]

export const lids = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "      SS    SS",
  "      SS    SS",
]

export const body = [
  "         CCCCCC",
  "     CCCCCwCCwCCCCC",
  "   CCCCCCCwwwwCCCCCCC",
  "  CCCCCCCCCwwCCCCCCCCC",
  " CCCCCCCCCCCCCCCCCCCCCC",
  " CCCCCCCCCCDCCCCCCCCCCC",
  "CCCCCCCCCCCDCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCDCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCCCCCC",
]

export const till = [
  "   oooooooooo",
  "   oNNNNNNNNo",
  "   oNggggggNo",
  "   oNNNNNNNNo",
  " oooooooooooooo",
  " oNQNQNQNQNNNNo",
  " oNNNNNNNNNNNNo",
  " oNQNQNQNQNNNNo",
  " oNNNNNNNNNNNNo",
  " oooooooooooooo",
]

export const plant = [
  "   l  l",
  "  lll ll",
  " llLll l",
  "  llLlll",
  "   lLl",
  "  ooooo",
  "  ouuuo",
  "  ouuuo",
  "   ooo",
]
