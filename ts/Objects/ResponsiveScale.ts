module Fabrique {
    export module Responsive {
        export class Scale {
            public baseScaleConfig: ScalingConfig;

            public landscapeScalingConfig: ScalingConfig;

            public portraitScalingConfig: ScalingConfig;

            public game: Phaser.Game;

            public scale: Phaser.Point;

            public getScalingConfig(): ScalingConfig {
                if (!this.game.device.desktop) {
                    if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                        //landscape
                        return this.landscapeScalingConfig;
                    } else if (this.game.height > this.game.width && this.portraitScalingConfig !== null) {
                        //portrait
                        return this.portraitScalingConfig;
                    }
                }

                return this.baseScaleConfig;
            }

            public updateScaling(): void {
                let config: ScalingConfig = this.getScalingConfig();

                (<Fabrique.Plugins.ResponsiveScaleManager>this.game.scale).scaleObjectDynamicly(
                    <any>this,
                    config.percentage,
                    config.percentageOfWidth,
                    config.scaleDesktop
                );
            }

            public setScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void {
                this.baseScaleConfig = new ScalingConfig(percentage, percentageOfWidth, scaleDesktop);

                this.updateScaling();
            }

            public setPortraitScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void {
                this.portraitScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleDesktop);

                this.updateScaling();
            }

            public setLandscapeScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void {
                this.landscapeScalingConfig = new ScalingConfig(percentage, percentageOfWidth, scaleDesktop);

                this.updateScaling();
            }
        }
    }
}