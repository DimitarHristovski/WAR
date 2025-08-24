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
    <div className="flex flex-col items-center p-4 sm:p-6 space-y-6 bg-gradient-to-br from-green-800 via-green-700 to-green-900 min-h-screen">
      {/* Game Header */}
      <div className="game-ui p-6 text-center">
        <h1 className="text-4xl font-bold text-yellow-200 mb-2 drop-shadow-lg">Romans vs Barbarians</h1>
        <p className="text-yellow-100 text-lg">Player vs AI Battle</p>
        <p className="text-green-200 text-sm mt-2">You control the Romans! Click to select and move/attack. Barbarians move automatically.</p>
      </div>

      {/* Game Controls */}
      <div className="game-ui p-4 flex flex-wrap gap-4 items-center justify-center">
        <button
          onClick={restartGame}
          className="battle-button px-6 py-3 text-lg font-semibold"
        >
          🔄 Switch to {Object.keys(formations)[(Object.keys(formations).indexOf(currentFormation) + 1) % Object.keys(formations).length]} Formation
        </button>
        
        {turn === "Romans" && (
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
          <span className="block">Formation: {currentFormation}</span>
          <span className="block">Round: {round}</span>
        </div>
      </div>

      {/* Turn Info */}
      <div className="game-ui p-4 text-center">
        <div className="text-2xl font-bold text-yellow-200">
          {checkEnd() || `${turn.toUpperCase()} TURN`}
        </div>
      </div>
      
      {/* Selected Unit Display */}
      {selected && (
        <div className="game-ui p-4 text-yellow-200 max-w-md">
          <h2 className="font-bold mb-3 text-xl border-b border-yellow-600 pb-2">Selected Unit</h2>
          <div className="space-y-2 text-sm">
            <p><span className="text-yellow-300">🧱</span> <strong>{selected.name}</strong></p>
            <p><span className="text-red-400">❤️</span> HP: {selected.hp}/{selected.maxHp}</p>
            <p><span className="text-orange-400">⚔️</span> Attack: {selected.attack}</p>
            <p><span className="text-blue-400">🎯</span> Range: {selected.range}</p>
            <p><span className="text-green-400">🚶‍♂️</span> Move: {selected.move}</p>
            <p><span className="text-purple-400">🏷️</span> Role: {selected.role}</p>
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
        </div>
      )}

      {/* Battle Log */}
      <div className="game-ui p-4 max-w-2xl w-full">
        <h3 className="text-yellow-200 font-bold mb-3 text-lg border-b border-yellow-600 pb-2">Battle Log</h3>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {log.map((line, i) => (
            <div key={i} className="text-green-200 text-sm bg-black bg-opacity-30 p-2 rounded border-l-2 border-yellow-600">
              {line}
            </div>
          ))}
        </div>
      </div>
      {/* Battlefield Grid */}
      <div className="battlefield-container relative">
        {/* Decorative battlefield elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-600 rounded-full opacity-60"></div>
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-600 rounded-full opacity-60"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-600 rounded-full opacity-60"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-yellow-600 rounded-full opacity-60"></div>
        
        <div className="battlefield-grid grid grid-cols-8 grid-rows-8 gap-1 w-fit p-6 rounded-lg">
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
              
              // Determine cell type for visual variety
              const isPath = (x === 3 || x === 4) && (y === 3 || y === 4); // Center paths
              const cellClass = isPath ? "cobblestone-path" : "grass-cell";
              
              return (
                <motion.div
                  key={key}
                  onClick={() => handleClick(x, y)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className={`w-16 h-20 sm:w-20 sm:h-24 flex flex-col items-center justify-center text-xs sm:text-sm cursor-pointer transition-all duration-200 relative
                  ${cellClass}
                  ${isSelected ? "unit-selected" : ""}
                  ${isMove ? "movement-highlight" : ""}
                  ${isAttack ? "attack-highlight" : ""}
                  ${u ? (u.team === "Romans" ? "unit-roman" : "unit-barbarian") : ""}`}
                >
                  {u ? (
                    <>
                      <div className="text-2xl mb-1 text-white drop-shadow-lg">{Icon && <Icon />}</div>
                      
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
                      </div>
                      
                      {/* Team indicator */}
                      <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white
                        ${u.team === "Romans" ? "bg-blue-600" : "bg-red-600"}`}>
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
  
   
  
  
    </div>
  );
  
}

export default CodeConq;
