
import type { Item, Rarity, Game, Category } from './types';

// This data is exported from the Admin Panel.
// To update, generate new data from the "Data Management" tab and paste it here.

export const MOCK_DATA_VERSION = '1.0.9';
export const USD_RATE = 26290;

const games: Game[] = [
  {
    "name": "Robux",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_on7mjzsg9"
  },
  {
    "name": "Critical Fantasy",
    "imageUrl": "https://i.imgur.com/X5nh6nt.png",
    "id": "_9ddavvq7a"
  }
];

const rarities: Rarity[] = [
  {
    "name": "get from recharge",
    "color": "#fbff00",
    "order": 0,
    "id": "_3njyfnyem"
  },
  {
    "name": "Tier I",
    "color": "#808080",
    "order": 0,
    "gameId": "_9ddavvq7a",
    "id": "_slac2btn0"
  },
  {
    "name": "Tier II",
    "color": "#00ffaa",
    "order": 1,
    "gameId": "_9ddavvq7a",
    "id": "_5yexfu4nt"
  },
  {
    "name": "Tier III",
    "color": "#006eff",
    "order": 2,
    "gameId": "_9ddavvq7a",
    "id": "_sj8fuhlus"
  },
  {
    "name": "Tier IV",
    "color": "#a347ff",
    "order": 3,
    "gameId": "_9ddavvq7a",
    "id": "_kr2zklj6p"
  },
  {
    "name": "Tier V",
    "color": "#ffdd00",
    "order": 4,
    "gameId": "_9ddavvq7a",
    "id": "_w9jpdo0e6"
  }
];

const categories: Category[] = [
  {
    "name": "Web / Pc",
    "gameId": "_on7mjzsg9",
    "id": "_dia1ywicd"
  },
  {
    "name": "Mobile",
    "gameId": "_on7mjzsg9",
    "id": "_9u5o98pbv"
  },
  {
    "name": "ZingCard",
    "gameId": "_k09r5qjb9",
    "id": "_9epoli7l7"
  },
  {
    "name": "ZaloPay / VietQR / ATM / Credit Card",
    "gameId": "_k09r5qjb9",
    "id": "_kbu900n7j"
  },
  {
    "name": "Weapons",
    "gameId": "_9ddavvq7a",
    "id": "_yvox74gos"
  },
  {
    "name": "Passives",
    "gameId": "_9ddavvq7a",
    "id": "_e66clcomz"
  },
  {
    "name": "Actives",
    "gameId": "_9ddavvq7a",
    "id": "_jzhsh0jru"
  }
];

