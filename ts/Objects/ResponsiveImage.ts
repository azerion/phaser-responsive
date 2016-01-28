module Fabrique {

    export class ResponsiveImage extends Phaser.Image implements IResponsiveObject {
        public pinned:PinnedPosition;

        public base:Phaser.Point;

        constructor(game:Phaser.Game, x:number, y:number, key:string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?:string | number, pin:PinnedPosition = PinnedPosition.topLeft) {
            super(game, x, y, key, frame);
            this.game.scale.onSizeChange.add(() => this.onResize(), null);

            this.base = new Phaser.Point(x || 0, y || 0);

            this.setPinned(pin);
        }

        public setPinned(pin:PinnedPosition, x?:number, y?:number) {
            if (undefined !== x && undefined !== y) {
                this.base = new Phaser.Point(x, y);
            }

            this.pinned = pin;
            this.onResize();
        }

        public onResize() {
            if (this.game === null) {
                return;
            }

            var g = (<Fabrique.Plugins.ResponsiveGame>this.game).getPinnedBase(this.pinned);
            this.x = this.base.x + g.x;
            this.y = this.base.y + g.y;
        }

        public destroy(destroyChildren?:boolean) {
            super.destroy(destroyChildren);

            this.base = null;
            this.pinned = null;
        }
    }
}