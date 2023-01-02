import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _instance = 0;
  constructor(name: string) {
    super(name);
    Mage._instance += 1;
    this._energyType = 'mana';
  }

  get energyType(): EnergyType { return this._energyType; }
  public static createdArchetypeInstances(): number { return Mage._instance; }
}