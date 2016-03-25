module Fabrique {
    export interface IResponsiveObject {
        portraitScalingConfig: ScalingConfig;
        landscapeScalingConfig: ScalingConfig;
        pinned: PinnedPosition;
        base: Phaser.Point;
        setPinned: (pin:PinnedPosition, x?:number, y?:number) => void;
        setPortraitScaling: (percentage: number, percentageOfWidth?: boolean, scaleAnyway?: boolean) => void;
        setLandscapeScaling: (percentage: number, percentageOfWidth?: boolean, scaleAnyway?: boolean) => void;
        onResize: () => void;
        destroy: (destroyChilderen:boolean) => void;
    }
}