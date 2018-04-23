import { TurnPhase } from "../enums";

export class StatMod {
    constructor () {
        this.activePhases = [];
        this.activePhases.push(TurnPhase.BEGIN);
        this.activePhases.push(TurnPhase.SHOOT);
        this.activePhases.push(TurnPhase.MOVE);
        this.activePhases.push(TurnPhase.COMBAT);
        this.activePhases.push(TurnPhase.RESOLUTION);
        this.activePhases.push(TurnPhase.END);
    }
    stat: string;
    mod: number;
    turnsRemaining: number;
    roundsRemaining: number;
    endPhase: TurnPhase;
    activePhases: TurnPhase[];
}