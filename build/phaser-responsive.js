/*!
 * phaser-responsive - version 1.3.0 
 * Adds responsive objects that can be pinned to Phaser!
 *
 * OrangeGames
 * Build at 12-04-2016
 * Released under MIT License 
 */

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Fabrique;
(function (Fabrique) {
    var ResponsiveButton = (function (_super) {
        __extends(ResponsiveButton, _super);
        function ResponsiveButton(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin) {
            var _this = this;
            if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
            _super.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
            this.portraitScalingConfig = null;
            this.landscapeScalingConfig = null;
            this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, this);
            this.base = new Phaser.Point(x || 0, y || 0);
            this.setPinned(pin);
        }
        ResponsiveButton.prototype.setPinned = function (pin, x, y) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }
            this.pinned = pin;
            this.onResize();
        };
        ResponsiveButton.prototype.onResize = function () {
            if (this.game === null) {
                return;
            }
            var scalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            }
            else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }
            if (null !== scalingConfig) {
                this.game.scale.scaleObjectDynamicly(this, scalingConfig.percentage, scalingConfig.percentageOfWidth, scalingConfig.scaleAnyway);
                var scale = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }
            var g = this.game.getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        };
        ResponsiveButton.prototype.destroy = function (destroyChildren) {
            _super.prototype.destroy.call(this, destroyChildren);
            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        };
        ResponsiveButton.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        ResponsiveButton.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        return ResponsiveButton;
    })(Phaser.Button);
    Fabrique.ResponsiveButton = ResponsiveButton;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ResponsiveGroup = (function (_super) {
        __extends(ResponsiveGroup, _super);
        function ResponsiveGroup(game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
            var _this = this;
            if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
            _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
            this.portraitScalingConfig = null;
            this.landscapeScalingConfig = null;
            this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
            this.base = new Phaser.Point(x || 0, y || 0);
            this.setPinned(pin);
        }
        ResponsiveGroup.prototype.setPinned = function (pin, x, y) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }
            this.pinned = pin;
            this.onResize();
        };
        ResponsiveGroup.prototype.onResize = function () {
            if (this.game === null) {
                return;
            }
            var scalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            }
            else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }
            if (null !== scalingConfig) {
                this.game.scale.scaleObjectDynamicly(this, scalingConfig.percentage, scalingConfig.percentageOfWidth, scalingConfig.scaleAnyway);
                var scale = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }
            var g = this.game.getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        };
        ResponsiveGroup.prototype.destroy = function (destroyChildren) {
            _super.prototype.destroy.call(this, destroyChildren);
            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        };
        ResponsiveGroup.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        ResponsiveGroup.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        return ResponsiveGroup;
    })(Phaser.Group);
    Fabrique.ResponsiveGroup = ResponsiveGroup;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ResponsiveImage = (function (_super) {
        __extends(ResponsiveImage, _super);
        function ResponsiveImage(game, x, y, key, frame, pin) {
            var _this = this;
            if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
            _super.call(this, game, x, y, key, frame);
            this.portraitScalingConfig = null;
            this.landscapeScalingConfig = null;
            this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
            this.base = new Phaser.Point(x || 0, y || 0);
            this.setPinned(pin);
        }
        ResponsiveImage.prototype.setPinned = function (pin, x, y) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }
            this.pinned = pin;
            this.onResize();
        };
        ResponsiveImage.prototype.onResize = function () {
            if (this.game === null) {
                return;
            }
            var scalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            }
            else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }
            if (null !== scalingConfig) {
                this.game.scale.scaleObjectDynamicly(this, scalingConfig.percentage, scalingConfig.percentageOfWidth, scalingConfig.scaleAnyway);
                var scale = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }
            var g = this.game.getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        };
        ResponsiveImage.prototype.destroy = function (destroyChildren) {
            _super.prototype.destroy.call(this, destroyChildren);
            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        };
        ResponsiveImage.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        ResponsiveImage.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        return ResponsiveImage;
    })(Phaser.Image);
    Fabrique.ResponsiveImage = ResponsiveImage;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ResponsiveSprite = (function (_super) {
        __extends(ResponsiveSprite, _super);
        function ResponsiveSprite(game, x, y, key, frame, pin) {
            var _this = this;
            if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
            _super.call(this, game, x, y, key, frame);
            this.portraitScalingConfig = null;
            this.landscapeScalingConfig = null;
            this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
            this.base = new Phaser.Point(x || 0, y || 0);
            this.setPinned(pin);
        }
        ResponsiveSprite.prototype.setPinned = function (pin, x, y) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }
            this.pinned = pin;
            this.onResize();
        };
        ResponsiveSprite.prototype.onResize = function () {
            if (this.game === null) {
                return;
            }
            var scalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            }
            else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }
            if (null !== scalingConfig) {
                this.game.scale.scaleObjectDynamicly(this, scalingConfig.percentage, scalingConfig.percentageOfWidth, scalingConfig.scaleAnyway);
                var scale = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }
            var g = this.game.getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        };
        ResponsiveSprite.prototype.destroy = function (destroyChildren) {
            _super.prototype.destroy.call(this, destroyChildren);
            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        };
        ResponsiveSprite.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        ResponsiveSprite.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        return ResponsiveSprite;
    })(Phaser.Sprite);
    Fabrique.ResponsiveSprite = ResponsiveSprite;
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ResponsiveText = (function (_super) {
        __extends(ResponsiveText, _super);
        function ResponsiveText(game, x, y, text, style, pin) {
            var _this = this;
            if (pin === void 0) { pin = Fabrique.PinnedPosition.topLeft; }
            _super.call(this, game, x, y, text, style);
            this.portraitScalingConfig = null;
            this.landscapeScalingConfig = null;
            this.game.scale.onSizeChange.add(function () { return _this.onResize(); }, null);
            this.base = new Phaser.Point(x || 0, y || 0);
            this.setPinned(pin);
        }
        ResponsiveText.prototype.setPinned = function (pin, x, y) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }
            this.pinned = pin;
            this.onResize();
        };
        ResponsiveText.prototype.onResize = function () {
            if (this.game === null) {
                return;
            }
            var scalingConfig = null;
            if (this.game.width > this.game.height && this.landscapeScalingConfig !== null) {
                //landscape
                scalingConfig = this.landscapeScalingConfig;
            }
            else if (this.portraitScalingConfig !== null) {
                //portrait
                scalingConfig = this.portraitScalingConfig;
            }
            if (null !== scalingConfig) {
                this.game.scale.scaleObjectDynamicly(this, scalingConfig.percentage, scalingConfig.percentageOfWidth, scalingConfig.scaleAnyway);
                var scale = this.scale;
                this.base = new Phaser.Point(scalingConfig.x * scale.x, scalingConfig.y * scale.y);
                this.pinned = scalingConfig.pinnedPosition;
            }
            var g = this.game.getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        };
        ResponsiveText.prototype.destroy = function (destroyChildren) {
            _super.prototype.destroy.call(this, destroyChildren);
            this.base = null;
            this.pinned = null;
            this.landscapeScalingConfig = null;
            this.portraitScalingConfig = null;
        };
        ResponsiveText.prototype.setPortraitScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.portraitScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        ResponsiveText.prototype.setLandscapeScaling = function (percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            if (pinnedPosition && pinnedX && pinnedY) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY);
            }
            else if (pinnedPosition && pinnedX) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX);
            }
            else if (pinnedPosition) {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition);
            }
            else {
                this.landscapeScalingConfig = new Fabrique.ScalingConfig(percentage, percentageOfWidth, scaleAnyway);
            }
            this.onResize();
        };
        return ResponsiveText;
    })(Phaser.Text);
    Fabrique.ResponsiveText = ResponsiveText;
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
    /**
     * Plugins used by OG-Fabrique
     */
    var Plugins;
    (function (Plugins) {
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
                                case Fabrique.PinnedPosition.topLeft:
                                    return new Phaser.Point(0, 0);
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
                Phaser.ScaleManager.prototype.scaleObjectDynamicly = function (object, percentage, percentageOfWidth, scaleAnyway) {
                    if (percentageOfWidth === void 0) { percentageOfWidth = true; }
                    if (scaleAnyway === void 0) { scaleAnyway = false; }
                    if (this.game.device.desktop && !scaleAnyway) {
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
                    return group.add(new Fabrique.ResponsiveImage(this.game, x, y, key, frame, pin));
                };
                //for the button
                Phaser.GameObjectFactory.prototype.responsiveButton = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.ResponsiveButton(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin));
                };
                //for the sprite
                Phaser.GameObjectFactory.prototype.responsiveSprite = function (x, y, key, frame, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.ResponsiveSprite(this.game, x, y, key, frame, pin));
                };
                //for the text
                Phaser.GameObjectFactory.prototype.responsiveText = function (x, y, text, style, pin, group) {
                    if (group === undefined) {
                        group = this.world;
                    }
                    return group.add(new Fabrique.ResponsiveText(this.game, x, y, text, style, pin));
                };
                //for the group
                Phaser.GameObjectFactory.prototype.responsiveGroup = function (parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
                    return new Fabrique.ResponsiveGroup(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            };
            Responsiveness.prototype.addResponsiveCreator = function () {
                //For the image
                Phaser.GameObjectCreator.prototype.responsiveImage = function (x, y, key, frame, pin) {
                    return new Fabrique.ResponsiveImage(this.game, x, y, key, frame, pin);
                };
                //for the button
                Phaser.GameObjectCreator.prototype.responsiveButton = function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin, group) {
                    return new Fabrique.ResponsiveButton(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, pin);
                };
                //for the sprite
                Phaser.GameObjectCreator.prototype.responsiveSprite = function (x, y, key, frame, pin) {
                    return new Fabrique.ResponsiveSprite(this.game, x, y, key, frame, pin);
                };
                //for the text
                Phaser.GameObjectCreator.prototype.responsiveText = function (x, y, text, style, pin) {
                    return new Fabrique.ResponsiveText(this.game, x, y, text, style, pin);
                };
                //for the text
                Phaser.GameObjectCreator.prototype.responsiveGroup = function (parent, name, addToStage, enableBody, physicsBodyType, x, y, pin) {
                    return new Fabrique.ResponsiveGroup(this.game, parent, name, addToStage, enableBody, physicsBodyType, x, y, pin);
                };
            };
            return Responsiveness;
        })(Phaser.Plugin);
        Plugins.Responsiveness = Responsiveness;
    })(Plugins = Fabrique.Plugins || (Fabrique.Plugins = {}));
})(Fabrique || (Fabrique = {}));
var Fabrique;
(function (Fabrique) {
    var ScalingConfig = (function () {
        function ScalingConfig(percentage, percentageOfWidth, scaleAnyway, pinnedPosition, pinnedX, pinnedY) {
            if (percentageOfWidth === void 0) { percentageOfWidth = true; }
            if (scaleAnyway === void 0) { scaleAnyway = false; }
            this.pinnedPosition = Fabrique.PinnedPosition.topLeft;
            this.x = 0;
            this.y = 0;
            this.percentage = percentage;
            this.percentageOfWidth = percentageOfWidth;
            this.scaleAnyway = scaleAnyway;
            if (pinnedPosition) {
                this.pinnedPosition = pinnedPosition;
            }
            if (pinnedX) {
                this.x = pinnedX;
            }
            if (pinnedY) {
                this.y = pinnedY;
            }
        }
        return ScalingConfig;
    })();
    Fabrique.ScalingConfig = ScalingConfig;
})(Fabrique || (Fabrique = {}));
//# sourceMappingURL=phaser-responsive.js.map