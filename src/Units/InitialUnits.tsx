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
  const processedTroops = new Set<string>();

  // Helper function to check if two troops are adjacent
  const areAdjacent = (a: any, b: any) => {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  };

  // Find the first pair of adjacent troops of the same type to merge
  let foundMerge = false;
  
  for (const troop1 of troops) {
    if (processedTroops.has(troop1.id) || foundMerge) continue;
    
    for (const troop2 of troops) {
      if (processedTroops.has(troop2.id) || troop1.id === troop2.id) continue;
      
      // Check if troops are adjacent and can be merged
      if (areAdjacent(troop1, troop2) && 
          troop1.team === troop2.team && 
          troop1.role === troop2.role) {
        
        // Merge these two troops
        const mergedTroop = { ...troop1 };
        mergedTroop.hp = troop1.hp + troop2.hp;
        mergedTroop.maxHp = troop1.maxHp + troop2.maxHp;
        mergedTroop.attack = Math.floor((troop1.attack + troop2.attack) * 1.5); // Bonus for merging
        mergedTroop.id = `${mergedTroop.team}_merged_${mergedTroop.role}_${Date.now()}`;
        
        // Position the merged troop at the center of the two troops
        mergedTroop.x = Math.round((troop1.x + troop2.x) / 2);
        mergedTroop.y = Math.round((troop1.y + troop2.y) / 2);
        
        mergedTroops.push(mergedTroop);
        processedTroops.add(troop1.id);
        processedTroops.add(troop2.id);
        foundMerge = true;
        break;
      }
    }
    
    if (foundMerge) break;
  }
  
  // Add all remaining unprocessed troops
  troops.forEach(troop => {
    if (!processedTroops.has(troop.id)) {
      mergedTroops.push(troop);
    }
  });

  return mergedTroops;
};

