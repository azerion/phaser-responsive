module Fabrique {
    export module Responsive {
        export class Button extends Phaser.Button implements Position, Scale {
            public basePositionConfig: PinnedConfig = null;
            public landscapePositionConfig: PinnedConfig = null;
            public portraitPositionConfig: PinnedConfig = null;

            public baseScaleConfig: ScalingConfig = null;
            public landscapeScalingConfig: ScalingConfig = null;
            public portraitScalingConfig: ScalingConfig = null;

            constructor(game: Phaser.Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin: PinnedPosition = PinnedPosition.topLeft) {
                super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

                this.game.scale.onSizeChange.add(() => this.onResize(), null);

                this.setPinned(pin, x || 0, y || 0);
            }

            public onResize(): void {
                this.updatePosition();
                this.updateScaling();
            }

            public getPositionConfig: () => PinnedConfig;
            public updatePosition: () => void;
            public setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            public setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            public setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;

            public getScalingConfig: () => ScalingConfig;
            public updateScaling: () => void;
            public setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            public setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            public setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }

        Plugins.applyMixins(Button, [Position, Scale]);
    }
}