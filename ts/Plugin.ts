module Fabrique {
    /**
     * Plugins used by OG-Fabrique
     */
    export module Plugins {
        export interface ResponsiveObjectFactory extends Phaser.GameObjectFactory {
            responsiveImage: (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.ResponsiveImage;
            responsiveButton: (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.ResponsiveButton;
            responsiveSprite: (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.ResponsiveSprite;
            responsiveText: (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition, group?:Phaser.Group) => Fabrique.ResponsiveText;
            responsiveGroup: (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition) => Fabrique.ResponsiveGroup;
        }
        export interface ResponsiveObjectCreator extends Phaser.GameObjectCreator {
            responsiveImage: (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition) => Fabrique.ResponsiveImage;
            responsiveButton: (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition) => Fabrique.ResponsiveButton;
            responsiveSprite: (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition) => Fabrique.ResponsiveSprite;
            responsiveText: (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition) => Fabrique.ResponsiveText;
            responsiveGroup: (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition) => Fabrique.ResponsiveGroup;
        }

        /**
         * We overwrite the default Phaser.Game to expose the events to the game object, this is purely for typescript
         */
        export interface ResponsiveGame extends Phaser.Game {
            getPinnedBase: (pinned:PinnedPosition) => Phaser.Point;
            add: ResponsiveObjectFactory;
            make: ResponsiveObjectCreator;
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
                        value: (pinned:PinnedPosition):Phaser.Point => {
                            switch (pinned) {
                                case PinnedPosition.topLeft:
                                    return new Phaser.Point(0, 0);
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
                            }
                        }
                    });
                } else {
                    console.warn('getPinnedBase method already exists on game');
                }

                this.addResponsiveFactory();
                this.addResponsiveCreator();
            }

            public addResponsiveFactory() {
                //For the image
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveImage = function (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.ResponsiveImage {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.ResponsiveImage(this.game, x, y, key, frame, pin));
                };

                //for the button
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveButton = function (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.ResponsiveButton {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.ResponsiveButton(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin));
                };

                //for the sprite
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveSprite = function (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.ResponsiveSprite {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.ResponsiveSprite(this.game, x, y, key, frame, pin));
                };

                //for the text
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveText = function (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.ResponsiveText {
                    if (group === undefined) {
                        group = this.world;
                    }

                    return group.add(new Fabrique.ResponsiveText(this.game, x, y, text, style, pin));
                };

                //for the group
                (<Fabrique.Plugins.ResponsiveObjectFactory>Phaser.GameObjectFactory.prototype).responsiveGroup = function (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition):Fabrique.ResponsiveGroup {
                    return new Fabrique.ResponsiveGroup(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            }

            public addResponsiveCreator() {
                //For the image
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveImage = function (x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition):Fabrique.ResponsiveImage {
                    return new Fabrique.ResponsiveImage(this.game, x, y, key, frame, pin);
                };

                //for the button
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveButton = function (x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin?:PinnedPosition, group?:Phaser.Group):Fabrique.ResponsiveButton {
                    return new Fabrique.ResponsiveButton(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin);
                };

                //for the sprite
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveSprite = function (x:number, y:number, key?:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin?:PinnedPosition):Fabrique.ResponsiveSprite {
                    return new Fabrique.ResponsiveSprite(this.game, x, y, key, frame, pin);
                };

                //for the text
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveText = function (x:number, y:number, text:string, style?:Phaser.PhaserTextStyle, pin?:PinnedPosition):Fabrique.ResponsiveText {
                    return new Fabrique.ResponsiveText(this.game, x, y, text, style, pin);
                };

                //for the text
                (<Fabrique.Plugins.ResponsiveObjectCreator>Phaser.GameObjectCreator.prototype).responsiveGroup = function (parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number, x?:number, y?:number, pin?:PinnedPosition):Fabrique.ResponsiveGroup {
                    return new Fabrique.ResponsiveGroup(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };

            }
        }
    }
}