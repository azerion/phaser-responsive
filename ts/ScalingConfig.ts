module Fabrique {
    export class ScalingConfig {
        public percentage: number;
        public percentageOfWidth: boolean;
        public scaleAnyway: boolean;

        constructor(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false) {
            this.percentage = percentage;
            this.percentageOfWidth = percentageOfWidth;
            this.scaleAnyway = scaleAnyway;
        }
    }
}