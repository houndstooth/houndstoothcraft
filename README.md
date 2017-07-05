```
{
    viewSettings: {
        canvasSize: number,
        zoom: number,
        zoomOnCanvasCenter: boolean,
        centerViewOnCenterOfTileAtZeroZeroAddress: boolean
    },
    gridSettings: {
        gridSize: number,
        gridRotationAboutGridCenter: number,
        includeNegativeQuadrants: boolean
    },
    tileSettings: {
        tileSize: number,
        collapseSameColoredShapesWithinTile: boolean,
        isTileUniform: function (returns boolean),
        tileToShapes: function (returns ?),
        getCoordinates: {
            whenTileIsUniform: function (returns ?),
            whenTileIsMultiform: function (returns ?)
        }
    },
    colorSettings: (this is itself a settings) {
        set: array of colors (use ts),
        mode: string (use ts to limit),
        houndazzle: {
            substripeCount: number,
            dazzleContinuum: boolean,
            orientationSettings: settings (use ts)
        },
        assignment: {
            switcheroo: boolean,
            flipGrain: boolean,
            mode: string (use ts to limit),
            offsetAddress: coordinate (use ts),
            supertile: array of array of coordinate,
            weave: weave (use ts)
        },
        opacity: scalar (number 0 to 1)
    },
    stripeCountSettings: {
        mode: string (use ts to limit),
        stripeCount: number,
        ginghamChevronContinuum: gcc (use ts)
    },
    gatherOptions: function (returns ?),
    baseStripeDiagonal: string (use ts to limit)
    getTileOriginAndSizedUnit: function (returns ?),
    getStripePositions: function (returns array of numbers),
    animation: {
        frameRate: number,
        refreshCanvas: boolean
    },
    iteration: {
        startIteration: number,
        endIteration: number
    }
}
```