// Function to generate random stats based on role
const generateRandomStats = (role: string) => {
  let hp, maxHp, attack, ammo, range, move;

  switch (role) {
    // Roman Units
    case "Legionary":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
     
    case "Centurion":
      hp = Math.floor(Math.random() * (400 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (200 - 150) + 150);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
    case "Archer":
      hp = Math.floor(Math.random() * (200 - 100) + 100);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      ammo = 10; // Ranged unit with 10 shots
      range = 3;
      move = 1;
      break;
    case "Cavalry":
      hp = Math.floor(Math.random() * (250 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0; // Melee unit
      range = 1;
      move = 3;
      break;
    case "Praetorian":
      hp = Math.floor(Math.random() * (500 - 400) + 400);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
    case "Ballista":
      hp = Math.floor(Math.random() * (50 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      ammo = 10; // Ranged unit with 10 shots
      range = 6;
      move = 0;
      break;
    case "Scorpion":
      hp = Math.floor(Math.random() * (20 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 30) + 30);
      ammo = 10; // Ranged unit with 10 shots
      range = 3;
      move = 1;
      break;
    case "Auxiliary":
      hp = Math.floor(Math.random() * (180 - 130) + 130);
      maxHp = hp;
      attack = Math.floor(Math.random() * (120 - 80) + 80);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
    case "Velites":
      hp = Math.floor(Math.random() * (100 - 60) + 60);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 40) + 40);
      ammo = 10; // Ranged unit with 10 shots
      range = 3;
      move = 1;
      break;
    case "Triarii":
      hp = Math.floor(Math.random() * (350 - 250) + 250);
      maxHp = hp;
      attack = Math.floor(Math.random() * (180 - 130) + 130);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
      // Barbarian Units
    case "Barbarian Warrior":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0; // Melee unit
      range = 1;
      move = 1;
      break;
      case "Barbarian Archer":
        hp = Math.floor(Math.random() * (150 - 100) + 100);
        maxHp = hp;
        attack = Math.floor(Math.random() * (100 - 50) + 50);
        ammo = 10; // Ranged unit with 10 shots
        range = 3;
        move = 1;
        break;
      case "Barbarian Chief":
        hp = Math.floor(Math.random() * (550 - 350) + 350);
        maxHp = hp;
        attack = Math.floor(Math.random() * (250 - 200) + 200);
        ammo = 0; // Melee unit
        range = 1;
        move = 1;
        break;
        case "Barbarian Berserker":
          hp = Math.floor(Math.random() * (350 - 300) + 300);
          maxHp = hp;
          attack = Math.floor(Math.random() * (250 - 200) + 200);
          ammo = 0; // Melee unit
          range = 1;
          move = 2;
          break;
       
      case "Barbarian Scout":
        hp = Math.floor(Math.random() * (300 - 250) + 250);
        maxHp = hp;
        attack = Math.floor(Math.random() * (250 - 200) + 200);
        ammo = 0; // Melee unit
        range = 1;
        move = 3;
        break;
      case "Barbarian Shaman":
        hp = Math.floor(Math.random() * (200 - 150) + 150);
        maxHp = hp;
        attack = Math.floor(Math.random() * (180 - 130) + 130);
        ammo = 10; // Ranged unit with 10 shots
        range = 3;
        move = 1;
        break;
      case "Barbarian Axeman":
        hp = Math.floor(Math.random() * (400 - 300) + 300);
        maxHp = hp;
        attack = Math.floor(Math.random() * (200 - 150) + 150);
        ammo = 0; // Melee unit
        range = 1;
        move = 1;
        break;
      case "Barbarian Spearman":
        hp = Math.floor(Math.random() * (250 - 200) + 200);
        maxHp = hp;
        attack = Math.floor(Math.random() * (120 - 80) + 80);
        ammo = 0; // Melee unit
        range = 1;
        move = 1;
        break;
      case "Barbarian Raider":
        hp = Math.floor(Math.random() * (180 - 130) + 130);
        maxHp = hp;
        attack = Math.floor(Math.random() * (160 - 110) + 110);
        ammo = 0; // Melee unit
        range = 1;
        move = 2;
        break;
      case "Barbarian Warlord":
        hp = Math.floor(Math.random() * (600 - 450) + 450);
        maxHp = hp;
        attack = Math.floor(Math.random() * (300 - 250) + 250);
        ammo = 0; // Melee unit
        range = 1;
        move = 1;
        break;
        // === Greek / Macedonian Units ===
case "Hoplite":
  hp = Math.floor(Math.random() * (320 - 240) + 240);
  maxHp = hp;
  attack = Math.floor(Math.random() * (150 - 110) + 110);
  ammo = 0;        // spear + shield wall
  range = 1;
  move = 1;
  break;

case "Phalangite": // sarissa phalanx
  hp = Math.floor(Math.random() * (360 - 280) + 280);
  maxHp = hp;
  attack = Math.floor(Math.random() * (170 - 130) + 130);
  ammo = 0;
  range = 2;       // long reach of sarissa
  move = 1;        // slow formation
  break;

case "Hypaspist":
  hp = Math.floor(Math.random() * (340 - 260) + 260);
  maxHp = hp;
  attack = Math.floor(Math.random() * (200 - 150) + 150);
  ammo = 0;        // elite guard, flexible
  range = 1;
  move = 2;        // quicker than phalanx
  break;

case "Companion Cavalry":
  hp = Math.floor(Math.random() * (300 - 240) + 240);
  maxHp = hp;
  attack = Math.floor(Math.random() * (230 - 180) + 180);
  ammo = 0;        // shock cavalry
  range = 1;
  move = 3;
  break;

case "Thessalian Cavalry":
  hp = Math.floor(Math.random() * (280 - 220) + 220);
  maxHp = hp;
  attack = Math.floor(Math.random() * (200 - 150) + 150);
  ammo = 0;
  range = 1;
  move = 3;
  break;

case "Peltast":
  hp = Math.floor(Math.random() * (180 - 120) + 120);
  maxHp = hp;
  attack = Math.floor(Math.random() * (110 - 70) + 70);
  ammo = 12;       // javelins
  range = 2;
  move = 2;
  break;

case "Thureophoroi":
  hp = Math.floor(Math.random() * (220 - 160) + 160);
  maxHp = hp;
  attack = Math.floor(Math.random() * (140 - 100) + 100);
  ammo = 6;        // mixed javelin + spear
  range = 2;
  move = 2;
  break;

case "Cretan Archer":
  hp = Math.floor(Math.random() * (170 - 120) + 120);
  maxHp = hp;
  attack = Math.floor(Math.random() * (130 - 90) + 90);
  ammo = 12;       // elite archers
  range = 4;
  move = 1;
  break;

case "Rhodian Slinger":
  hp = Math.floor(Math.random() * (160 - 110) + 110);
  maxHp = hp;
  attack = Math.floor(Math.random() * (120 - 80) + 80);
  ammo = 14;       // high ammo, long arc
  range = 4;
  move = 1;
  break;

case "Greek Catapult":
  hp = Math.floor(Math.random() * (60 - 30) + 30);
  maxHp = hp;
  attack = Math.floor(Math.random() * (160 - 110) + 110);
  ammo = 8;        // heavy stones/bolts
  range = 6;
  move = 0;        // static
  break;

case "Polybolos":
  hp = Math.floor(Math.random() * (70 - 40) + 40);
  maxHp = hp;
  attack = Math.floor(Math.random() * (140 - 90) + 90);
  ammo = 16;       // repeating ballista
  range = 5;
  move = 0;
  break;

case "Agema":
  hp = Math.floor(Math.random() * (380 - 300) + 300);
  maxHp = hp;
  attack = Math.floor(Math.random() * (220 - 170) + 170);
  ammo = 0;        // elite assault infantry
  range = 1;
  move = 2;
  break;

case "Greek Standard Bearer":
  hp = Math.floor(Math.random() * (240 - 200) + 200);
  maxHp = hp;
  attack = Math.floor(Math.random() * (110 - 80) + 80);
  ammo = 0;
  range = 1;
  move = 1;
  break;

    default:
      hp = 1;
      maxHp = 1;
      attack = 1;
      ammo = 0;
      range = 1;
      move = 1;
  }

  return { hp, maxHp, attack, ammo, range, move };
}; 

  export const formations = {
      // Formation 0: Chess (16 troops each) - Chess board formation
      Phalanx: [
        // ROMAN UNITS (16 total) - Chess board formation
        { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
        { id: "archer3", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 0, role: "Archer", Icon: getIconComponent(GiArcher) },
        { id: "archer5", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 0, role: "Archer", Icon: getIconComponent(GiArcher) },
        { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 1, y: 0, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
        { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 6, y: 0, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
        { id: "praetorian2", team: "Romans", name: "Praetorian", ...generateRandomStats("Praetorian"), x: 4, y: 0, role: "Praetorian", Icon: getIconComponent(GiHelmet) },
        { id: "ballista1", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 0, y: 0, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
        { id: "ballista2", team: "Romans", name: "Ballista", ...generateRandomStats("Ballista"), x: 7, y: 0, role: "Ballista", Icon: getIconComponent(GiCrossedSwords) },
       //Legionary
        { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 0, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 6, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary7", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 7, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        { id: "legionary8", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
        
  
      
        // BARBARIAN UNITS (16 total) - Chess board formation
        { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
        { id: "barbarian_archer5", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 7, role: "Barbarian Archer", Icon: getIconComponent(GiArcher) },
        { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 1, y: 7, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
        { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 6, y: 7, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
        { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 7, role: "Barbarian Archer", Icon: getIconComponent(GiArcher) },
        { id: "barbarian_berserker2", team: "Barbarians", name: "Barbarian Berserker", ...generateRandomStats("Barbarian Berserker"), x: 4, y: 7, role: "Barbarian Berserker", Icon: getIconComponent(GiCrossedSwords) },
        { id: "barbarian_axeman1", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 0, y: 7, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
        { id: "barbarian_axeman2", team: "Barbarians", name: "Barbarian Axeman", ...generateRandomStats("Barbarian Axeman"), x: 7, y: 7, role: "Barbarian Axeman", Icon: getIconComponent(GiCrossedSwords) },
        //Barbarian Warriors
        { id: "barbarian1", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 0, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian2", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 1, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian3", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 2, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian4", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 4, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian5", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 5, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian6", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 6, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian7", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 7, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) },
        { id: "barbarian8", team: "Barbarians", name: "Barbarian Warlord", ...generateRandomStats("Barbarian Warlord"), x: 3, y: 6, role: "Barbarian Warlord", Icon: getIconComponent(GiAce) }
      ],
    
      Arch: [
      // ROMAN UNITS (8 total) - Curved formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Curved formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    

    // Formation 8: Testudo (8 troops each)
    Testudo: [
      // ROMAN UNITS (8 total) - Turtle shell formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 2, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 2, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary6", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 2, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 3, role: "Archer", Icon: getIconComponent(GiArcher) },

      // BARBARIAN UNITS (8 total) - Turtle shell formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 5, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 5, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian6", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 5, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 3, y: 4, role: "Barbarian Archer", Icon: getIconComponent(GiBo) }
    ],

    // Formation 9: Circle (8 troops each)
    Circle: [
      // ROMAN UNITS (8 total) - Circular formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Circular formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 10: Staggered (10 troops each)
    Staggered: [
      // ROMAN UNITS (10 total) - Alternating positions
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 2, y: 1, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 1, y: 2, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 3, y: 2, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer3", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 5, y: 2, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 2, y: 3, role: "Cavalry", Icon: getIconComponent(GiCavalry) },
      { id: "cavalry2", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 3, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (10 total) - Alternating positions
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 2, y: 6, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 1, y: 5, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 3, y: 5, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer3", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 5, y: 5, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout1", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 2, y: 4, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) },
      { id: "barbarian_scout2", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 4, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 11: Delta (8 troops each)
    Delta: [
      // ROMAN UNITS (8 total) - Triangle formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Triangle formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 12: Tercio (8 troops each)
    Tercio: [
      // ROMAN UNITS (8 total) - Spanish square formation
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 3, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary5", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 1, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 2, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 4, y: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Spanish square formation
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 3, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian5", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 6, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 5, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 4, y: 5, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ],

    // Formation 13: Pincer (8 troops each)
    Pincer: [
      // ROMAN UNITS (8 total) - Pincer movement formation
      { id: "legionary1", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 1, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary2", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 2, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "centurion", team: "Romans", name: "Centurion", ...generateRandomStats("Centurion"), x: 3, y: 0, role: "Centurion", Icon: getIconComponent(GiHelmet) },
      { id: "legionary3", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 4, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "legionary4", team: "Romans", name: "Legionary", ...generateRandomStats("Legionary"), x: 5, y: 0, role: "Legionary", Icon: getIconComponent(GiSwordman) },
      { id: "archer1", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 2, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "archer2", team: "Romans", name: "Archer", ...generateRandomStats("Archer"), x: 4, y: 1, role: "Archer", Icon: getIconComponent(GiArcher) },
      { id: "cavalry1", team: "Romans", name: "Cavalry", ...generateRandomStats("Cavalry"), x: 3, y: 2, role: "Cavalry", Icon: getIconComponent(GiCavalry) },

      // BARBARIAN UNITS (8 total) - Pincer movement formation
      { id: "barbarian1", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 1, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian2", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 2, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_chief", team: "Barbarians", name: "Barbarian Chief", ...generateRandomStats("Barbarian Chief"), x: 3, y: 7, role: "Barbarian Chief", Icon: getIconComponent(FaCrown) },
      { id: "barbarian3", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 4, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian4", team: "Barbarians", name: "Barbarian Warrior", ...generateRandomStats("Barbarian Warrior"), x: 5, y: 7, role: "Barbarian Warrior", Icon: getIconComponent(GiAce) },
      { id: "barbarian_archer1", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 2, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_archer2", team: "Barbarians", name: "Barbarian Archer", ...generateRandomStats("Barbarian Archer"), x: 4, y: 6, role: "Barbarian Archer", Icon: getIconComponent(GiBo) },
      { id: "barbarian_scout", team: "Barbarians", name: "Barbarian Scout", ...generateRandomStats("Barbarian Scout"), x: 3, y: 5, role: "Barbarian Scout", Icon: getIconComponent(GiCavalry) }
    ]

  
  }; 