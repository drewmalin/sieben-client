import { ListEntry } from "./listEntry";
import { Weapon } from "./equipment/weapon";
import { RangedWeapon } from "./equipment/rangedWeapon";
import { Armor } from "./equipment/armor";

// An RUnit is the representation of a unit in an army roster
export class RUnit {
    constructor (public listEntry: ListEntry) {
        this.count = listEntry.min;
        this.weapon = listEntry.weapon;
        this.rangedWeapon = listEntry.rangedWeapon;
        this.armor = listEntry.armor;
        this.carryShields = listEntry.hasShield;
    }
    count: number;
    weapon: Weapon;
    rangedWeapon: RangedWeapon;
    armor: Armor;
    carryShields: boolean;

    getBaseStat(stat: string): number {
        switch(stat) {
            case 'speed': {
                return this.listEntry.speed;
            }
            case 'mastery': {
                return this.listEntry.mastery;
            }
            case 'precision': {
                return this.listEntry.precision;
            }
            case 'ferocity': {
                return this.listEntry.ferocity;
            }
            case 'offense': {
                return this.listEntry.offense;
            }
            case 'defense': {
                return this.listEntry.defense;
            }
            case 'quick': {
                return this.listEntry.quick;
            }
            case 'health': {
                return this.listEntry.health;
            }
            case 'attacks': {
                return this.listEntry.attacks;
            }
            case 'courage': {
                return this.listEntry.courage;
            }
            case 'intimidate': {
                return this.listEntry.intimidate;
            }
            case 'endurance': {
                return this.listEntry.endurance;
            }
        }
    }
}