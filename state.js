import { BLACK, WHITE } from './shared/common/colors'

export default {
    cmyktooth: {
        startIteration: 0, //this should probably be generalized
        cmykColorsMode: true,
        layerColor: null,
        orientation: null
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
        gridSize: 16,
        tileSize: 80,
        colorA: BLACK,
        colorB: WHITE,
        frameRate: 1000 / 60,
        animating: false,
        stripeCount: 4,
        switcheroo: false,
        flipGrain: false,
        tileRotationAboutTileCenter: 0, // i htought i changed this already, but should be rotation of each tile about its center
        baseStripeDiagonal: 'MINOR', // 'PRINICIPAL'
        ginghamMode: false,
        gongramColors: false,
        stripeStyle: 'STANDARD'
        // stripeStyle: 'DERASTERIZED_BY_AREA'
        // stripeStyle: 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID' // good for gcc
        // stripeStyle: 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE' // good for harmonitooth, i.e. animating when full continuum in each tile
    }
}
