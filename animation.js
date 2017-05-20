

export default {
    cmyktooth: {
        startIteration: null,
        cmykColorsMode: null,
        layerColor: null,
        layerRotation: null
    },
    ginghamChevronContinuum: {
        continuumStartsAtStripeCount: null,
        stripeCountIncreasePerDiagonal: null
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
        unit: null,
        endIteration: null,
        gridSize: null,
        tileSize: null,
        colorA: null,
        colorB: null,
        frameRate: null,
        animating: null,
        stripeCount: stripeCount => stripeCount * 1.005,
        switcheroo: null,
        flipGrain: null,
        tileRotationAboutTileCenter: null,
        baseStripeDiagonal: null,
        ginghamMode: null,
        gongramColors: null,
        gridRotationAboutCenter: gridRotationAboutCenter => gridRotationAboutCenter * 1.005,
        stripeStyle: null
    }
}