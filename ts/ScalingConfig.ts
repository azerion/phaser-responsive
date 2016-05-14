module Fabrique {
    export class ScalingConfig {
        public percentage: number;
        public percentageOfWidth: boolean;
        public scaleAnyway: boolean;
        public pinnedPosition: Fabrique.PinnedPosition = undefined;
        public x: number = 0;
        public y: number = 0;

        constructor(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false, pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) {
            this.percentage = percentage;
            this.percentageOfWidth = percentageOfWidth;
            this.scaleAnyway = scaleAnyway;
            if (pinnedPosition !== undefined) {
                this.pinnedPosition = pinnedPosition
            }
            if (pinnedX) {
                this.x = pinnedX
            }
            if (pinnedY) {
                this.y = pinnedY
            }
        }
    }
}