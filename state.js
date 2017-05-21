import { BLACK, WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW } from './shared/render/colors'

export default {
    cmyktooth: {
        startIteration: 0, //this should probably be generalized, no wait, opposite, because anything could have its own iterations
        cmykColorsMode: true,
        layerColor: null,
        layerRotation: 0
    },
    houndazzle: {
        substripeCount: 16,
        dazzleContinuum: true
    },
    shared: {
        canvasSize: 1000,
        unit: 1,
        endIteration: 4,
        gridSize: 8,
        tileSize: 100,
        colorA: BLACK,
        colorB: WHITE,
        stripeCount: {
            baseCount: 16,
            // might be cool to try replacing this with a function, and when "off" it's just a function that always returns a simple baseCount
            ginghamChevronContinuum: {
                on: true,
                style: 'FLUID', //'ALIGNING', //
                //note - fluid style overrides stripeStyle... how to account for this in this state model?
                fluid: {
                    thinningRate: 1
                },
                aligning: {
                    continuumStartsAtStripeCount: 3,
                    stripeCountIncreasePerDiagonal: 2
                }
            },
        },
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
        animating: true,
        refreshCanvas: true
    }
}