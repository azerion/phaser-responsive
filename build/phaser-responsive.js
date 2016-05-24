/*!
 * phaser-responsive - version 2.0.0-alpha1 
 * Adds responsive objects that can be pinned to Phaser!
 *
 * OrangeGames
 * Build at 24-05-2016
 * Released under MIT License 
 */

var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Position = (function () {
            function Position() {
            }
            Position.prototype.getPositionConfig = function () {
                if (!this.game.device.desktop) {
                    if (this.game.width > this.game.height && this.landscapePositionConfig !== null) {
                        //landscape
                        return this.landscapePositionConfig;
                    }
                    else if (this.game.height > this.game.width && this.portraitPositionConfig !== null) {
                        //portrait
                        return this.portraitPositionConfig;
                    }
                }
                return this.basePositionConfig;
            };
            Position.prototype.updatePosition = function () {
                var config = this.getPositionConfig();
                var g = this.game.getPinnedBase(config.pinnedPosition);
                this.x = config.x + g.x;
                this.y = config.y + g.y;
            };
            Position.prototype.setPinned = function (pinnedPosition, pinnedX, pinnedY) {
                this.basePositionConfig = new Fabrique.PinnedConfig(pinnedPosition, pinnedX, pinnedY);
                this.updatePosition();
            };
            Position.prototype.setPortraitPinned = function (pinnedPosition, pinnedX, pinnedY) {
                this.portraitPositionConfig = new Fabrique.PinnedConfig(pinnedPosition, pinnedX, pinnedY);
                this.updatePosition();
            };
            Position.prototype.setLandscapePinned = function (pinnedPosition, pinnedX, pinnedY) {
                this.landscapePositionConfig = new Fabrique.PinnedConfig(pinnedPosition, pinnedX, pinnedY);
                this.updatePosition();
            };
            return Position;
        })();
        Responsive.Position = Position;
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Scale = (function () {
            function Scale() {
            }
            Scale.prototype.getScalingConfig = function () {
                if (!this.game.device.desktop) {
                    if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                        //landscape
                        return this.landscapeScalingConfig;
                    }
                    else if (this.game.height > this.game.width && this.portraitScalingConfig !== null) {
                        //portrait
                        return this.portraitScalingConfig;
                    }
                }
                return this.baseScaleConfig;
            };
            Scale.prototype.updateScaling = function () {
                var config = this.getScalingConfig();
                if (config === null) {
                    this.scale.set(this.oldScale.x, this.oldScale.y);
                    return;
                }
                this.oldScale.set(this.scale.x, this.scale.y);
                this.game.scale.scaleObjectDynamicly(this, config.percentage, config.percentageOfWidth, config.scaleDesktop);
            };
            Scale.prototype.setScaling = function (percentage, percentageOfWidth, scaleDesktop) {
                this.baseScaleConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleDesktop);
                this.updateScaling();
            };
            Scale.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleDesktop) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleDesktop);
                this.updateScaling();
            };
            Scale.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleDesktop) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleDesktop);
                this.updateScaling();
            };
            return Scale;
        })();
        Responsive.Scale = Scale;
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fabrique;
(function (Fabrique) {
    /**
     * Plugins used by OG-Fabrique
     */
    var Plugins;
    (function (Plugins) {
        //https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Mixins.md
        function applyMixins(derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }
        Plugins.applyMixins = applyMixins;
        /**
         * GameEvents plugin, adds the events from the PortalEvents interface to the game
         *
         * These are all Phaser.Signals
         */
        var Responsiveness = (function (_super) {
            __extends(Responsiveness, _super);
            function Responsiveness(game, parent) {
                var _this = this;
                _super.call(this, game, parent);
                if (!game.hasOwnProperty('getPinnedBase')) {
                    Object.defineProperty(game, 'getPinnedBase', {
                        value: function (pinned) {
                            switch (pinned) {
                                case Fabrique.PinnedPosition.topCenter:
                                    return new Phaser.Point(_this.game.width / 2, 0);
                                case Fabrique.PinnedPosition.topRight:
                                    return new Phaser.Point(_this.game.width, 0);
                                case Fabrique.PinnedPosition.middleLeft:
                                    return new Phaser.Point(0, _this.game.height / 2);
                                case Fabrique.PinnedPosition.middleCenter:
                                    return new Phaser.Point(_this.game.width / 2, _this.game.height / 2);
                                case Fabrique.PinnedPosition.middleRight:
                                    return new Phaser.Point(_this.game.width, _this.game.height / 2);
                                case Fabrique.PinnedPosition.bottomLeft:
                                    return new Phaser.Point(0, _this.game.height);
                                case Fabrique.PinnedPosition.bottomCenter:
                                    return new Phaser.Point(_this.game.width / 2, _this.game.height);
                                case Fabrique.PinnedPosition.bottomRight:
                                    return new Phaser.Point(_this.game.width, _this.game.height);
                                case Fabrique.PinnedPosition.topLeft:
                                default:
                                    return new Phaser.Point(0, 0);
                            }
                        }
                    });
                }
                else {
                    console.warn('getPinnedBase method already exists on game');
                }
                this.addResponsiveFactory();
                this.addResponsiveCreator();
                this.addResponsiveScaleManager();
            }
            Responsiveness.prototype.addResponsiveScaleManager = function () {
                Phaser.ScaleManager.prototype.scaleObjectDynamicly = function (object, percentage, percentageOfWidth, scaleDesktop) {
                    if (percentageOfWidth === void 0) { percentageOfWidth = true; }
                    if (scaleDesktop === void 0) { scaleDesktop = false; }
                    if (this.game.device.desktop && !scaleDesktop) {
                        return;
                    }
                    //reset scale
                    object.scale.set(1, 1);
                    //make image always the passet percentage of the game screen
                    var newWidth;
                    var newHeight;
                    var scaleFactor;
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
                    }
                    else {
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
            };
            Responsiveness.prototype.addResponsiveFactory = function () {
                //For the image
                Phaser.GameObjectFactory.prototype.responsiveImage = function (x, y, key, frame, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.Responsive.Image(this.game, x, y, key, frame, pin));
                };
                //for the button
                Phaser.GameObjectFactory.prototype.responsiveButton = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.Responsive.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin));
                };
                //for the sprite
                Phaser.GameObjectFactory.prototype.responsiveSprite = function (x, y, key, frame, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.Responsive.Sprite(this.game, x, y, key, frame, pin));
                };
                //for the text
                Phaser.GameObjectFactory.prototype.responsiveText = function (x, y, text, style, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.Responsive.Text(this.game, x, y, text, style, pin));
                };
                //for the BitmapText
                Phaser.GameObjectFactory.prototype.responsiveBitmapText = function (x, y, font, text, size, align, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.Responsive.BitmapText(this.game, x, y, font, text, size, align, pin));
                };
                //for the group
                Phaser.GameObjectFactory.prototype.responsiveGroup = function (parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
                    return new Fabrique.Responsive.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            };
            Responsiveness.prototype.addResponsiveCreator = function () {
                //For the image
                Phaser.GameObjectCreator.prototype.responsiveImage = function (x, y, key, frame, pin) {
                    return new Fabrique.Responsive.Image(this.game, x, y, key, frame, pin);
                };
                //for the button
                Phaser.GameObjectCreator.prototype.responsiveButton = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin, group) {
                    return new Fabrique.Responsive.Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin);
                };
                //for the sprite
                Phaser.GameObjectCreator.prototype.responsiveSprite = function (x, y, key, frame, pin) {
                    return new Fabrique.Responsive.Sprite(this.game, x, y, key, frame, pin);
                };
                //for the text
                Phaser.GameObjectCreator.prototype.responsiveText = function (x, y, text, style, pin) {
                    return new Fabrique.Responsive.Text(this.game, x, y, text, style, pin);
                };
                //for the BitmapText
                Phaser.GameObjectCreator.prototype.responsiveBitmapText = function (x, y, font, text, size, align, pin) {
                    return new Fabrique.Responsive.BitmapText(this.game, x, y, font, text, size, align, pin);
                };
                //for the group
                Phaser.GameObjectCreator.prototype.responsiveGroup = function (parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
                    return new Fabrique.Responsive.Group(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            };
            return Responsiveness;
        })(Phaser.Plugin);
        Plugins.Responsiveness = Responsiveness;
    })(Plugins = Fabrique.Plugins || (Fabrique.Plugins = {}));
})(Fabrique || (Fabrique = {}));
/// <reference path="ResponsivePosition.ts"/>
/// <reference path="ResponsiveScale.ts"/>
/// <reference path="../Plugin.ts"/>
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var BitmapText = (function (_super) {
            __extends(BitmapText, _super);
            function BitmapText(game, x, y, font, text, size, align, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, x, y, font, text, size, align);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            BitmapText.prototype.onResize = function () {
                this.updatePosition();
                // this.updateScaling();
            };
            return BitmapText;
        })(Phaser.BitmapText);
        Responsive.BitmapText = BitmapText;
        Fabrique.Plugins.applyMixins(BitmapText, [Responsive.Position]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.baseScaleConfig = null;
                this.landscapeScalingConfig = null;
                this.portraitScalingConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            Button.prototype.onResize = function () {
                this.updatePosition();
                this.updateScaling();
            };
            return Button;
        })(Phaser.Button);
        Responsive.Button = Button;
        Fabrique.Plugins.applyMixins(Button, [Responsive.Position, Responsive.Scale]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Group = (function (_super) {
            __extends(Group, _super);
            function Group(game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.baseScaleConfig = null;
                this.landscapeScalingConfig = null;
                this.portraitScalingConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            Group.prototype.onResize = function () {
                this.updatePosition();
                this.updateScaling();
            };
            return Group;
        })(Phaser.Group);
        Responsive.Group = Group;
        Fabrique.Plugins.applyMixins(Group, [Responsive.Position, Responsive.Scale]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image(game, x, y, key, frame, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, x, y, key, frame);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.baseScaleConfig = null;
                this.landscapeScalingConfig = null;
                this.portraitScalingConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            Image.prototype.onResize = function () {
                this.updatePosition();
                this.updateScaling();
            };
            return Image;
        })(Phaser.Image);
        Responsive.Image = Image;
        Fabrique.Plugins.applyMixins(Image, [Responsive.Position, Responsive.Scale]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(game, x, y, key, frame, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, x, y, key, frame);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.baseScaleConfig = null;
                this.landscapeScalingConfig = null;
                this.portraitScalingConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            Sprite.prototype.onResize = function () {
                this.updatePosition();
                this.updateScaling();
            };
            return Sprite;
        })(Phaser.Sprite);
        Responsive.Sprite = Sprite;
        Fabrique.Plugins.applyMixins(Sprite, [Responsive.Position, Responsive.Scale]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var Responsive;
    (function (Responsive) {
        var Text = (function (_super) {
            __extends(Text, _super);
            function Text(game, x, y, text, style, pin) {
                var _this = this;
                if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
                _super.call(this, game, x, y, text, style);
                this.basePositionConfig = null;
                this.landscapePositionConfig = null;
                this.portraitPositionConfig = null;
                this.baseScaleConfig = null;
                this.landscapeScalingConfig = null;
                this.portraitScalingConfig = null;
                this.oldScale = new Phaser.Point(1, 1);
                this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
                this.setPinned(pin, x || 0, y || 0);
            }
            Text.prototype.onResize = function () {
                this.updatePosition();
                this.updateScaling();
            };
            return Text;
        })(Phaser.Text);
        Responsive.Text = Text;
        Fabrique.Plugins.applyMixins(Text, [Responsive.Position, Responsive.Scale]);
    })(Responsive = Fabrique.Responsive || (Fabrique.Responsive = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var PinnedConfig = (function () {
        function PinnedConfig(pinnedPosition, pinnedX, pinnedY) {
            if (pinnedPosition === void 0) { pinnedPosition = Fabrique.PinnedPosition.topLeft; }
            if (pinnedX === void 0) { pinnedX = 0; }
            if (pinnedY === void 0) { pinnedY = 0; }
            this.pinnedPosition = undefined;
            this.x = 0;
            this.y = 0;
            this.pinnedPosition = pinnedPosition;
            this.x = pinnedX;
            this.y = pinnedY;
        }
        return PinnedConfig;
    })();
    Fabrique.PinnedConfig = PinnedConfig;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    (function (PinnedPosition) {
        PinnedPosition[PinnedPosition["topLeft"] = 0] = "topLeft";
        PinnedPosition[PinnedPosition["topCenter"] = 1] = "topCenter";
        PinnedPosition[PinnedPosition["topRight"] = 2] = "topRight";
        PinnedPosition[PinnedPosition["middleLeft"] = 3] = "middleLeft";
        PinnedPosition[PinnedPosition["middleCenter"] = 4] = "middleCenter";
        PinnedPosition[PinnedPosition["middleRight"] = 5] = "middleRight";
        PinnedPosition[PinnedPosition["bottomLeft"] = 6] = "bottomLeft";
        PinnedPosition[PinnedPosition["bottomCenter"] = 7] = "bottomCenter";
        PinnedPosition[PinnedPosition["bottomRight"] = 8] = "bottomRight";
    })(Fabrique.PinnedPosition || (Fabrique.PinnedPosition = {}));
    var PinnedPosition = Fabrique.PinnedPosition;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ScalingConfig = (function () {
        function ScalingConfig(percentage, percentageOfWidth, scaleDesktop) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleDesktop === void 0) { scaleDesktop = false; }
            this.percentage = percentage;
            this.percentageOfWidth = percentageOfWidth;
            this.scaleDesktop = scaleDesktop;
        }
        return ScalingConfig;
    })();
    Fabrique.ScalingConfig = ScalingConfig;
})(Fabrique || (Fabrique = {}));
//# sourceMappingURL=phaser-responsive.js.map