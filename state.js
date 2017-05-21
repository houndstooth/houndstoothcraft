import { BLACK, WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW } from './shared/render/colors'

export default {
    cmyktooth: {
        startIteration: 0, //this should probably be generalized, no wait, opposite, because anything could have its own iterations
        cmykColorsMode: true,
        layerColor: null,
        layerRotation: 0
    },
    ginghamChevronContinuum: {
        continuumStartsAtStripeCount: 3,
        stripeCountIncreasePerDiagonal: 2
    },
    ginghamChevronContinuumAnimated: {
        thinningRate: 1 // shouldn't this just be replaced with the same as non-animated, and just be like the initial rate?
    },
    houndazzle: {
        substripeCount: 16,
        dazzleContinuum: false
    },
    shared: {
        canvasSize: 1000,
        unit: 1,
        endIteration: 32,
        gridSize: 11,
        tileSize: 100,
        colorA: BLACK,
        colorB: WHITE,
        stripeCount: 4,
        switcheroo: false,
        flipGrain: false,
        tileRotationAboutTileCenter: 0,
        baseStripeDiagonal: 'MINOR', // 'PRINICIPAL'
        ginghamMode: false,
        gongramColors: false,
        gridRotationAboutCenter: 0,
        stripeStyle: 'STANDARD'
        // stripeStyle: 'DERASTERIZED_BY_AREA'
        // stripeStyle: 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID' // good for gcc
        // stripeStyle: 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE' // good for harmonitooth, i.e. animating when full continuum in each tile
    },
    animation: {
        frameRate: 1000 / 60,
        animating: true
    }
}
