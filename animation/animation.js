

export default {
    cmyktooth: {
        startIteration: null,
        endIteration: null,
        cmykColorsMode: null,
        layerColor: null,
        layerRotation: null
    },
    houndazzle: {
        substripeCount: null,
        dazzleContinuum: null
    },
    houndsmorphosis: {
        endIteration: null
    },
    shared: {
        canvasSize: null,
        unit: null, //p => p * 1.005,
        endIteration: null,
        gridSize: null,
        tileSize: null,
        colorA: null,
        colorB: null,
        stripeCount: {
            baseCount: p => p * 1.005,
            ginghamChevronContinuum: {
                on: null,
                style: null,
                fluid: {
                    thinningRate: p => p * 1.002
                },
                // yeah, these ones are no good for animation
                // because it's not fluid, they just snap here to there over thresholds
                // only for positioning for a static
                aligning: {
                    continuumStartsAtStripeCount: null, //p => p * 1.01,
                    stripeCountIncreasePerDiagonal: null, //p => p * 1.005
                }
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