module Fabrique {
    /**
     * Plugins used by OG-Fabrique
     */
    export module Plugins {
        export interface ResponsiveObjectFactory extends Phaser.GameObjectFactory {
            responsiveImage: (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.Responsive.Image;
            responsiveButton: (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.Responsive.Button;
            responsiveSprite: (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.Responsive.Sprite;
            responsiveText: (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.Responsive.Text;
            responsiveBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.Responsive.BitmapText;
            responsiveGroup: (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition) => Fabrique.Responsive.Group;
        }
        export interface ResponsiveObjectCreator extends Phaser.GameObjectCreator {
            responsiveImage: (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition) => Fabrique.Responsive.Image;
            responsiveButton: (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition) => Fabrique.Responsive.Button;
            responsiveSprite: (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition) => Fabrique.Responsive.Sprite;
            responsiveText: (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition) => Fabrique.Responsive.Text;
            responsiveBitmapText: (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?:PinnedPosition) => Fabrique.Responsive.BitmapText;
            responsiveGroup: (parent?:PIXI.Sprite, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition) => Fabrique.Responsive.Group;
        }

        export interface ResponsiveScaleManager extends Phaser.ScaleManager {
            scaleObjectDynamicly: (image: PIXI.Sprite | PIXI.DisplayObjectContainer, percentage: number, percentageOfWidth?: boolean, scaleDesktop?: boolean) => void;
        }

        /**
         * We overwrite the default Phaser.Game to expose the events to the game object, this is purely for typescript
         */
        export interface ResponsiveGame extends Phaser.Game {
            getPinnedBase: (pinned:PinnedPosition) => Phaser.Point;
            add: ResponsiveObjectFactory;
            make: ResponsiveObjectCreator;
            scale: ResponsiveScaleManager;
        }

        //https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Mixins.md
        export function applyMixins(derivedCtor: any, baseCtors: any[]) {
            baseCtors.forEach(baseCtor => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }

        /**
         * GameEvents plugin, adds the events from the PortalEvents interface to the game
         *
         * These are all Phaser.Signals
         */
        export class Responsiveness extends Phaser.Plugin {
            constructor(game:ResponsiveGame, parent:PIXI.DisplayObject) {
                super(game, parent);

                if (!game.hasOwnProperty('getPinnedBase')) {
                    Object.defineProperty(game, 'getPinnedBase', {
                        value: (pinned: PinnedPosition): Phaser.Point => {
                            switch (pinned) {
                                case PinnedPosition.topCenter:
                                    return new Phaser.Point(this.game.width / 2, 0);
                                case PinnedPosition.topRight:
                                    return new Phaser.Point(this.game.width, 0);
                                case PinnedPosition.middleLeft:
                                    return new Phaser.Point(0, this.game.height / 2);
                                case PinnedPosition.middleCenter:
                                    return new Phaser.Point(this.game.width / 2, this.game.height / 2);
                                case PinnedPosition.middleRight:
                                    return new Phaser.Point(this.game.width, this.game.height / 2);
                                case PinnedPosition.bottomLeft:
                                    return new Phaser.Point(0, this.game.height);
                                case PinnedPosition.bottomCenter:
                                    return new Phaser.Point(this.game.width / 2, this.game.height);
                                case PinnedPosition.bottomRight:
                                    return new Phaser.Point(this.game.width, this.game.height);
                                case PinnedPosition.topLeft:
                                default:
                                    return new Phaser.Point(0, 0);
                            }
                        }
                    });
                } else {
                    console.warn('getPinnedBase method already exists on game');
                }

                this.addResponsiveFactory();
                this.addResponsiveCreator();
                this.addResponsiveScaleManager();
            }

            public addResponsiveScaleManager(): void {
                (<Fabrique.Plugins.ResponsiveScaleManager>Phaser.ScaleManager.prototype).scaleObjectDynamicly = function(object: PIXI.Sprite | PIXI.DisplayObjectContainer, percentage: number, percentageOfWidth: boolean = true, scaleDesktop: boolean = false): void {
                    if (this.game.device.desktop && !scaleDesktop) {
                        return;
                    }
                    //reset scale
                    object.scale.set(1, 1);
                    //make image always the passet percentage of the game screen
                    let newWidth: number;
                    let newHeight: number;
                    let scaleFactor: number;
                    if (percentageOfWidth) {
                        //image should be specific percentage of width
                        newWidth = (this.game.width * percentage) / 100;
                        if (object.width === 0) {
                            console.warn('Phaser-Responsive; can not set scale, object has a width of 0', object);
                        }
                        scaleFactor = newWidth / object.width;
                        //if height became too big, use biggest possible height
                        newHeight = (object.height) * scaleFactor;
                        if (newHeight > this.game.height) {
                            scaleFactor = (this.game.height - 10) / object.height;
                        } //10 extra pixles so the image won't get cramped
                        //set scale
                        object.scale.set(scaleFactor, scaleFactor);
                    } else {
                        //image should be specific percentage of heigth
                        newHeight = (this.game.height * percentage) / 100;
                        if (object.height === 0) {
                            console.warn('Phaser-Responsive; can not set scale, object has a height of 0', object);
                        }
                        scaleFactor = newHeight / object.height;
                        //if width became too big, use biggest possible width
                        newWidth = (object.width) * scaleFactor;
                        if (newWidth > this.game.width) {
                            scaleFactor = (this.game.width - 10) / object.width;
                        } //10 extra pixles so the image won't get cramped
                        //set scale
                        object.scale.set(scaleFactor, scaleFactor);
                    }
                };
            }

            public addResponsiveFactory() {
                //For the image
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveImage = function (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.Image {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.Responsive.Image(this.game, x, y, key, frame, pin));
                };

                //for the button
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveButton = function (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.Button {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.Responsive.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin));
                };

                //for the sprite
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveSprite = function (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.Sprite {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.Responsive.Sprite(this.game, x, y, key, frame, pin));
                };

                //for the text
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveText = function (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.Text {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.Responsive.Text(this.game, x, y, text, style, pin));
                };

                //for the BitmapText
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveBitmapText = function (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.BitmapText {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.Responsive.BitmapText(this.game, x, y, font, text, size, align, pin));
                };

                //for the group
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveGroup = function (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition):Fabrique.Responsive.Group {
                    return new Fabrique.Responsive.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            }

            public addResponsiveCreator() {
                //For the image
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveImage = function (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition):Fabrique.Responsive.Image {
                    return new Fabrique.Responsive.Image(this.game, x, y, key, frame, pin);
                };

                //for the button
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveButton = function (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.Responsive.Button {
                    return new Fabrique.Responsive.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin);
                };

                //for the sprite
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveSprite = function (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition):Fabrique.Responsive.Sprite {
                    return new Fabrique.Responsive.Sprite(this.game, x, y, key, frame, pin);
                };

                //for the text
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveText = function (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition):Fabrique.Responsive.Text {
                    return new Fabrique.Responsive.Text(this.game, x, y, text, style, pin);
                };

                //for the BitmapText
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveBitmapText = function (x: number, y: number, font: string, text?: string, size?: number, align?: string, pin?:PinnedPosition):Fabrique.Responsive.BitmapText {
                    return new Fabrique.Responsive.BitmapText(this.game, x, y, font, text, size, align, pin);
                };

                //for the group
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveGroup = function (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition):Fabrique.Responsive.Group {
                    return new Fabrique.Responsive.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };

            }
        }
    }
}