// CodeConq - Grid Strategy Game with Highlights and Expanded Features
// Now includes: Health Bars, Kill Counters, Special Ability Tooltips, and Custom Drag & Drop Setup

import { useState, useEffect } from "react";
import { formations } from "./Units/InitialUnits";
import { motion } from "framer-motion";

const GRID_SIZE = 8;

// Available troop types for custom setup - using existing definitions
const AVAILABLE_TROOPS = {
  Romans: [
    { role: "Legionary", name: "Legionary", Icon: "⚔️" },
    { role: "Centurion", name: "Centurion", Icon: "🪖" },
    { role: "Archer", name: "Archer", Icon: "🏹" },
    { role: "Cavalry", name: "Cavalry", Icon: "🐎" },
    { role: "Praetorian", name: "Praetorian", Icon: "🪖" },
    { role: "Ballista", name: "Ballista", Icon: "⚔️" },
    { role: "Scorpion", name: "Scorpion", Icon: "⚔️" },
    { role: "Auxiliary", name: "Auxiliary", Icon: "⚔️" },
    { role: "Velites", name: "Velites", Icon: "🏹" },
    { role: "Triarii", name: "Triarii", Icon: "⚔️" }
  ],
  Barbarians: [
    { role: "Barbarian Warrior", name: "Barbarian Warrior", Icon: "🪓" },
    { role: "Barbarian Archer", name: "Barbarian Archer", Icon: "🏹" },
    { role: "Barbarian Chief", name: "Barbarian Chief", Icon: "👑" },
    { role: "Barbarian Berserker", name: "Barbarian Berserker", Icon: "⚔️" },
    { role: "Barbarian Scout", name: "Barbarian Scout", Icon: "🐎" },
    { role: "Barbarian Shaman", name: "Barbarian Shaman", Icon: "🏹" },
    { role: "Barbarian Axeman", name: "Barbarian Axeman", Icon: "⚔️" },
    { role: "Barbarian Spearman", name: "Barbarian Spearman", Icon: "⚔️" },
    { role: "Barbarian Raider", name: "Barbarian Raider", Icon: "⚔️" },
    { role: "Barbarian Warlord", name: "Barbarian Warlord", Icon: "🪓" }
  ],
  Greeks: [
    { role: "Hoplite", name: "Hoplite", Icon: "⚔️" },
    { role: "Phalangite", name: "Phalangite", Icon: "⚔️" },
    { role: "Hypaspist", name: "Hypaspist", Icon: "⚔️" },
    { role: "Companion Cavalry", name: "Companion Cavalry", Icon: "🐎" },
    { role: "Thessalian Cavalry", name: "Thessalian Cavalry", Icon: "🐎" },
    { role: "Peltast", name: "Peltast", Icon: "🏹" },
    { role: "Thureophoroi", name: "Thureophoroi", Icon: "⚔️" },
    { role: "Cretan Archer", name: "Cretan Archer", Icon: "🏹" },
    { role: "Rhodian Slinger", name: "Rhodian Slinger", Icon: "🏹" },
    { role: "Greek Catapult", name: "Greek Catapult", Icon: "⚔️" },
    { role: "Polybolos", name: "Polybolos", Icon: "⚔️" },
    { role: "Agema", name: "Agema", Icon: "⚔️" },
    { role: "Greek Standard Bearer", name: "Greek Standard Bearer", Icon: "🪖" }
  ]
};

