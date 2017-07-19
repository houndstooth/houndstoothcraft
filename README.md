[![Build Status](https://travis-ci.org/houndstooth/web-render.svg?branch=master)](https://travis-ci.org/houndstooth/web-render)

```
{
    viewSettings: {
        canvasSize: number,
        zoom: number,
        zoomOnCanvasCenter: boolean,
        centerViewOnCenterOfTileAtZeroZeroAddress: boolean,
        rotateViewAboutCanvasCenter: number,
    },
    gridSettings: {
        gridSize: number,
        includeNegativeQuadrants: boolean,
    },
    tileSettings: {
        tileSize: number,
        collapseSameColoredShapesWithinTile: boolean,
        isTileUniform: function (returns boolean),
        tileToShapes: function (returns ?),
        getCoordinates: {
            whenTileIsUniform: function (returns ?),
            whenTileIsMultiform: function (returns ?),
        },
    },
    colorSettings: (this is itself a settings) {
        set: array of colors (use ts),
        houndazzle: {
            substripeCount: number,
            dazzleContinuum: boolean,
            orientationSettings: settings (use ts),
        },
        assignment: {
            switcheroo: boolean,
            flipGrain: boolean,
            assignmentMode: string (use ts to limit),
            offsetAddress: coordinate (use ts),
            supertile: array of array of coordinate,
            weave: weave (use ts),
            transformAssignedSet: function (returns ?),
        },
        opacity: scalar (number 0 to 1),
    },
    stripeCountSettings: {
        stripeCountMode: string (use ts to limit),
        stripeCount: number,
        ginghamChevronContinuum: gcc (use ts),
    },
    gatherOptions: function (returns ?),
    baseStripeDiagonal: string (use ts to limit),
    getTileOriginAndSize: function (returns ?),
    getStripePositions: function (returns array of numbers),
    animation: {
        frameRate: number,
        startAnimationFrame: number,
        endAnimationFrame: number,
        refreshCanvas: boolean,
    },
    iteration: {
        startIterationFrame: number,
        endIterationFrame: number,
    },
}
```
