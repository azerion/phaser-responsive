module Fabrique {

    export class ResponsiveSprite extends Phaser.Sprite implements IResponsiveObject {
        public pinned:PinnedPosition;

        public base:Phaser.Point;

        public portraitScalingConfig: ScalingConfig = null;

        public landscapeScalingConfig: ScalingConfig = null;

        constructor(game:Phaser.Game, x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin:PinnedPosition = PinnedPosition.topLeft) {
            super(game, x, y, key, frame);
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

            var g = (<Fabrique.Plugins.ResponsiveGame>this.game).getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;

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
            }
        }

        public destroy(destroyChildren?:boolean) {
            super.destroy(destroyChildren);

            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        }

        public setPortraitScaling(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false): void {
            this.portraitScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway);

            this.onResize();
        }

        public setLandscapeScaling(percentage: number, percentageOfWidth: boolean = true, scaleAnyway: boolean = false): void {
            this.landscapeScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleAnyway);

            this.onResize();
        }
    }

}