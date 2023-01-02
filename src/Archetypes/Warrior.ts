import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Warrior extends Archetype {
  private _energyType: EnergyType;
  private static _instance = 0;
  constructor(name: string) {
    super(name);
    Warrior._instance += 1;
    this._energyType = 'stamina';
  }

  get energyType(): EnergyType { return this._energyType; }
  public static createdArchetypeInstances(): number { 
    return Warrior._instance; 
  }
}