// CodeConq - Grid Strategy Game with Highlights and Expanded Features
// Now includes: Health Bars, Kill Counters, and Special Ability Tooltips

import { useState, useEffect } from "react";
import { formations } from "./Units/InitialUnits";
import { motion } from "framer-motion";

const GRID_SIZE = 8;


const getHpBarColor = (percent: number) => {
  if (percent > 60) return "bg-green-500";
  if (percent > 30) return "bg-yellow-400";
  return "bg-red-500";
};




function CodeConq() {
  const [currentFormation, setCurrentFormation] = useState<keyof typeof formations>("Phalanx");
  const [units, setUnits] = useState(formations[currentFormation]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [turn, setTurn] = useState("Romans");
  const [log, setLog] = useState<string[]>([]);
  const [round, setRound] = useState(1);

  const getUnit = (x: number, y: number) => units.find((u) => u.x === x && u.y === y);
  const getUnitById = (id: string | null) => units.find((u) => u.id === id);
  const isInRange = (a: any, b: any, range: number) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= range;
  const selected = getUnitById(selectedId);

  const highlightMove = selected ? [...Array(GRID_SIZE)].flatMap((_, y) =>
    [...Array(GRID_SIZE)].map((_, x) => {
      const distance = Math.abs(x - selected.x) + Math.abs(y - selected.y);
      return (distance <= selected.move && !getUnit(x, y)) ? `${x},${y}` : null;
    }).filter(Boolean)
  ) : [];

  const highlightAttack = selected ? [...Array(GRID_SIZE)].flatMap((_, y) =>
    [...Array(GRID_SIZE)].map((_, x) => {
      const target = getUnit(x, y);
      const distance = Math.abs(x - selected.x) + Math.abs(y - selected.y);
      return (target && target.team !== selected.team && distance <= selected.range) ? `${x},${y}` : null;
    }).filter(Boolean)
  ) : [];

  const handleClick = (x: number, y: number) => {
    if (turn !== "Romans") return; // Only allow moves during Roman turn
    
    const clicked = getUnit(x, y);

    if (clicked && clicked.team === "Romans") {
      setSelectedId(clicked.id);
    } else if (selected) {
      if (clicked && clicked.team === "Barbarians" && isInRange(selected, clicked, selected.range)) {
        // Attack enemy
        const dmg = selected.attack;
        setUnits((prev) =>
          prev.map((u) =>
            u.id === clicked.id ? { ...u, hp: u.hp - dmg } : u
          ).filter((u) => u.hp > 0)
        );
        setLog((prevLog) => [`${selected.name} attacked ${clicked.name} for ${dmg}`, ...prevLog]);
        setSelectedId(null);
        setTurn("Barbarians");
      } else if (!clicked && isInRange(selected, { x, y }, selected.move)) {
        // Move to empty space
        setUnits((prev) => prev.map((u) => u.id === selected.id ? { ...u, x, y } : u));
        setSelectedId(null);
        setTurn("Barbarians");
      }
    }
  };

  // Automatic movement for Barbarians (enemy AI) - one unit at a time
  useEffect(() => {
    if (turn !== "Barbarians") return;
    const timeout = setTimeout(() => {
      const enemies = units.filter((u) => u.team === "Barbarians");
      const players = units.filter((u) => u.team === "Romans");
      
      if (enemies.length === 0 || players.length === 0) {
        setTurn("Romans");
        setRound((r) => r + 1);
        return;
      }
      
      // Find the Barbarian unit that's closest to any enemy
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
      
      // Move or attack with the best Barbarian unit
      const target = players.reduce((prev, curr) => {
        const prevDist = Math.abs(bestEnemy.x - prev.x) + Math.abs(bestEnemy.y - prev.y);
        const currDist = Math.abs(bestEnemy.x - curr.x) + Math.abs(bestEnemy.y - curr.y);
        return currDist < prevDist ? curr : prev;
      });
      
      const distX = target.x - bestEnemy.x;
      const distY = target.y - bestEnemy.y;
      
      if (Math.abs(distX) + Math.abs(distY) <= bestEnemy.range) {
        // Attack if in range
        target.hp -= bestEnemy.attack;
        setLog((log) => [`${bestEnemy.name} attacked ${target.name} for ${bestEnemy.attack}`, ...log]);
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
          setLog((log) => [`${bestEnemy.name} moved`, ...log]);
        }
      }
      
      setUnits([...units].filter((u) => u.hp > 0));
      setTurn("Romans");
      setRound((r) => r + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [turn, units]);



  const checkEnd = () => {
    const romansLeft = units.some((u) => u.team === "Romans");
    const barbariansLeft = units.some((u) => u.team === "Barbarians");
    if (!romansLeft) return "Game Over - Barbarians Win!";
    if (!barbariansLeft) return "Victory - Romans Win!";
    return null;
  };

  const restartGame = () => {
    const formationKeys = Object.keys(formations) as Array<keyof typeof formations>;
    const currentIndex = formationKeys.indexOf(currentFormation);
    const nextFormation = formationKeys[(currentIndex + 1) % formationKeys.length];
    
    // Reset all game state
    setSelectedId(null);
    setTurn("Romans");
    setLog([]);
    setRound(1);
    
    // Update formation and units in sequence
    setCurrentFormation(nextFormation);
    setUnits(formations[nextFormation]);
  };

  // Add useEffect to handle formation changes
  useEffect(() => {
    setUnits(formations[currentFormation]);
  }, [currentFormation]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 space-y-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Romans vs Barbarians - Player vs AI</h1>
      <p className="text-gray-600 text-center max-w-md">You control the Romans! Click to select and move/attack. Barbarians move automatically.</p>
      <button
        onClick={restartGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🔄 Switch to {Object.keys(formations)[(Object.keys(formations).indexOf(currentFormation) + 1) % Object.keys(formations).length]} Formation
      </button>
      <div className="text-sm text-gray-700">Current Formation: {currentFormation}</div>
      <div className="text-sm text-gray-700">Round: {round}</div>
      
      {/* End Turn Button */}
      {turn === "Romans" && (
        <button
          onClick={() => {
            setTurn("Barbarians");
            setSelectedId(null);
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ⏭️ End Turn
        </button>
      )}
  
      {/* Selected Unit Display */}
      {selected && (
        <div className="p-2 sm:p-3 bg-gray-100 border rounded text-xs sm:text-sm w-full max-w-md shadow-lg">
          <h2 className="font-bold mb-1">Selected Unit</h2>
          <p>🧱 <strong>{selected.name}</strong></p>
          <p>❤️ HP: {selected.hp}</p>
          <p>🎯 Attack: {selected.attack}</p>
          <p>🎯 Range: {selected.range}</p>
          <p>🚶‍♂️ Move: {selected.move}</p>
          <p>🚶‍♂️ Role: {selected.role}</p>

        </div>
      )}
     {/* Turn Info */}
     <div className="text-lg font-semibold">
        {checkEnd() || `${turn.toUpperCase()} TURN`}
      </div>
          {/* Battle Log */}
          <div className="max-h-32 overflow-y-auto border p-2 text-xs sm:text-sm bg-gray-100 w-full max-w-md sm:max-w-xl">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      {/* Game Grid */}
      <div className="grid grid-cols-8 grid-rows-8 gap-2 w-fit border-2 border-gray-300 bg-white p-4 rounded-lg shadow-lg">
        {[...Array(GRID_SIZE)].flatMap((_, y) =>
          [...Array(GRID_SIZE)].map((_, x) => {
            const u = getUnit(x, y);
            const isSelected = u?.id === selectedId;
            const key = `${x},${y}`;
            const isMove = highlightMove.includes(key);
            const isAttack = highlightAttack.includes(key);
            const Icon = u?.Icon;
            const percent = u ? (u.hp / u.maxHp) * 100 : 0;
            const role = u?.role;
            return (
              <motion.div
                key={key}
                onClick={() => handleClick(x, y)}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-16 sm:w-20 sm:h-24 flex flex-col items-center justify-center border-2 border-gray-200 text-xs sm:text-sm cursor-pointer transition-all duration-200
                ${isSelected ? "bg-yellow-300 hover:bg-yellow-400" : isMove ? "bg-green-200 hover:bg-green-300" : isAttack ? "bg-red-200 hover:bg-red-300" : "bg-white hover:bg-gray-100"}`}
              >
                {Icon && (
                  <>
                    <div className="text-2xl mb-1"><Icon /></div>
                    <div className="w-full h-2 bg-gray-300 rounded">
                      <div className={`h-2 ${getHpBarColor(percent)} rounded`} style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="text-xss ">{u.hp} HP {role}</div>

                  </>
                )}
              </motion.div>
            );
          })
        )}
      </div>
  
   
  
  
    </div>
  );
  
}

export default CodeConq;
