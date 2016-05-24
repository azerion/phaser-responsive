/// <reference path="ResponsivePosition.ts"/>
/// <reference path="ResponsiveScale.ts"/>
/// <reference path="../Plugin.ts"/>
module Fabrique {
    export module Responsive {
        export class BitmapText extends Phaser.BitmapText implements Position {
            public basePositionConfig: PinnedConfig = null;
            public landscapePositionConfig: PinnedConfig = null;
            public portraitPositionConfig: PinnedConfig = null;

            public scale: Phaser.Point;

            constructor(game: Phaser.Game, x: number, y: number, font: string, text?: string, size?: number, align?: string, pin: PinnedPosition = PinnedPosition.topLeft) {
                super(game, x, y, font, text, size, align);

                this.game.scale.onSizeChange.add(() => this.onResize(), null);

                this.setPinned(pin, x || 0, y || 0);
            }

            public onResize(): void {
                this.updatePosition();
                // this.updateScaling();
            }

            public getPositionConfig: () => PinnedConfig;
            public updatePosition: () => void;
            public setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            public setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            public setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
        }

        Plugins.applyMixins(BitmapText, [Position]);
    }
}