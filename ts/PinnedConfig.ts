module Fabrique {
    export class PinnedConfig {
        public pinnedPosition: Fabrique.PinnedPosition = undefined;
        public x: number = 0;
        public y: number = 0;

        constructor(pinnedPosition: Fabrique.PinnedPosition = Fabrique.PinnedPosition.topLeft, pinnedX: number = 0, pinnedY: number = 0) {
            this.pinnedPosition = pinnedPosition;
            this.x = pinnedX;
            this.y = pinnedY;
        }
    }
}