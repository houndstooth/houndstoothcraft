

export default {
    cmyktooth: {
        startIteration: null,
        cmykColorsMode: null,
        layerColor: null,
        layerRotation: null
    },
    ginghamChevronContinuumAnimated: {
        thinningRate: null // thinningRate => thinningRate * 1.005
    },
    houndazzle: {
        substripeCount: null,
        dazzleContinuum: null
    },
    shared: {
        canvasSize: null,
        unit: p => p * 1.005,
        endIteration: null,
        gridSize: null,
        tileSize: null,
        colorA: null,
        colorB: null,
        stripeCount: {
            baseCount: null, //p => p * 1.005,
            ginghamChevronContinuum: {
                on: null,
                continuumStartsAtStripeCount: null,
                stripeCountIncreasePerDiagonal: null
            }
        },
        switcheroo: null,
        flipGrain: null,
        tileRotationAboutTileCenter: null,
        baseStripeDiagonal: null,
        ginghamMode: null,
        gongramColors: null,
        gridRotationAboutCenter: null, //p => p + Math.PI / 360,
        stripeStyle: null
    },
    animation: {
        frameRate: null,
        animating: null,
        refreshCanvas: null
    }
}