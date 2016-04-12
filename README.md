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

### Create responsive objects

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

### Set scaling for objects

By setting the landscape/portrait scaling for an object, the object will be scaled a certain percentage of the width or height of the total game. 
By default the width will be used, if you want the object to scale according to the height, you can pass the seccond parameter as false.
The scaling will only be done on mobile, if you want the objects to be scaled when your game is running on desktop you can pass the third parameter as true.

In the next example the sampleImage will always be 50% of the game width in landscape and 50% of the game height in portrait.

```javascript
sampleImage = game.add.responsiveImage(5, 5, 'square', null, Fabrique.PinnedPosition.bottomRight);
sampleImage.setLandscapeScaling(50, true, false);
sampleImage.setPortraitScaling(50, false, false);
```

### Relative pinned position
If you want the offset of your objects to be relative to the game size you can also pass a pinned position and an x and y offset to the landscape/portrait scaling.

In the next example the sampleImage will always be 20% of the game width and be positioned to the middle left.
When the image is the original size the offset will be 100px, when the image is scale the 100px will be relative to the scaling.

```javascript
sampleImage = game.add.responsiveImage(5, 5, 'square', null);
sampleImage.setLandscapeScaling(20, true, false, Fabrique.PinnedPosition.middleLeft, 100, 0);
sampleImage.setPortraitScaling(20, true, false, Fabrique.PinnedPosition.middleLeft, 100, 0);
```

Changelog
---------
### 1.3.0
* Pinned position offset is now relative to portrait/landscape scaling

### 1.2.0
* Objects can now store their portrait/landscape special scaling values

### 1.1.0
* Added static dynamic scaling method

### 1.0.1
* Initial release

Disclaimer
----------
We at OrangeGames just love playing and creating awesome games. We aren't affiliated with Phaser.io. We just needed some awesome objects that needed to be responsive in our awesome HTML5 games. Feel free to use it for enhancing your own awesome games!