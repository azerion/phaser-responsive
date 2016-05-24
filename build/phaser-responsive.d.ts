declare module Fabrique {
    module Responsive {
        class Position {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            game: Phaser.Game;
            x: number;
            y: number;
            getPositionConfig(): PinnedConfig;
            updatePosition(): void;
            setPinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void;
            setPortraitPinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void;
            setLandscapePinned(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number): void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Scale {
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            game: Phaser.Game;
            scale: Phaser.Point;
            getScalingConfig(): ScalingConfig;
            updateScaling(): void;
            setScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void;
            setPortraitScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void;
            setLandscapeScaling(percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean): void;
        }
    }
}
declare module Fabrique {
    /**
     * Plugins used by OG-Fabrique
     */
    module Plugins {
        interface ResponsiveObjectFactory extends Phaser.GameObjectFactory {
            responsiveImage: (x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.Responsive.Image;
            responsiveButton: (x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.Responsive.Button;
            responsiveSprite: (x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.Responsive.Sprite;
            responsiveText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.Responsive.Text;
            responsiveBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?: PinnedPosition, group?: Phaser.Group) => Fabrique.Responsive.BitmapText;
            responsiveGroup: (parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition) => Fabrique.Responsive.Group;
        }
        interface ResponsiveObjectCreator extends Phaser.GameObjectCreator {
            responsiveImage: (x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition) => Fabrique.Responsive.Image;
            responsiveButton: (x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition) => Fabrique.Responsive.Button;
            responsiveSprite: (x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition) => Fabrique.Responsive.Sprite;
            responsiveText: (x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition) => Fabrique.Responsive.Text;
            responsiveBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?: PinnedPosition) => Fabrique.Responsive.BitmapText;
            responsiveGroup: (parent?: PIXI.Sprite, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition) => Fabrique.Responsive.Group;
        }
        interface ResponsiveScaleManager extends Phaser.ScaleManager {
            scaleObjectDynamicly: (image: PIXI.Sprite | PIXI.DisplayObjectContainer, percentage: number, percentageOfWidth?: boolean, scaleDesktop?: boolean) => void;
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
        function applyMixins(derivedCtor: any, baseCtors: any[]): void;
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
declare module Fabrique {
    module Responsive {
        class BitmapText extends Phaser.BitmapText implements Position {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            scale: Phaser.Point;
            constructor(game: Phaser.Game, x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Button extends Phaser.Button implements Position, Scale {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            constructor(game: Phaser.Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            getScalingConfig: () => ScalingConfig;
            updateScaling: () => void;
            setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Group extends Phaser.Group implements Position, Scale {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number, x?: number, y?: number, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            getScalingConfig: () => ScalingConfig;
            updateScaling: () => void;
            setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Image extends Phaser.Image implements Position, Scale {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            getScalingConfig: () => ScalingConfig;
            updateScaling: () => void;
            setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Sprite extends Phaser.Sprite implements Position, Scale {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            getScalingConfig: () => ScalingConfig;
            updateScaling: () => void;
            setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }
    }
}
declare module Fabrique {
    module Responsive {
        class Text extends Phaser.Text implements Position, Scale {
            basePositionConfig: PinnedConfig;
            landscapePositionConfig: PinnedConfig;
            portraitPositionConfig: PinnedConfig;
            baseScaleConfig: ScalingConfig;
            landscapeScalingConfig: ScalingConfig;
            portraitScalingConfig: ScalingConfig;
            constructor(game: Phaser.Game, x: number, y: number, text: string, style?: Phaser.PhaserTextStyle, pin?: PinnedPosition);
            onResize(): void;
            getPositionConfig: () => PinnedConfig;
            updatePosition: () => void;
            setPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setPortraitPinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            setLandscapePinned: (pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number) => void;
            getScalingConfig: () => ScalingConfig;
            updateScaling: () => void;
            setScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setPortraitScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
            setLandscapeScaling: (percentage: number, percentageOfWidth: boolean, scaleDesktop: boolean) => void;
        }
    }
}
declare module Fabrique {
    class PinnedConfig {
        pinnedPosition: Fabrique.PinnedPosition;
        x: number;
        y: number;
        constructor(pinnedPosition?: Fabrique.PinnedPosition, pinnedX?: number, pinnedY?: number);
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
    class ScalingConfig {
        percentage: number;
        percentageOfWidth: boolean;
        scaleDesktop: boolean;
        constructor(percentage: number, percentageOfWidth?: boolean, scaleDesktop?: boolean);
    }
}
