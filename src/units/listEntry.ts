import { Weapon } from "./equipment/weapon";
import { RangedWeapon } from "./equipment/rangedWeapon";
import { Armor } from "./equipment/armor";
import { RosterType, BattleType } from "./enums";

// A ListEntry encompasses the base stats and equipment options available for a unit type
export class ListEntry {
    constructor () {
        this.name = 'default unit';
        this.baseCost = 10;
        this.speed = 5;
        this.mastery = 0;
        this.precision = 9;
        this.ferocity = 0;
        this.offense = 9;
        this.defense = 9;
        this.quick = 9;
        this.health = 100;
        this.attacks = 1;
        this.courage = 21;
        this.intimidate = 3;
        this.endurance = 9;
        this.weapon = new Weapon('default weapon');
        this.rangedWeapon = null;
        this.armor = new Armor('default armor');
        this.hasShield = false;
        this.min = 1;
        this.max = 64;
        this.rosterType = RosterType.COMMON;
        this.battleType = BattleType.BASIC;
        this.faction = 'default faction';
    }
    name: string;
    baseCost: number;
    speed: number;
    mastery: number;
    precision: number;
    ferocity: number;
    offense: number;
    defense: number;
    quick: number;
    health: number;
    attacks: number;
    courage: number;
    intimidate: number;
    endurance: number;
    weapon: Weapon;
    rangedWeapon: RangedWeapon;
    armor: Armor;
    hasShield: boolean;

    min: number;
    max: number;

    rosterType: RosterType;
    battleType: BattleType;
    faction: string;
}