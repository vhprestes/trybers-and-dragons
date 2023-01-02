import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _dexterity: number;
  private _defense: number;
  private _energy: Energy;
  private _name: string;

  constructor(name:string) {
    this._name = name;
    this._dexterity = Character.randomNumber();
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._strength = Character.randomNumber();
    this._defense = Character.randomNumber();
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._energy = {
      type_: this._archetype.energyType,
      amount: Character.randomNumber(),
    };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get strength(): number { return this._strength; }
  get dexterity(): number { return this._dexterity; }
  get defense(): number { return this._defense; }
  get lifePoints(): number { return this._lifePoints; }
  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  // https://www.codegrepper.com/code-examples/javascript/typescript+random+number+between+1+and+10
  static randomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
  // falta levelUp, attack e receiveDamage - pausa final do dia 1

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
      if (this._lifePoints < 0) {
        this._lifePoints = -1;
      }
    }
    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._defense += Character.randomNumber();
    this._dexterity += Character.randomNumber();
    this._strength += Character.randomNumber();
    this._energy.amount = 10;
    this._maxLifePoints = this.levelLifePoints(this._maxLifePoints);
    this._lifePoints = this._maxLifePoints;
  }

  private levelLifePoints(lifePoints: number): number {
    const lifePointsIncrement = lifePoints + Character.randomNumber();
    if (lifePointsIncrement > this._race.maxLifePoints) {
      return this._race.maxLifePoints;
    }
    return lifePointsIncrement;
  }

  special(enemy: SimpleFighter): void {
    // critical hit
    if (this._energy.amount < 2) {
      enemy.receiveDamage(this._strength * 1.5);
      this._energy.amount -= 1;
    }
  }
}