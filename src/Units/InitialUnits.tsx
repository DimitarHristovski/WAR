import {
    GiSwordman,
    GiArcher,
    GiCavalry,
    GiShield,
    GiCrossedSwords,
    GiHelmet,
    GiSpears,
    GiBo,
    GiAce,
    GiDaggers,
    GiWorld,
    GiShieldEchoes,
  } from "react-icons/gi";
  import { FaCrown } from "react-icons/fa";
  
// 
  const getIconComponent = (IconComponent: React.ElementType) => () => <IconComponent />;

// Function to generate random stats based on role
const generateRandomStats = (role: string) => {
  let hp, maxHp, attack;

  switch (role) {
    // Roman Units
    case "Legionary":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      break;
     
    case "Centurion":
      hp = Math.floor(Math.random() * (400 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (200 - 150) + 150);
      break;
    case "Archer":
      hp = Math.floor(Math.random() * (150 - 100) + 100);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 40) + 40);
      break;
    case "Cavalry":
      hp = Math.floor(Math.random() * (250 - 180) + 180);
      maxHp = hp;
      attack = Math.floor(Math.random() * (180 - 120) + 120);
      break;
      // Barbarian Units
    case "Barbarian Warrior":
      hp = Math.floor(Math.random() * (200 - 120) + 120);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 60) + 60);
      break;
      case "Barbarian Archer":
        hp = Math.floor(Math.random() * (180 - 140) + 140);
        maxHp = hp;
        attack = Math.floor(Math.random() * (90 - 50) + 50);
        break;
      case "Barbarian Chief":
        hp = Math.floor(Math.random() * (550 - 350) + 350);
        maxHp = hp;
        attack = Math.floor(Math.random() * (260 - 190) + 190);
        break;
        case "Barbarian Berserker":
          hp = Math.floor(Math.random() * (380 - 320) + 320);
          maxHp = hp;
          attack = Math.floor(Math.random() * (240 - 180) + 180);
          break;
       
      case "Barbarian Scout":
        hp = Math.floor(Math.random() * (100 - 60) + 60);
        maxHp = hp;
        attack = Math.floor(Math.random() * (70 - 40) + 40);
        break;
    default:
      hp = 1;
      maxHp = 1;
      attack = 1;
  }

  return { hp, maxHp, attack };
}; 

  export const formations = {
    Phalanx: [
        // ROMAN FRONTLINE (Up front)
    { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1,  role: "Centurion", Icon: getIconComponent(GiHelmet) },
    { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 0, range: 3, move: 1,  role: "Archer", Icon: getIconComponent(GiArcher) },
    { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 0, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    
        // ROMAN SUPPORT (Behind front line)
    { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 1, y: 1, range: 1, move: 2,  role: "Cavalry", Icon: getIconComponent(GiCavalry) },
    { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, range: 3, move: 1,  role: "Archer", Icon: getIconComponent(GiArcher) },
    { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "archer3", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
    { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 5, y: 1, range: 1, move: 2,  role: "Cavalry", Icon: getIconComponent(GiCavalry) },
    { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 1, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },

        // BARBARIAN UNITS (Enemy)
    { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    
    { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 4, y: 7, range: 1, move: 1,  role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
    { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1,  role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },

    { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 6, range: 2, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
    { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, range: 1, move: 1,  role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian_berserker", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 4, y: 6, range: 1, move: 1,  role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
    { id: "barbarian8", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1,  role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 6, y: 6, range: 2, move: 1,  role: "Barbarian Archer", Icon: getIconComponent(GiBo) }
  ],
  Spearhead: [
    // ROMAN FRONTLINE
    { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 1, range: 1, move: 2,  role: "Cavalry", Icon: getIconComponent(GiCavalry) },
    { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 1, range: 1, move: 2,  role: "Cavalry", Icon: getIconComponent(GiCavalry) },

    // ROMAN MIDFIELD
    { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 2, range: 3, move: 1,  role: "Archer", Icon: getIconComponent(GiArcher) },
    { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 5, y: 2, range: 1, move: 1,  role: "Centurion", Icon: getIconComponent(GiHelmet) },
    { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },

    // ROMAN BACKLINE
    { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },

    // BARBARIAN UNITS
    { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 1, y: 6, range: 1, move: 2,  role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
    { id: "barbarian_berserker", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 6, y: 6, range: 1, move: 2,  role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
    { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, range: 2, move: 1,  role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
    { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 0, y: 7, range: 2, move: 2,  role: "Barbarian Archer", Icon: getIconComponent(GiBo) },

  ],
  Ambush: [
    // ROMAN AMBUSH UNITS
    { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 1, range: 1, move: 2,  role: "Cavalry", Icon: getIconComponent(GiCavalry) },
    { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
    { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 5, y: 1, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
    { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 2, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },

    // ROMAN BACKUP
    { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 3, range: 1, move: 1,  role: "Legionary", Icon: getIconComponent(GiSwordman) },
    { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },

    // BARBARIAN UNITS
    { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1,  role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
    { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 1, y: 6, range: 1, move: 2,  role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
    { id: "barbarian_berserker", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 6, y: 6, range: 1, move: 2,  role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
    { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, range: 2, move: 1,  role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
    { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 0, y: 0, range: 2, move: 2,  role: "Barbarian Archer", Icon: getIconComponent(GiBo) },

  ]
  }; 