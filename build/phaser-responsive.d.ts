declare module Fabrique {
    interface IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        setPinned: (pin: PinnedPosition, x?: number, y?: number) => void;
        onResize: () => void;
        destroy: (destroyChilderen: boolean) => void;
    }
}
declare module Fabrique {
    class ResponsiveButton extends Phaser.Button implements IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        constructor(game: Phaser.Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition);
        setPinned(pin: PinnedPosition, x?: number, y?: number): void;
        onResize(): void;
        destroy(destroyChildren?: boolean): void;
    }
}
declare module Fabrique {
    class ResponsiveGroup extends Phaser.Group implements IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition);
        setPinned(pin: PinnedPosition, x?: number, y?: number): void;
        onResize(): void;
        destroy(destroyChildren?: boolean): void;
    }
}
declare module Fabrique {
    class ResponsiveImage extends Phaser.Image implements IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition);
        setPinned(pin: PinnedPosition, x?: number, y?: number): void;
        onResize(): void;
        destroy(destroyChildren?: boolean): void;
    }
}
declare module Fabrique {
    class ResponsiveSprite extends Phaser.Sprite implements IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition);
        setPinned(pin: PinnedPosition, x?: number, y?: number): void;
        onResize(): void;
        destroy(destroyChildren?: boolean): void;
    }
}
declare module Fabrique {
    class ResponsiveText extends Phaser.Text implements IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        constructor(game: Phaser.Game, x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition);
        setPinned(pin: PinnedPosition, x?: number, y?: number): void;
        onResize(): void;
        destroy(destroyChildren?: boolean): void;
    }
}
declare module Fabrique {
    enum PinnedPosition {
        topLeft = 0,
        topCenter = 1,
        topRight = 2,
        middleLeft = 3,
        middleCenter = 4,
        middleRight = 5,
        bottomLeft = 6,
        bottomCenter = 7,
        bottomRight = 8,
    }
}
declare module Fabrique {
    /**
     * Plugins used by OG-Fabrique
     */
    module Plugins {
        interface ResponsiveObjectFactory extends Phaser.GameObjectFactory {
            responsiveImage: (x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.ResponsiveImage;
            responsiveButton: (x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.ResponsiveButton;
            responsiveSprite: (x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.ResponsiveSprite;
            responsiveText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.ResponsiveText;
            responsiveGroup: (parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition) => Fabrique.ResponsiveGroup;
        }
        interface ResponsiveObjectCreator extends Phaser.GameObjectCreator {
            responsiveImage: (x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition) => Fabrique.ResponsiveImage;
            responsiveButton: (x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition) => Fabrique.ResponsiveButton;
            responsiveSprite: (x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition) => Fabrique.ResponsiveSprite;
            responsiveText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition) => Fabrique.ResponsiveText;
            responsiveGroup: (parent?: PIXI.Sprite, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition) => Fabrique.ResponsiveGroup;
        }
        interface ResponsiveScaleManager extends Phaser.ScaleManager {
            scaleObjectDynamicly: (image: PIXI.Sprite | PIXI.DisplayObjectContainer, percentage: number, percentageOfWidth?: boolean, scaleAnyway?: boolean) => void;
        }
        /**
         * We overwrite the default Phaser.Game to expose the events to the game object, this is purely for typescript
         */
        interface ResponsiveGame extends Phaser.Game {
            getPinnedBase: (pinned: PinnedPosition) => Phaser.Point;
            add: ResponsiveObjectFactory;
            make: ResponsiveObjectCreator;
            scale: ResponsiveScaleManager;
        }
        /**
         * GameEvents plugin, adds the events from the PortalEvents interface to the game
         *
         * These are all Phaser.Signals
         */
        class Responsiveness extends Phaser.Plugin {
            constructor(game: ResponsiveGame, parent: PIXI.DisplayObject);
            addResponsiveScaleManager(): void;
            addResponsiveFactory(): void;
            addResponsiveCreator(): void;
        }
    }
}
