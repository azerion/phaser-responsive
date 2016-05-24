module Fabrique {
    export module Responsive {
        export class Position {
            public basePositionConfig: PinnedConfig;

            public landscapePositionConfig: PinnedConfig;

            public portraitPositionConfig: PinnedConfig;

            public game: Phaser.Game;

            public x: number;

            public y: number;

            public getPositionConfig(): PinnedConfig {
                if (!this.game.device.desktop) {
                    if (this.game.width > this.game.height && this.landscapePositionConfig !== null) {
                        //landscape
                        return this.landscapePositionConfig;
                    } else if (this.game.height > this.game.width && this.portraitPositionConfig !== null) {
                        //portrait
                        return this.portraitPositionConfig;
                    }
                }

                return this.basePositionConfig;
            }
            
            public updatePosition(): void {
                let config: PinnedConfig = this.getPositionConfig();

                var g = (<Fabrique.Plugins.ResponsiveGame>this.game).getPinnedBase(config.pinnedPosition);
                this.x = config.x + g.x;
                this.y = config.y + g.y;
            }

            public setPinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void {
                this.basePositionConfig = new PinnedConfig(pinnedPosition, pinnedX, pinnedY);

                this.updatePosition();
            }

            public setPortraitPinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void {
                this.portraitPositionConfig = new PinnedConfig(pinnedPosition, pinnedX, pinnedY);

                this.updatePosition();
            }

            public setLandscapePinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void {
                this.landscapePositionConfig = new PinnedConfig(pinnedPosition, pinnedX, pinnedY);

                this.updatePosition();
            }
        }
    }
}