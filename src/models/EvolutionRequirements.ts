export default class EvolutionRequirements {
    constructor(
        public readonly hp: number,
        public readonly mp: number,
        public readonly offense: number,
        public readonly defense: number,
        public readonly speed: number,
        public readonly brains: number,
        public readonly care: number,
        public readonly weight: number,
        public readonly discipline: number,
        public readonly happiness: number,
        public readonly battles: number,
        public readonly techs: number,
        public readonly minCare: boolean,
        public readonly minBattles: boolean,
    ) {
    }
}
