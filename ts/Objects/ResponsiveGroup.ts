module Fabrique {
    export module Responsive {
        export class Group extends Phaser.Group implements Position, Scale {
            public basePositionConfig: PinnedConfig = null;
            public landscapePositionConfig: PinnedConfig = null;
            public portraitPositionConfig: PinnedConfig = null;

            public baseScaleConfig: ScalingConfig = null;
            public landscapeScalingConfig: ScalingConfig = null;
            public portraitScalingConfig: ScalingConfig = null;

            constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin: PinnedPosition = PinnedPosition.topLeft) {
                super(game, parent, name, addToStage, enableBody, physicsBodyType);

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
            public updateScaling: () => void ;
            public setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            public setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            public setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }

        Plugins.applyMixins(Group, [Position, Scale]);
    }
}