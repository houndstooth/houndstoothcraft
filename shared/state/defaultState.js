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
			ginghamChevronContinuum: {
				on: false,
				thinningRate: 1,
				offset: 0,
				// manualConfig: {
				// 	continuumStartsAtStripeCount: 1,
				// 	stripeCountIncreasePerDiagonal: 1
				// }
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
		// stripeStyle: 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID' // good for gcc when doing aligning style
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