// Item values are now in USD
const items: Item[] = [
  {
    "name": "500 Robux",
    "value": 4.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_g6xtzk529"
  },
  {
    "name": "1000 Robux",
    "value": 9.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_f7fa9irc9"
  },
  {
    "name": "2000 Robux",
    "value": 19.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_ro1wgeyep"
  },
  {
    "name": "5250 Robux",
    "value": 49.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_whgdzs3c8"
  },
  {
    "name": "11000 Robux",
    "value": 99.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_z6ffx8qjr"
  },
  {
    "name": "24000 Robux",
    "value": 199.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_d2rhjf6yx"
  },
  {
    "name": "Robux Premium",
    "value": 9.99,
    "rarity": "get from recharge",
    "categoryId": "_dia1ywicd",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/p1YmkXD.png",
    "id": "_z8eytvf67"
  },
  {
    "name": "80 Robux",
    "value": 0.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_v67h3e8ov"
  },
  {
    "name": "400 Robux",
    "value": 4.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_vwrq85cfo"
  },
  {
    "name": "800 Robux",
    "value": 9.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_wydjrd4tn"
  },
  {
    "name": "1700 Robux",
    "value": 19.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_g2gl5rzb4"
  },
  {
    "name": "4500 Robux",
    "value": 49.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_xrhl8hdom"
  },
  {
    "name": "10000 Robux",
    "value": 99.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_abr9bptrv"
  },
  {
    "name": "22500 Robux",
    "value": 199.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_alf260gpy"
  },
  {
    "name": "Roblox Premium",
    "value": 9.99,
    "rarity": "get from recharge",
    "categoryId": "_9u5o98pbv",
    "gameId": "_on7mjzsg9",
    "imageUrl": "https://i.imgur.com/p1YmkXD.png",
    "id": "_jx96n1716"
  },
  {
    "name": "55 Robux",
    "value": 0.76076,
    "rarity": "get from recharge",
    "categoryId": "_9epoli7l7",
    "gameId": "_k09r5qjb9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_c4j9peq6y"
  },
  {
    "name": "145 Robux",
    "value": 1.9,
    "rarity": "get from recharge",
    "categoryId": "_9epoli7l7",
    "gameId": "_k09r5qjb9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_nmo2sba51"
  },
  {
    "name": "300 Robux",
    "value": 3.8,
    "rarity": "get from recharge",
    "categoryId": "_9epoli7l7",
    "gameId": "_k09r5qjb9",
    "imageUrl": "https://i.imgur.com/6cWSDSc.png",
    "id": "_i0v876ng4"
  },
  {
    "name": "Wooden Bow",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/uKGA6yi.png",
    "id": "_rui16igwq"
  },
  {
    "name": "Wooden Staff",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/DWNzlYv.png",
    "id": "_rlrr33kks"
  },
  {
    "name": "Wooden Sword",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/4Htg6cF.png",
    "id": "_zi76a8va3"
  },
  {
    "name": "Divine Blade",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/YqDBu0n.png",
    "id": "_mo8xabcfb"
  },
  {
    "name": "Rootbound Spire",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/b8wSle8.png",
    "id": "_xw190n85g"
  },
  {
    "name": "Sylvan Whisper",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/0lDaUqW.png",
    "id": "_8ovovx5y3"
  },
  {
    "name": "Crescendo",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/ZeND20j.png",
    "id": "_v805ejbzf"
  },
  {
    "name": "Apiary's Fury",
    "value": 0.95095,
    "rarity": "Tier V",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/kdKFgPX.png",
    "id": "_83mxhfq6s"
  },
  {
    "name": "Dawn",
    "value": 0,
    "rarity": "Tier V",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/enf18su.png",
    "id": "_wj3go67r6"
  },
  {
    "name": "Verdant Heartwood",
    "value": 0.95095,
    "rarity": "Tier V",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/3KKoMdM.png",
    "id": "_9d281tec5"
  },
  {
    "name": "Winter Howl",
    "value": 0.95095,
    "rarity": "Tier V",
    "categoryId": "_yvox74gos",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/QUmHzuU.png",
    "id": "_nqqycrjio"
  },
  {
    "name": "Burning Torch",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/zXgoJfF.png",
    "id": "_c2g65kwe0"
  },
  {
    "name": "Hunting Dagger",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/Q2DOMZB.png",
    "id": "_ipscomjla"
  },
  {
    "name": "Lantern",
    "value": 0.0001,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/uKF0CqZ.png",
    "id": "_9gd4u95tm"
  },
  {
    "name": "Metal Plate",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/MsDzrOP.png",
    "id": "_fe6ykfult"
  },
  {
    "name": "Mining Pickaxe",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/NB2UG46.png",
    "id": "_ipyzukhk3"
  },
  {
    "name": "Rabbit's Foot",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/LdEzZJZ.png",
    "id": "_83zhsnqun"
  },
  {
    "name": "Traveller's Boots",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/C12Ar3M.png",
    "id": "_ovilduzdi"
  },
  {
    "name": "Adventurer's Kit",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/SH8dkYu.png",
    "id": "_0vzbqy3dd"
  },
  {
    "name": "Ancient Hammer",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/rWwE0eK.png",
    "id": "_0g09j9h1s"
  },
  {
    "name": "Ancient Wood Armor",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/bq4rbYp.png",
    "id": "_uo5rv609f"
  },
  {
    "name": "Climbing Hook",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/JZ2gcUa.png",
    "id": "_9sy7m0n16"
  },
  {
    "name": "Copper Sword",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/YxtLSDK.png",
    "id": "_b1oo2sb6k"
  },
  {
    "name": "Dual Swords",
    "value": 0.0001,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/xCcs8bm.png",
    "id": "_sbiaidfdh"
  },
  {
    "name": "Mana Crystal",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/EwZLIBE.png",
    "id": "_tt16f90ph"
  },
  {
    "name": "Sharpener's Rock",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/SqRcj1V.png",
    "id": "_rh4yud2kr"
  },
  {
    "name": "Verdant Cleaver",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/AtX6l2T.png",
    "id": "_vxbs4w8d2"
  },
  {
    "name": "Alderite Axe",
    "value": 0.0003,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/lwA5uxy.png",
    "id": "_7jspz11mc"
  },
  {
    "name": "Aqua Lapis",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/aKKoIId.png",
    "id": "_38vxrdtpg"
  },
  {
    "name": "Arcane Spellbook",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/7Pa3Rka.png",
    "id": "_z6qtjn6cg"
  },
  {
    "name": "Corrupted Fang",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/HKsSUwC.png",
    "id": "_i9eh17gsk"
  },
  {
    "name": "Enchanted Blade",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/OGu2jPq.png",
    "id": "_tnhuk2lbr"
  },
  {
    "name": "Magician's Hat",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/XB3dt9y.png",
    "id": "_nmjczb8kt"
  },
  {
    "name": "Mana Lantern",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/pBut1GR.png",
    "id": "_u33jimjvz"
  },
  {
    "name": "Slime King Crown",
    "value": 0.0001,
    "rarity": "Tier III",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/VflLMg1.png",
    "id": "_tptmmkm6d"
  },
  {
    "name": "Atlantis Armor",
    "value": 0.0076,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/pVuxVwy.png",
    "id": "_r0xbnn0e2"
  },
  {
    "name": "Black Wolf Necklace",
    "value": 0.0001,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/esiJyVu.png",
    "id": "_6wbfxqjey"
  },
  {
    "name": "Cinder Blade",
    "value": 0.0001,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/Txkbvgi.png",
    "id": "_vvpq7hsaq"
  },
  {
    "name": "Crimson Slime Fang",
    "value": 0.0001,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/r63H8hU.png",
    "id": "_f9r13t93a"
  },
  {
    "name": "Cursed Spellbook",
    "value": 0.0076,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/8XEAssh.png",
    "id": "_pvrpgpb90"
  },
  {
    "name": "Honey Armor",
    "value": 0.0001,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/FSFojWe.png",
    "id": "_5zbmpv5zp"
  },
  {
    "name": "Withering Overture",
    "value": 0.0076,
    "rarity": "Tier IV",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/9nyWNJR.png",
    "id": "_ujwfdr77z"
  },
  {
    "name": "Queen Bee's Crown",
    "value": 1.90188,
    "rarity": "Tier V",
    "categoryId": "_e66clcomz",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/TdhW6v2.png",
    "id": "_3gdcau049"
  },
  {
    "name": "Endurance Potion",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/qMMUzHp.png",
    "id": "_kp7g0nby9"
  },
  {
    "name": "Health Potion",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/6G3V7Dn.png",
    "id": "_gnzr7cpet"
  },
  {
    "name": "Healthy Apple",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/vCeWjXu.png",
    "id": "_0x5pa7bn7"
  },
  {
    "name": "Magic Potion",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/8zcPiJ0.png",
    "id": "_j91vfjw0x"
  },
  {
    "name": "Mana Potion",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/MXDBm9I.png",
    "id": "_hotahz8nm"
  },
  {
    "name": "Power Potion",
    "value": 0,
    "rarity": "Tier I",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/DJTwsxU.png",
    "id": "_ead2mfcoe"
  },
  {
    "name": "Dash",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "id": "_l2o2l93h0"
  },
  {
    "name": "Agility",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/ZBYeXDk.png",
    "id": "_c7ro8lsdp"
  },
  {
    "name": "Fireball Spell",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/IYOMNL5.png",
    "id": "_8cj457d8b"
  },
  {
    "name": "Golden Apple",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/uKY7qWO.png",
    "id": "_5k8tlwacr"
  },
  {
    "name": "Jump Boost",
    "value": 0,
    "rarity": "Tier II",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/goluSkH.png",
    "id": "_1axx8xfr5"
  },
  {
    "name": "Arcane Mark",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/3vYg5ql.png",
    "id": "_wy6if3j4a"
  },
  {
    "name": "Beam Strike",
    "value": 0,
    "rarity": "Tier III",
    "categoryId": "_jzhsh0jru",
    "gameId": "_9ddavvq7a",
    "imageUrl": "https://i.imgur.com/QpKurZq.png",
    "id": "_dkfvse2wu"
  }
];


const mockData = {
    items,
    rarities,
    games,
    categories,
    usdRate: USD_RATE
};

export default mockData;

    