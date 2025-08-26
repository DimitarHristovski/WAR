import {
    GiSwordman,
    GiArcher,
    GiCavalry,
    GiCrossedSwords,
    GiHelmet,
    GiBo,
    GiAce,
  } from "react-icons/gi";
  import { FaCrown } from "react-icons/fa";
  
// 
  const getIconComponent = (IconComponent: React.ElementType) => () => <IconComponent />;

// Function to merge troops of the same type
export const mergeTroops = (troops: any[]) => {
  const mergedTroops: any[] = [];
  const troopGroups: { [key: string]: any[] } = {};

  // Group troops by type and team
  troops.forEach(troop => {
    const key = `${troop.team}-${troop.role}`;
    if (!troopGroups[key]) {
      troopGroups[key] = [];
    }
    troopGroups[key].push(troop);
  });

  // Merge troops of the same type
  Object.values(troopGroups).forEach(group => {
    if (group.length === 1) {
      mergedTroops.push(group[0]);
    } else {
      // Merge multiple troops of same type
      const mergedTroop = { ...group[0] };
      mergedTroop.hp = group.reduce((sum, t) => sum + t.hp, 0);
      mergedTroop.maxHp = group.reduce((sum, t) => sum + t.maxHp, 0);
      mergedTroop.attack = Math.floor(group.reduce((sum, t) => sum + t.attack, 0) * 1.5); // Bonus for merging
      mergedTroop.id = `${mergedTroop.team}_merged_${mergedTroop.role}_${Date.now()}`;
      mergedTroops.push(mergedTroop);
    }
  });

  return mergedTroops;
};

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
      hp = Math.floor(Math.random() * (200 - 100) + 100);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      break;
    case "Cavalry":
      hp = Math.floor(Math.random() * (250 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      break;
    case "Praetorian":
      hp = Math.floor(Math.random() * (500 - 400) + 400);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      break;
    case "Ballista":
      hp = Math.floor(Math.random() * (50 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      break;
    case "Scorpion":
      hp = Math.floor(Math.random() * (20 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 30) + 30);
      break;
    case "Auxiliary":
      hp = Math.floor(Math.random() * (180 - 130) + 130);
      maxHp = hp;
      attack = Math.floor(Math.random() * (120 - 80) + 80);
      break;
    case "Velites":
      hp = Math.floor(Math.random() * (100 - 60) + 60);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 40) + 40);
      break;
    case "Triarii":
      hp = Math.floor(Math.random() * (350 - 250) + 250);
      maxHp = hp;
      attack = Math.floor(Math.random() * (180 - 130) + 130);
      break;
      // Barbarian Units
    case "Barbarian Warrior":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      break;
      case "Barbarian Archer":
        hp = Math.floor(Math.random() * (150 - 100) + 100);
        maxHp = hp;
        attack = Math.floor(Math.random() * (100 - 50) + 50);
        break;
      case "Barbarian Chief":
        hp = Math.floor(Math.random() * (550 - 350) + 350);
        maxHp = hp;
        attack = Math.floor(Math.random() * (250 - 200) + 200);
        break;
        case "Barbarian Berserker":
          hp = Math.floor(Math.random() * (350 - 300) + 300);
          maxHp = hp;
          attack = Math.floor(Math.random() * (250 - 200) + 200);
          break;
       
      case "Barbarian Scout":
        hp = Math.floor(Math.random() * (300 - 250) + 250);
        maxHp = hp;
        attack = Math.floor(Math.random() * (250 - 200) + 200);
        break;
      case "Barbarian Shaman":
        hp = Math.floor(Math.random() * (200 - 150) + 150);
        maxHp = hp;
        attack = Math.floor(Math.random() * (180 - 130) + 130);
        break;
      case "Barbarian Axeman":
        hp = Math.floor(Math.random() * (400 - 300) + 300);
        maxHp = hp;
        attack = Math.floor(Math.random() * (200 - 150) + 150);
        break;
      case "Barbarian Spearman":
        hp = Math.floor(Math.random() * (250 - 200) + 200);
        maxHp = hp;
        attack = Math.floor(Math.random() * (120 - 80) + 80);
        break;
      case "Barbarian Raider":
        hp = Math.floor(Math.random() * (180 - 130) + 130);
        maxHp = hp;
        attack = Math.floor(Math.random() * (160 - 110) + 110);
        break;
      case "Barbarian Warlord":
        hp = Math.floor(Math.random() * (600 - 450) + 450);
        maxHp = hp;
        attack = Math.floor(Math.random() * (300 - 250) + 250);
        break;
    default:
      hp = 1;
      maxHp = 1;
      attack = 1;
  }

  return { hp, maxHp, attack };
}; 

  export const formations = {
      // Formation 0: Chess (16 troops each) - Chess board formation
      Phalanx: [
        // ROMAN UNITS (16 total) - Chess board formation
        { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
        { id: "archer3", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 0, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
        { id: "archer5", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 0, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
        { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 1, y: 0, range: 1, move: 3, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
        { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 6, y: 0, range: 1, move: 3, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
        { id: "praetorian2", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 4, y: 0, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
        { id: "ballista1", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 0, y: 0, range: 3, move: 1, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
        { id: "ballista2", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 7, y: 0, range: 3, move: 1, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
       //Legionary
        { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 7, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },

      
        // BARBARIAN UNITS (16 total) - Chess board formation
        { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
        { id: "barbarian_archer5", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 7, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiArcher) },
        { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 1, y: 7, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
        { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 6, y: 7, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
        { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 7, range: 1, move: 2, role: "Barbarian Archer", Icon: getIconComponent(GiArcher) },
        { id: "barbarian_berserker2", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 4, y: 7, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
        { id: "barbarian_axeman1", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 0, y: 7, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
        { id: "barbarian_axeman2", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 7, y: 7, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
        //Barbarian Warriors
        { id: "barbarian1", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 0, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian2", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian3", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian4", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian5", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian6", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 6, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian7", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 7, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian8", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 3, y: 6, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) }
      ],
    
      Arch: [
      // ROMAN UNITS (8 total) - Curved formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Curved formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 2: Wedge (10 troops each)
    Wedge: [
      // ROMAN UNITS (10 total) - Triangular formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },

      // BARBARIAN UNITS (10 total) - Triangular formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian_warrior1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_berserker1", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 2, y: 4, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_berserker2", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 4, y: 4, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) }
    ],

    // Formation 3: V (12 troops each)
    V: [
      // ROMAN UNITS (12 total) - V-shaped formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "praetorian1", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 2, y: 5, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
      { id: "praetorian2", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 4, y: 5, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
      { id: "ballista1", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 3, y: 6, range: 4, move: 1, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },

      // BARBARIAN UNITS (12 total) - V-shaped formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian_warrior1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 2, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_axeman1", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 2, y: 2, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_axeman2", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 4, y: 2, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_berserker1", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 3, y: 1, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) }
    ],

    // Formation 4: Echelon (10 troops each)
    Echelon: [
      // ROMAN UNITS (10 total) - Staggered diagonal formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 2, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 0, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 1, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 3, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "praetorian1", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 1, y: 5, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },

      // BARBARIAN UNITS (10 total) - Staggered diagonal formation
      { id: "barbarian_warrior1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 5, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian_warrior3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_warrior4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 7, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 6, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 4, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_axeman1", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 5, y: 2, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) }
    ],

    // Formation 5: Hollow Square (16 troops each)
    HollowSquare: [
      // ROMAN UNITS (16 total) - Square with empty center
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary9", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary10", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary11", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary12", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary13", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary14", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary15", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary16", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },

      // BARBARIAN UNITS (16 total) - Square with empty center
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian8", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian9", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian10", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian11", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian12", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian13", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian14", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian15", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian16", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) }
    ],

    // Formation 6: Line (8 troops each)
    Line: [
      // ROMAN UNITS (8 total) - Straight line formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Straight line formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 7: Triple Line (12 troops each)
    TripleLine: [
      // ROMAN UNITS (12 total) - Three parallel lines
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 1, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 1, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 5, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (12 total) - Three parallel lines
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 6, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 1, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 5, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 8: Testudo (8 troops each)
    Testudo: [
      // ROMAN UNITS (8 total) - Turtle shell formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 2, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 3, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },

      // BARBARIAN UNITS (8 total) - Turtle shell formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 3, y: 4, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) }
    ],

    // Formation 9: Circle (12 troops each)
    Circle: [
      // ROMAN UNITS (12 total) - Circular formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 4, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 5, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (12 total) - Circular formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 0, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 0, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian8", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 3, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 2, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 10: Staggered (10 troops each)
    Staggered: [
      // ROMAN UNITS (10 total) - Alternating positions
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 2, y: 1, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer3", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 2, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (10 total) - Alternating positions
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 3, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer3", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 5, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 2, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 11: Delta (14 troops each)
    Delta: [
      // ROMAN UNITS (14 total) - Triangle formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary9", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 1, y: 4, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 5, y: 4, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 5, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 5, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },

      // BARBARIAN UNITS (14 total) - Triangle formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 0, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian8", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian9", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 1, y: 3, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 5, y: 3, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 2, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 2, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) }
    ],

    // Formation 12: Tercio (16 troops each)
    Tercio: [
      // ROMAN UNITS (16 total) - Spanish square formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary9", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary10", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary11", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary12", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 3, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 5, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (16 total) - Spanish square formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 0, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian7", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian8", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian9", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian10", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian11", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian12", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 4, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 2, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 13: Pincer (18 troops each)
    Pincer: [
      // ROMAN UNITS (18 total) - Pincer movement formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, range: 1, move: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 2, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 3, range: 1, move: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 4, range: 3, move: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "praetorian1", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 2, y: 5, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
      { id: "praetorian2", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 4, y: 5, range: 1, move: 1, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
      { id: "ballista1", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 1, y: 6, range: 4, move: 1, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
      { id: "ballista2", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 5, y: 6, range: 4, move: 1, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
      { id: "scorpion1", team: "Romans", name: "Scorpion", ...generateRandomStats("Scorpion"), x: 2, y: 7, range: 3, move: 1, role: "Scorpion", Icon: getIconComponent(GiCrossedSwords) },
      { id: "scorpion2", team: "Romans", name: "Scorpion", ...generateRandomStats("Scorpion"), x: 4, y: 7, range: 3, move: 1, role: "Scorpion", Icon: getIconComponent(GiCrossedSwords) },
      { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 6, range: 1, move: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },

      // BARBARIAN UNITS (18 total) - Pincer movement formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, range: 1, move: 1, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 0, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 6, y: 5, range: 1, move: 1, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 2, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 4, range: 1, move: 3, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 3, range: 3, move: 1, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_axeman1", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 2, y: 2, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_axeman2", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 4, y: 2, range: 1, move: 1, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_berserker1", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 1, y: 1, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_berserker2", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 5, y: 1, range: 1, move: 2, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
      { id: "barbarian_warlord", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 3, y: 0, range: 1, move: 1, role: "Barbarian Warlord", Icon: getIconComponent(FaCrown) }
    ],

  
  }; 