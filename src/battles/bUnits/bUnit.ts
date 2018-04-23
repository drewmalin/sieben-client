import { RUnit } from "../../units/rUnit";
import { Weapon } from "../../units/equipment/weapon";
import { RangedWeapon } from "../../units/equipment/rangedWeapon";
import { Armor } from "../../units/equipment/armor";

export enum Orientation {N, NE, SE, S, SW, NW}

export enum BattleStance {DEFAULT, AGGRO, DEFEND, HARASS, RETREAT, ROUTE}

export class BUnit {
    constructor (public rUnit: RUnit, public playerID: number) {

    }
    name: string;
    count: number;
    startingCount: number;
    orientation: Orientation;
    stance: BattleStance;
    weapon: Weapon;
    rangedWeapon: RangedWeapon;
    armor: Armor;
    hasLeader: boolean;
    hasBard: boolean;
    hasSymbol: boolean;
    carryShields: boolean;

    rotateCW(): void {
        if (this.orientation === Orientation.NW) {
            this.orientation = Orientation.N;
        }
        else {
            this.orientation = this.orientation + 1;
        }
    }

    rotateCCW(): void {
        if (this.orientation === Orientation.N) {
            this.orientation = Orientation.NW;
        }
        else {
            this.orientation = this.orientation - 1;
        }
    }

    // Get the effective stat with all active modifiers applied
    getStat(stat: string): number {
        // TODO
        return 0;
    }

    // For the unusual occasion when the unmodified unit stat is needed.
    getBaseStat(stat: string): number {
        return this.rUnit.getBaseStat(stat);
    }
}