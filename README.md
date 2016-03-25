Phaser Responsive
================
Phaser-Responsive plugin adds images/sprites/buttons/groups that can be pinned to corners/sides/center!

Getting Started
---------------
First you want to get a fresh copy of the plugin. You can get it from this repo or from npm, ain't that handy.
```
npm install phaser-responsive --save-dev
```

Next up you'd want to add it to your list of js sources you load into your game
```html
<script src="node_modules/phaser-responsive/build/phaser-responsive.js"></script>
```

Usage
-----

### Load the plugin

You still need to load the plugin in your game. This is done just like any other plugin in Phaser
```javascript
game.plugins.add(Fabrique.Plugins.Responsiveness);
```

The plugin will patch your Phaser game with additional load/add/make methods so the responsive objects fits up in Phaser like any normal object!


Add an image, text, button or sprite as you would in Phaser, adding 'responsive' in front of the name.
When creating them, add a pin position in the parameters which can be either the middle of the canvas or one of it's edges.


The available pin positions are:


* topLeft
* topCenter
* topRight
* middleLeft
* middleCenter
* middleRight
* bottomLeft
* bottomCenter
* bottomRight

Then, set an anchor point to align the corner of the image/text/button/sprite with the corner of the canvas.

```javascript
sampleImage = game.add.responsiveImage(5, 5, 'square', null, Fabrique.PinnedPosition.bottomRight);
sampleImage.anchor.set(1, 1);
```

Changelog
---------
### 1.2.0
* objects can now store their portrait/landscape special scaling values

### 1.1.0
* Added static dynamic scaling method

### 1.0.1
* Initial release

Disclaimer
----------
We at OrangeGames just love playing and creating awesome games. We aren't affiliated with Phaser.io. We just needed some awesome objects that needed to be responsive in our awesome HTML5 games. Feel free to use it for enhancing your own awesome games!