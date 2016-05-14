module Fabrique {
    export class ResponsiveBitmapText extends Phaser.BitmapText implements IResponsiveObject {
        public pinned:PinnedPosition;

        public base:Phaser.Point;

        public portraitScalingConfig: ScalingConfig = null;

        public landscapeScalingConfig: ScalingConfig = null;

        constructor(game:Phaser.Game,x: number, y: number, font: string, text?: string, size?: number, align?: string, pin:PinnedPosition = PinnedPosition.topLeft) {
            super(game, x, y, font, text, size, align);
            this.game.scale.onSizeChange.add(() => this.onResize(), null);

            this.base = new Phaser.Point(x || 0, y || 0);

            this.setPinned(pin);
        }

        public setPinned(pin:PinnedPosition, x?:number, y?:number) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }

            this.pinned = pin;
            this.onResize();
        }

        public onResize() {
            if (this.game === null) {
                return;
            }

            let scalingConfig: ScalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            } else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }

            if (null !== scalingConfig) {
                (<Fabrique.Plugins.ResponsiveScaleManager>this.game.scale).scaleObjectDynamicly(
                    this,
                    scalingConfig.percentage,
                    scalingConfig.percentageOfWidth,
                    scalingConfig.scaleAnyway
                );

                let scale: PIXI.Point = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }

            var g = (<Fabrique.Plugins.ResponsiveGame>this.game).getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        }

        public destroy(destroyChildren?:boolean) {
            super.destroy(destroyChildren);

            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        }

        public setPortraitScaling(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false, pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void {
            if (!pinnedX) {
                pinnedX = 0;
            }
            if (!pinnedY) {
                pinnedY = 0;
            }

            if (pinnedPosition) {
                this.portraitScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            } else {
                this.portraitScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }

            this.onResize();
        }

        public setLandscapeScaling(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false, pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void {
            if (!pinnedX) {
                pinnedX = 0;
            }
            if (!pinnedY) {
                pinnedY = 0;
            }

            if (pinnedPosition) {
                this.landscapeScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            } else {
                this.landscapeScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }

            this.onResize();
        }
    }
}