import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static _instance = 0;
  constructor(name: string) {
    super(name);
    Ranger._instance += 1;
    this._energyType = 'stamina';
  }

  get energyType(): EnergyType { return this._energyType; }
  public static createdArchetypeInstances(): number { 
    return Ranger._instance; 
  }
}