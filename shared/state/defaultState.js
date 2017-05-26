import { BLACK, TRANSPARENT } from '../render/colors' // WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW

export default {
	houndazzle: {
		substripeCount: 16,
		dazzleContinuum: true
	},
	houndsmorphosis: {
		endIteration: 32
	},
	shared: {
		canvasSize: 800,
		unit: 1,
		gridSize: 16,
		tileSize: 50,
		colorA: BLACK,
		colorB: TRANSPARENT,
		stripeCount: {
			baseCount: 4,
			// might be cool to try replacing this with a function, and when "off" it's just a function that always returns a simple baseCount
			ginghamChevronContinuum: {
				on: false,
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
		baseStripeDiagonal: 'MINOR', // 'PRINICIPAL' //then maybe within stripes there should be like a stripe orientation config
		ginghamMode: false, //this should go into the stripes bucket, because it obviates them all
		gongramColors: false,
		gridRotationAboutCenter: 0,
		opacity: 1,
		supertileOffset: [ 0, 0 ],
		offsetOrigin: [ 0, 0 ],
		negativeGridToo: false,
		stripeStyle: 'STANDARD'
		// stripeStyle: 'DERASTERIZED_BY_AREA'
		// stripeStyle: 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID' // good for gcc
		// stripeStyle: 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE' // good for harmonitooth, i.e. animating when full continuum in each tile
	},
	animation: {
		frameRate: 1000 / 60,
		refreshCanvas: true
	},
	iteration: {
		startIteration: 0,
		endIteration: 8
	}
}
