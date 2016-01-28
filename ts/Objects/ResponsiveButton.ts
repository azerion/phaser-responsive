module Fabrique {
    export class ResponsiveButton extends Phaser.Button implements IResponsiveObject {
        public pinned:PinnedPosition;

        public base:Phaser.Point;

        constructor(game:Phaser.Game, x?:number, y?:number, key?:string, callback?:Function, callbackContext?:any, overFrame?:string | number, outFrame?:string | number, downFrame?:string | number, upFrame?:string | number, pin:PinnedPosition = PinnedPosition.topLeft) {
            super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

            this.game.scale.onSizeChange.add(() => this.onResize(), this);

            this.base = new Phaser.Point(x || 0, y || 0)

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