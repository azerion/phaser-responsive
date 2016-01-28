module Fabrique {
    export interface IResponsiveObject {
        pinned: PinnedPosition;
        base: Phaser.Point;
        setPinned: (pin:PinnedPosition, x?:number, y?:number) => void;
        onResize: () => void;
        destroy: (destroyChilderen:boolean) => void;
    }
}