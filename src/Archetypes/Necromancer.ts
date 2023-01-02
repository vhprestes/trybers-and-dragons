import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Necromancer extends Archetype {
  private _energyType: EnergyType;
  private static _instance = 0;
  constructor(name: string) {
    super(name);
    Necromancer._instance += 1;
    this._energyType = 'mana';
  }

  get energyType(): EnergyType { return this._energyType; }
  public static createdArchetypeInstances(): number { 
    return Necromancer._instance; 
  }
}