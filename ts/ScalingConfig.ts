module Fabrique {
    export class ScalingConfig {
        public percentage: number;
        public percentageOfWidth: boolean;
        public scaleDesktop: boolean;

        constructor(percentage: number, percentageOfWidth: boolean = true, scaleDesktop: boolean = false) {
            this.percentage = percentage;
            this.percentageOfWidth = percentageOfWidth;
            this.scaleDesktop = scaleDesktop;
        }
    }
}