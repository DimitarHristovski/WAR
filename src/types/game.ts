import type { ReactElement } from 'react';

export type UnitRole = 'Legionary' | 'Centurion' | 'Archer' | 'Cavalry' | 'Barbarian Warrior' | 'Barbarian Archer' | 'Barbarian Chief' | 'Barbarian Berserker' | 'Barbarian Scout';

export interface Unit {
  id: string;
  team: string;
  name: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  range: number;
  move: number;
  attack: number;
  special?: string;
  Icon: () => ReactElement;
  support?: boolean;
  role?: UnitRole;
} 