// Function to generate stats for custom troops (similar to InitialUnits.tsx)
const generateCustomTroopStats = (role: string) => {
  let hp, maxHp, attack, ammo, range, move;

  switch (role) {
    // Roman Units
    case "Legionary":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Centurion":
      hp = Math.floor(Math.random() * (400 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (200 - 150) + 150);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Archer":
      hp = Math.floor(Math.random() * (200 - 100) + 100);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      ammo = 10;
      range = 3;
      move = 1;
      break;
    case "Cavalry":
      hp = Math.floor(Math.random() * (250 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0;
      range = 1;
      move = 3;
      break;
    case "Praetorian":
      hp = Math.floor(Math.random() * (500 - 400) + 400);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Ballista":
      hp = Math.floor(Math.random() * (50 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      ammo = 10;
      range = 6;
      move = 0;
      break;
    case "Scorpion":
      hp = Math.floor(Math.random() * (20 - 10) + 10);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 30) + 30);
      ammo = 10;
      range = 3;
      move = 1;
      break;
    case "Auxiliary":
      hp = Math.floor(Math.random() * (180 - 130) + 130);
      maxHp = hp;
      attack = Math.floor(Math.random() * (120 - 80) + 80);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Velites":
      hp = Math.floor(Math.random() * (100 - 60) + 60);
      maxHp = hp;
      attack = Math.floor(Math.random() * (80 - 40) + 40);
      ammo = 10;
      range = 3;
      move = 1;
      break;
    case "Triarii":
      hp = Math.floor(Math.random() * (350 - 250) + 250);
      maxHp = hp;
      attack = Math.floor(Math.random() * (180 - 130) + 130);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    // Barbarian Units
    case "Barbarian Warrior":
      hp = Math.floor(Math.random() * (300 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 100) + 100);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Barbarian Archer":
      hp = Math.floor(Math.random() * (150 - 100) + 100);
      maxHp = hp;
      attack = Math.floor(Math.random() * (100 - 50) + 50);
      ammo = 10;
      range = 3;
      move = 1;
      break;
    case "Barbarian Chief":
      hp = Math.floor(Math.random() * (550 - 350) + 350);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Barbarian Berserker":
      hp = Math.floor(Math.random() * (350 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      ammo = 0;
      range = 1;
      move = 2;
      break;
    case "Barbarian Scout":
      hp = Math.floor(Math.random() * (300 - 250) + 250);
      maxHp = hp;
      attack = Math.floor(Math.random() * (250 - 200) + 200);
      ammo = 0;
      range = 1;
      move = 3;
      break;
    case "Barbarian Shaman":
      hp = Math.floor(Math.random() * (200 - 150) + 150);
      maxHp = hp;
      attack = Math.floor(Math.random() * (180 - 130) + 130);
      ammo = 10;
      range = 3;
      move = 1;
      break;
    case "Barbarian Axeman":
      hp = Math.floor(Math.random() * (400 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (200 - 150) + 150);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Barbarian Spearman":
      hp = Math.floor(Math.random() * (250 - 200) + 200);
      maxHp = hp;
      attack = Math.floor(Math.random() * (120 - 80) + 80);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Barbarian Raider":
      hp = Math.floor(Math.random() * (180 - 130) + 130);
      maxHp = hp;
      attack = Math.floor(Math.random() * (160 - 110) + 110);
      ammo = 0;
      range = 1;
      move = 2;
      break;
    case "Barbarian Warlord":
      hp = Math.floor(Math.random() * (600 - 450) + 450);
      maxHp = hp;
      attack = Math.floor(Math.random() * (300 - 250) + 250);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    // Greek Units
    case "Hoplite":
      hp = Math.floor(Math.random() * (320 - 240) + 240);
      maxHp = hp;
      attack = Math.floor(Math.random() * (150 - 110) + 110);
      ammo = 0;
      range = 1;
      move = 1;
      break;
    case "Phalangite":
      hp = Math.floor(Math.random() * (360 - 280) + 280);
      maxHp = hp;
      attack = Math.floor(Math.random() * (170 - 130) + 130);
      ammo = 0;
      range = 2;
      move = 1;
      break;
    case "Hypaspist":
      hp = Math.floor(Math.random() * (340 - 260) + 260);
      maxHp = hp;
      attack = Math.floor(Math.random() * (200 - 150) + 150);
      ammo = 0;
      range = 1;
      move = 2;
      break;
    case "Companion Cavalry":
      hp = Math.floor(Math.random() * (300 - 240) + 240);
      maxHp = hp;
      attack = Math.floor(Math.random() * (230 - 180) + 180);
      ammo = 0;
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
      ammo = 12;
      range = 2;
      move = 2;
      break;
    case "Thureophoroi":
      hp = Math.floor(Math.random() * (220 - 160) + 160);
      maxHp = hp;
      attack = Math.floor(Math.random() * (140 - 100) + 100);
      ammo = 6;
      range = 2;
      move = 2;
      break;
    case "Cretan Archer":
      hp = Math.floor(Math.random() * (170 - 120) + 120);
      maxHp = hp;
      attack = Math.floor(Math.random() * (130 - 90) + 90);
      ammo = 12;
      range = 4;
      move = 1;
      break;
    case "Rhodian Slinger":
      hp = Math.floor(Math.random() * (160 - 110) + 110);
      maxHp = hp;
      attack = Math.floor(Math.random() * (120 - 80) + 80);
      ammo = 14;
      range = 4;
      move = 1;
      break;
    case "Greek Catapult":
      hp = Math.floor(Math.random() * (60 - 30) + 30);
      maxHp = hp;
      attack = Math.floor(Math.random() * (160 - 110) + 110);
      ammo = 8;
      range = 6;
      move = 0;
      break;
    case "Polybolos":
      hp = Math.floor(Math.random() * (70 - 40) + 40);
      maxHp = hp;
      attack = Math.floor(Math.random() * (140 - 90) + 90);
      ammo = 16;
      range = 5;
      move = 0;
      break;
    case "Agema":
      hp = Math.floor(Math.random() * (380 - 300) + 300);
      maxHp = hp;
      attack = Math.floor(Math.random() * (220 - 170) + 170);
      ammo = 0;
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

// Icon mapping
const ICON_MAP = {
  GiSwordman: "⚔️",
  GiArcher: "🏹",
  GiCavalry: "🐎",
  GiCrossedSwords: "⚔️",
  GiHelmet: "🪖",
  GiBo: "🏹",
  GiAce: "🪓",
  FaCrown: "👑"
};

function CodeConq() {
  const [currentFormation, setCurrentFormation] = useState<keyof typeof formations>("Phalanx");
  const [units, setUnits] = useState(formations["Phalanx"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [turn, setTurn] = useState("Romans");
  const [log, setLog] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  
  // Custom setup mode states
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [customUnits, setCustomUnits] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<"Romans" | "Barbarians" | "Greeks">("Romans");
  const [draggedTroop, setDraggedTroop] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);

  // Update units when formation changes
  useEffect(() => {
    if (formations[currentFormation]) {
      setUnits(formations[currentFormation]);
      setSelectedId(null);
      setTurn("Romans");
      setRound(1);
      setLog([]);
      setGameStarted(false);
    }
  }, [currentFormation]);

  const getUnit = (x: number, y: number) => {
    const currentUnits = isSetupMode ? customUnits : units;
    return currentUnits?.find((u: any) => u.x === x && u.y === y);
  };
  
  const getUnitById = (id: string | null) => {
    const currentUnits = isSetupMode ? customUnits : units;
    return currentUnits?.find((u: any) => u.id === id);
  };
  
  const isInRange = (a: any, b: any, range: number) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= range;
  const selected = getUnitById(selectedId);

  // Safety check - don't render if units is not properly initialized
  if (!units || units.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading formation...</div>
      </div>
    );
  }

  const highlightMove = selected && (isSetupMode ? customUnits : units) ? [...Array(GRID_SIZE)].flatMap((_, y) =>
    [...Array(GRID_SIZE)].map((_, x) => {
      const distance = Math.abs(x - selected.x) + Math.abs(y - selected.y);
      return (distance <= selected.move && !getUnit(x, y)) ? `${x},${y}` : null;
    }).filter(Boolean)
  ) : [];

  const highlightAttack = selected && (isSetupMode ? customUnits : units) ? [...Array(GRID_SIZE)].flatMap((_, y) =>
    [...Array(GRID_SIZE)].map((_, x) => {
      const target = getUnit(x, y);
      const distance = Math.abs(x - selected.x) + Math.abs(y - selected.y);
      return (target && target.team !== selected.team && distance <= selected.range) ? `${x},${y}` : null;
    }).filter(Boolean)
  ) : [];

  const handleClick = (x: number, y: number) => {
    if (isSetupMode) {
      handleSetupClick(x, y);
      return;
    }
    
    if (turn !== "Romans" || !units) return;
    
    const clicked = getUnit(x, y);

    if (clicked && clicked.team === "Romans") {
      setSelectedId(clicked.id);
    } else if (selected) {
      if (clicked && (clicked.team === "Barbarians" || clicked.team === "Greeks") && isInRange(selected, clicked, selected.range)) {
        // Check if target is alive
        if (clicked.hp <= 0) {
          setLog((prevLog) => [`${clicked.name} is already dead!`, ...prevLog]);
          return;
        }
        
        // Attack enemy (Barbarians or Greeks)
        const dmg = selected.attack;
        clicked.hp -= dmg;
        
        // If this is a ranged attack, reduce ammunition
        if (selected.ammo && selected.ammo > 0) {
          selected.ammo -= 1;
          setLog((prevLog) => [`${selected.name} (Romans) attacked ${clicked.name} (${clicked.team}) for ${dmg} (${selected.ammo} shots remaining)`, ...prevLog]);
          
          // If out of ammo, switch to melee
          if (selected.ammo === 0) {
            selected.range = 1; // Switch to melee range
            setLog((prevLog) => [`${selected.name} is out of ammo! Switching to melee combat.`, ...prevLog]);
          }
        } else {
          setLog((prevLog) => [`${selected.name} (Romans) attacked ${clicked.name} (${clicked.team}) for ${dmg}`, ...prevLog]);
        }
        
        // Check if target was killed
        if (clicked.hp <= 0) {
          setLog((prevLog) => [`${clicked.name} (${clicked.team}) was killed!`, ...prevLog]);
          // Immediately remove dead unit
          setUnits((prev) => prev.filter((u: any) => u.hp > 0));
        }
        
        setSelectedId(null);
        setTurn("Barbarians");
      } else if (!clicked && isInRange(selected, { x, y }, selected.move)) {
        // Move to empty space
        setUnits((prev) => prev.map((u: any) => u.id === selected.id ? { ...u, x, y } : u));
        setSelectedId(null);
        setTurn("Barbarians");
      }
    }
  };

  const handleSetupClick = (x: number, y: number) => {
    if (draggedTroop) {
      // Check if position is valid (not occupied)
      if (!getUnit(x, y)) {
        // Check team limits
        const teamCount = customUnits.filter(u => u.team === selectedTeam).length;
        if (teamCount < 16) {
          const stats = generateCustomTroopStats(draggedTroop.role);
          const newTroop = {
            ...draggedTroop,
            ...stats,
            id: `${selectedTeam}_${draggedTroop.role}_${Date.now()}`,
            team: selectedTeam,
            x,
            y,
            Icon: draggedTroop.Icon
          };
          
          setCustomUnits(prev => [...prev, newTroop]);
          setDraggedTroop(null);
        }
      }
    } else {
      // Select existing unit for removal
      const existingUnit = getUnit(x, y);
      if (existingUnit) {
        setCustomUnits(prev => prev.filter(u => u.id !== existingUnit.id));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    if (draggedTroop && !getUnit(x, y)) {
      // Check team limits
      const teamCount = customUnits.filter(u => u.team === selectedTeam).length;
      if (teamCount < 16) {
        const stats = generateCustomTroopStats(draggedTroop.role);
        const newTroop = {
          ...draggedTroop,
          ...stats,
          id: `${selectedTeam}_${draggedTroop.role}_${Date.now()}`,
          team: selectedTeam,
          x,
          y,
          Icon: draggedTroop.Icon
        };
        
        setCustomUnits(prev => [...prev, newTroop]);
        setDraggedTroop(null);
      }
    }
  };

  const startCustomGame = () => {
    if (customUnits.length === 0) return;
    
    setIsSetupMode(false);
    setUnits(customUnits);
    setGameStarted(true);
    setSelectedId(null);
    setTurn("Romans");
    setRound(1);
    setLog([]);
  };

  const resetCustomSetup = () => {
    setCustomUnits([]);
    setDraggedTroop(null);
    setSelectedTeam("Romans");
  };

  const getTeamCount = (team: string) => {
    return customUnits.filter(u => u.team === team).length;
  };

  // Automatic movement for AI teams (Barbarians and Greeks) - one unit at a time
  useEffect(() => {
    if (isSetupMode || (turn !== "Barbarians" && turn !== "Greeks") || !units) return;
    
    const timeout = setTimeout(() => {
      const currentTeam = turn;
      const enemies = units.filter((u: any) => u.team === currentTeam);
      const players = units.filter((u: any) => u.team !== currentTeam);
      
      if (enemies.length === 0 || players.length === 0) {
        // Move to next team's turn
        if (currentTeam === "Barbarians") {
          setTurn("Greeks");
        } else if (currentTeam === "Greeks") {
          setTurn("Romans");
        }
        return;
      }

      // Find the current team's unit that's closest to any enemy
      let bestEnemy = enemies[0];
      let bestDistance = Infinity;
      
      enemies.forEach((enemy) => {
        const closestPlayer = players.reduce((prev, curr) => {
          const prevDist = Math.abs(enemy.x - prev.x) + Math.abs(enemy.y - prev.y);
          const currDist = Math.abs(enemy.x - curr.x) + Math.abs(enemy.y - curr.y);
          return currDist < prevDist ? curr : prev;
        });
        
        const distance = Math.abs(enemy.x - closestPlayer.x) + Math.abs(enemy.y - closestPlayer.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestEnemy = enemy;
        }
      });
      
      // Move or attack with the best unit
      const target = players.reduce((prev, curr) => {
        const prevDist = Math.abs(bestEnemy.x - prev.x) + Math.abs(bestEnemy.y - prev.y);
        const currDist = Math.abs(bestEnemy.x - curr.x) + Math.abs(bestEnemy.y - curr.y);
        return currDist < prevDist ? curr : prev;
      });
      
      // Check if target is alive
      if (target.hp <= 0) {
        // Target is dead, move to next team's turn
        if (currentTeam === "Barbarians") {
          setTurn("Greeks");
        } else if (currentTeam === "Greeks") {
          setTurn("Romans");
          setRound((r) => r + 1);
        }
        return;
      }
      
      const distX = target.x - bestEnemy.x;
      const distY = target.y - bestEnemy.y;
      
      if (Math.abs(distX) + Math.abs(distY) <= bestEnemy.range) {
        // Attack if in range
        target.hp -= bestEnemy.attack;
        
        // Check if target was killed
        if (target.hp <= 0) {
          setLog((log) => [`${target.name} (${target.team}) was killed by ${bestEnemy.name} (${currentTeam})!`, ...log]);
          // Immediately remove dead unit
          setUnits((prev) => prev.filter((u: any) => u.hp > 0));
        }
        
        // If this is a ranged attack, reduce ammunition
        if (bestEnemy.ammo && bestEnemy.ammo > 0) {
          bestEnemy.ammo -= 1;
          setLog((log) => [`${bestEnemy.name} (${currentTeam}) attacked ${target.name} (${target.team}) for ${bestEnemy.attack} (${bestEnemy.ammo} shots remaining)`, ...log]);
          
          // If out of ammo, switch to melee
          if (bestEnemy.ammo === 0) {
            bestEnemy.range = 1; // Switch to melee range
            setLog((log) => [`${bestEnemy.name} is out of ammo! Switching to melee combat.`, ...log]);
          }
        } else {
          setLog((log) => [`${bestEnemy.name} (${currentTeam}) attacked ${target.name} (${target.team}) for ${bestEnemy.attack}`, ...log]);
        }
      } else {
        // Move towards enemy
        let moveX = 0, moveY = 0;
        if (Math.abs(distX) > Math.abs(distY)) {
          moveX = Math.sign(distX);
        } else {
          moveY = Math.sign(distY);
        }
        
        const newX = bestEnemy.x + moveX;
        const newY = bestEnemy.y + moveY;
        const alreadyOccupied = getUnit(newX, newY);
        
        if (!alreadyOccupied) {
          bestEnemy.x = newX;
          bestEnemy.y = newY;
          setLog((log) => [`${bestEnemy.name} (${currentTeam}) moved`, ...log]);
        }
      }
      
      setUnits([...units].filter((u: any) => u.hp > 0));
      
      // Move to next team's turn
      if (currentTeam === "Barbarians") {
        setTurn("Greeks");
      } else if (currentTeam === "Greeks") {
        setTurn("Romans");
        setRound((r) => r + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [turn, units, isSetupMode]);

  const checkEnd = () => {
    const currentUnits = isSetupMode ? customUnits : units;
    if (!currentUnits || currentUnits.length === 0) return null;
    
    const romansLeft = currentUnits.some((u: any) => u.team === "Romans");
    const barbariansLeft = currentUnits.some((u: any) => u.team === "Barbarians");
    const greeksLeft = currentUnits.some((u: any) => u.team === "Greeks");
    
    if (!romansLeft && !greeksLeft) return "Game Over - Barbarians Win!";
    if (!barbariansLeft) return "Victory - Romans & Greeks Win!";
    return null;
  };

  const restartGame = () => {
    if (!formations || Object.keys(formations).length === 0) return;
    
    const formationKeys = Object.keys(formations) as Array<keyof typeof formations>;
    const currentIndex = formationKeys.indexOf(currentFormation);
    const nextFormation = formationKeys[(currentIndex + 1) % formationKeys.length];
    
    // Reset all game state
    setSelectedId(null);
    setTurn("Romans");
    setLog([]);
    setRound(1);
    setGameStarted(false);
    setIsSetupMode(false);
    setCustomUnits([]);
    
    // Update formation and units in sequence
    setCurrentFormation(nextFormation);
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 space-y-6 bg-gradient-to-br from-green-800 via-green-700 to-green-900 min-h-screen">
      {/* Game Header */}
      <div className="game-ui p-6 text-center">
        <h1 className="text-4xl font-bold text-yellow-200 mb-2 drop-shadow-lg">Romans vs Barbarians</h1>
        <p className="text-yellow-100 text-lg">Player vs AI Battle</p>
        <p className="text-green-200 text-sm mt-2">
          {isSetupMode ? "Custom Setup Mode - Drag troops to place them on the field" : "You control the Romans! Click to select and move/attack Barbarians OR Greeks. All teams fight each other in a three-way battle."}
        </p>
      </div>

      {/* Game Controls */}
      <div className="game-ui p-4 flex flex-wrap gap-4 items-center justify-center">
        {!isSetupMode && (
          <button
            onClick={() => setIsSetupMode(true)}
            className="battle-button px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700"
          >
            🎯 Custom Setup Mode
          </button>
        )}
        
        {isSetupMode && (
          <>
            <button
              onClick={startCustomGame}
              disabled={customUnits.length === 0}
              className="battle-button px-6 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 Start Custom Game
            </button>
            
            <button
              onClick={resetCustomSetup}
              className="battle-button px-6 py-3 text-lg font-semibold bg-red-600 hover:bg-red-700"
            >
              🔄 Reset Setup
            </button>
            
            <button
              onClick={() => setIsSetupMode(false)}
              className="battle-button px-6 py-3 text-lg font-semibold bg-gray-600 hover:bg-gray-700"
            >
              ↩️ Back to Formations
            </button>
          </>
        )}
        
        {!isSetupMode && (
          <button
            onClick={restartGame}
            className="battle-button px-6 py-3 text-lg font-semibold"
          >
            🔄 Switch to {formations && Object.keys(formations).length > 0 ? Object.keys(formations)[(Object.keys(formations).indexOf(currentFormation) + 1) % Object.keys(formations).length] : "Next"} Formation
          </button>
        )}
        
        {!isSetupMode && turn === "Romans" && gameStarted && (
          <button
            onClick={() => {
              setTurn("Barbarians");
              setSelectedId(null);
            }}
            className="battle-button px-6 py-3 text-lg font-semibold bg-yellow-600 hover:bg-yellow-700"
          >
            ⏭️ End Turn
          </button>
        )}
        
        <div className="text-yellow-200 font-semibold">
          <span className="block">
            {isSetupMode ? "Custom Setup" : `Formation: ${currentFormation}`}
          </span>
          {!isSetupMode && <span className="block">Round: {round}</span>}
        </div>
      </div>

      {/* Setup Mode Controls */}
      {isSetupMode && (
        <div className="game-ui p-4 w-full max-w-6xl">
          <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
            <div className="text-center">
              <button
                onClick={() => setSelectedTeam("Romans")}
                className={`px-4 py-2 rounded font-semibold ${selectedTeam === "Romans" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"}`}
              >
                Romans ({getTeamCount("Romans")}/16)
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => setSelectedTeam("Barbarians")}
                className={`px-4 py-2 rounded font-semibold ${selectedTeam === "Barbarians" ? "bg-red-600 text-white" : "bg-gray-600 text-gray-300"}`}
              >
                Barbarians ({getTeamCount("Barbarians")}/16)
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => setSelectedTeam("Greeks")}
                className={`px-4 py-2 rounded font-semibold ${selectedTeam === "Greeks" ? "bg-green-600 text-white" : "bg-gray-600 text-gray-300"}`}
              >
                Greeks ({getTeamCount("Greeks")}/16)
              </button>
            </div>
          </div>
          
          <div className="text-center text-yellow-200 text-sm">
            <p>Drag troops from the panel below to place them on the field</p>
            <p>Click on placed troops to remove them</p>
            <p>Maximum 16 troops per team</p>
          </div>
        </div>
      )}

      {/* Turn Info */}
      {!isSetupMode && (
        <div className="game-ui p-4 text-center">
          <div className="text-2xl font-bold text-yellow-200">
            {checkEnd() || `${turn.toUpperCase()} TURN`}
          </div>
          <div className="text-sm text-yellow-100 mt-1">
            {turn === "Romans" ? "Your turn - Click to select and move/attack" : 
             turn === "Barbarians" ? "Barbarians are thinking..." : 
             turn === "Greeks" ? "Greeks are thinking..." : ""}
          </div>
        </div>
      )}
      
      {/* Three-Column Layout: Battle Log (Left) | Battlefield Grid (Center) | Selected Unit/Troop Panel (Right) */}
      <div className="flex flex-col xl:flex-row gap-6 w-full max-w-8xl">
        {/* Battle Log - Left Side */}
        {!isSetupMode && (
          <div className="game-ui p-4 xl:w-80 flex-shrink-0">
            <h3 className="text-yellow-200 font-bold mb-3 text-lg border-b border-yellow-600 pb-2">Battle Log</h3>
            <div className="max-h-96 overflow-y-auto space-y-1">
              {log && log.map((line, i) => (
                <div key={i} className="text-green-200 text-sm bg-black bg-opacity-30 p-2 rounded border-l-2 border-yellow-600">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Battlefield Grid - Center */}
        <div className="battlefield-container relative flex-1">
          {/* Decorative battlefield elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-600 rounded-full opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-600 rounded-full opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-600 rounded-full opacity-60"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-yellow-600 rounded-full opacity-60"></div>
          
          <div className="battlefield-grid grid grid-cols-8 grid-rows-8 gap-1 w-fit p-6 rounded-lg mx-auto">
            {[...Array(GRID_SIZE)].flatMap((_, y) =>
              [...Array(GRID_SIZE)].map((_, x) => {
                const u = getUnit(x, y);
                const isSelected = u?.id === selectedId;
                const key = `${x},${y}`;
                const isMove = highlightMove && highlightMove.includes(key);
                const isAttack = highlightAttack && highlightAttack.includes(key);
                const Icon = u?.Icon;
                const percent = u ? (u.hp / u.maxHp) * 100 : 0;
                const role = u?.role;
                
                // Determine cell type for visual variety
                const isPath = (x === 3 || x === 4) && (y === 3 || y === 4); // Center paths
                const cellClass = isPath ? "cobblestone-path" : "grass-cell";
                
                return (
                  <motion.div
                    key={key}
                    onClick={() => handleClick(x, y)}
                    onDragOver={isSetupMode ? handleDragOver : undefined}
                    onDrop={isSetupMode ? (e) => handleDrop(e, x, y) : undefined}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    className={`w-16 h-20 sm:w-20 sm:h-24 flex flex-col items-center justify-center text-xs sm:text-sm cursor-pointer transition-all duration-200 relative
                    ${cellClass}
                    ${isSelected ? "unit-selected" : ""}
                    ${isMove ? "movement-highlight" : ""}
                    ${isAttack ? "attack-highlight" : ""}
                    ${u ? (u.team === "Romans" ? "unit-roman" : u.team === "Greeks" ? "unit-greek" : "unit-barbarian") : ""}
                    ${isSetupMode && draggedTroop && !u ? "drag-over" : ""}`}
                  >
                    {u ? (
                      <>
                        <div className="text-2xl mb-1 text-white drop-shadow-lg">{Icon}</div>
                        
                        {/* Health Bar */}
                        <div className="w-full h-2 bg-gray-800 rounded-full border border-gray-600 mb-1">
                          <div 
                            className="health-bar rounded-full h-full" 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        
                        {/* Unit Info */}
                        <div className="text-xss text-white text-center drop-shadow-md">
                          <div className="font-semibold">{u.hp} HP</div>
                          <div className="text-xs opacity-80">{role}</div>
                          
                          {/* Ammunition indicator for ranged units */}
                          {u.ammo && u.ammo > 0 && (
                            <div className="text-xs text-blue-300 font-bold">
                              🏹{u.ammo}
                            </div>
                          )}
                          
                          {/* Out of ammo indicator */}
                          {u.ammo === 0 && u.role && (u.role.includes("Archer") || u.role.includes("Ballista") || u.role.includes("Scorpion") || u.role.includes("Velites") || u.role.includes("Shaman")) && (
                            <div className="text-xs text-red-300 font-bold">
                              ⚔️
                            </div>
                          )}
                        </div>
                        
                        {/* Team indicator */}
                        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white
                          ${u.team === "Romans" ? "bg-blue-600" : u.team === "Greeks" ? "bg-green-600" : "bg-red-600"}`}>
                        </div>
                      </>
                    ) : (
                      // Empty cell with subtle grass texture
                      <div className="w-full h-full flex items-center justify-center">
                        {isMove && <div className="text-blue-400 text-lg">⚡</div>}
                        {isAttack && <div className="text-red-400 text-lg">⚔️</div>}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Right Side Panel */}
        <div className="game-ui p-4 xl:w-80 flex-shrink-0">
          {isSetupMode ? (
            // Troop Selection Panel
            <>
              <h2 className="text-yellow-200 font-bold mb-3 text-xl border-b border-yellow-600 pb-2">
                {selectedTeam} Troops
              </h2>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {AVAILABLE_TROOPS[selectedTeam].map((troop, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={() => setDraggedTroop(troop)}
                    onDragEnd={() => setDraggedTroop(null)}
                    className="bg-gray-700 p-3 rounded cursor-move hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{ICON_MAP[troop.Icon as keyof typeof ICON_MAP] || "⚔️"}</div>
                      <div className="flex-1">
                        <div className="text-yellow-200 font-semibold">{troop.name}</div>
                        <div className="text-xs text-gray-300">
                          {troop.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
                <div className="text-yellow-200 font-semibold mb-2">Team Counts:</div>
                <div className="text-sm text-gray-300">
                  <div>Romans: {getTeamCount("Romans")}/16</div>
                  <div>Barbarians: {getTeamCount("Barbarians")}/16</div>
                  <div>Greeks: {getTeamCount("Greeks")}/16</div>
                </div>
              </div>
            </>
          ) : (
            // Selected Unit Display
            selected ? (
              <>
                <h2 className="text-yellow-200 font-bold mb-3 text-xl border-b border-yellow-600 pb-2">Selected Unit</h2>
                <div className="space-y-2 text-sm text-yellow-200">
                  <p><span className="text-yellow-300">🧱</span> <strong>{selected.name}</strong></p>
                  <p><span className="text-red-400">❤️</span> HP: {selected.hp}/{selected.maxHp}</p>
                  <p><span className="text-orange-400">⚔️</span> Attack: {selected.attack}</p>
                  <p><span className="text-blue-400">🎯</span> Range: {selected.range}</p>
                  <p><span className="text-green-400">🚶‍♂️</span> Move: {selected.move}</p>
                  <p><span className="text-purple-400">🏷️</span> Role: {selected.role}</p>
                  
                  {/* Ammunition display for ranged units */}
                  {selected.ammo && selected.ammo > 0 && (
                    <p><span className="text-cyan-400">🏹</span> Ammo: {selected.ammo} shots</p>
                  )}
                  
                  {/* Out of ammo indicator */}
                  {selected.ammo === 0 && selected.role && (selected.role.includes("Archer") || selected.role.includes("Ballista") || selected.role.includes("Scorpion") || selected.role.includes("Velites") || selected.role.includes("Shaman")) && (
                    <p><span className="text-red-400">⚔️</span> <strong>Out of ammo - Melee only</strong></p>
                  )}
                </div>
                
                {/* Health Bar */}
                <div className="mt-3">
                  <div className="text-xs text-yellow-200 mb-1">Health</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 border border-gray-600">
                    <div 
                      className="health-bar rounded-full h-full" 
                      style={{ width: `${(selected.hp / selected.maxHp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-yellow-200 font-bold mb-3 text-xl border-b border-yellow-600 pb-2">No Unit Selected</h2>
                <p className="text-green-200 text-sm opacity-70">Click on a unit to see its details</p>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeConq;
