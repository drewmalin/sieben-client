export class Weapon {
    constructor (public name: string) {
        this.statEffects = new Map<string, number>();
    }
    statEffects: Map<string, number>;
}