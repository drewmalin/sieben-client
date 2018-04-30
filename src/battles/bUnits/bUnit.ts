import { RUnit } from "../../units/rUnit";
import { Weapon } from "../../units/equipment/weapon";
import { RangedWeapon } from "../../units/equipment/rangedWeapon";
import { Armor } from "../../units/equipment/armor";
import { Direction, BattleStance, TurnPhase } from "../enums";
import { StatMod } from "./statModifier";


export class BUnit {
    constructor (public rUnit: RUnit, public playerID: number) {
        this.modifiers = new Map<TurnPhase, StatMod[]>();
        this.modifiers.set(TurnPhase.BEGIN, []);
        this.modifiers.set(TurnPhase.SHOOT, []);
        this.modifiers.set(TurnPhase.MOVE, []);
        this.modifiers.set(TurnPhase.COMBAT, []);
        this.modifiers.set(TurnPhase.RESOLUTION, []);
        this.modifiers.set(TurnPhase.END, []);
    }
    name: string;
    count: number;
    startingCount: number;
    orientation: Direction;
    stance: BattleStance;
    weapon: Weapon;
    rangedWeapon: RangedWeapon;
    armor: Armor;
    hasLeader: boolean;
    hasBard: boolean;
    hasSymbol: boolean;
    hasShields: boolean;
    isFleeing: boolean;

    modifiers: Map<TurnPhase, StatMod[]>;
    /*
        Why collect all the modifiers into TurnPhase based smaller arrays, instead of a simple
        single array that you can filter by the endphase property of the StatMods? It's a
        performance optimization. The modifiers need to be searched at the end of every phase
        with the data structured this way, that filter over all modifiers on the unit doesn't
        need to be called. It does make some of the functions a bit less simple though.
        Perhaps it's an unnecessary optimization if a unit will only ever have fewer than 10
        modifiers active at a time.
    */

    rotateCW(): void {
        if (this.orientation === Direction.NW) {
            this.orientation = Direction.N;
        }
        else {
            this.orientation = this.orientation + 1;
        }
    }

    rotateCCW(): void {
        if (this.orientation === Direction.N) {
            this.orientation = Direction.NW;
        }
        else {
            this.orientation = this.orientation - 1;
        }
    }

    // Get the effective stat with all active modifiers applied
    getStat(stat: string, phase: TurnPhase): number {
        let summands = [];
        for(let p in TurnPhase) {
            if (typeof p === 'number') {
                let filtered = this.modifiers.get(p).filter(
                    x => x.stat === stat && x.activePhases.some(active => active === phase));
                for(let value in filtered) {
                    summands.push(value);
                }
            }
        }
        return summands.reduce((a, b) => a + b, 0); // sums all values in summands array
    }

    // For the unusual occasion when the unmodified unit stat is needed.
    getBaseStat(stat: string): number {
        return this.rUnit.getBaseStat(stat);
    }

    applyModifier(mod: StatMod) {
        this.modifiers.get(mod.endPhase).push(mod);
    }

    expireModifiers(phase: TurnPhase) {
        let filtered = this.modifiers.get(phase).filter((x) => x.turnsRemaining !== 0);
        this.modifiers.set(phase, filtered);
    }
}