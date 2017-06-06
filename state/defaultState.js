import { BLACK, TRANSPARENT } from '../application/constants' // WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW

export default {
	houndsmorphosisMode: false,
	canvasSize: 800,
	unit: 1,
	gridSize: 16,
	tileSize: 50,
	colorConfig: {
		set: [ BLACK, TRANSPARENT ],
		mode: 'STANDARD', // 'HOUNDAZZLE'
		houndazzle: {
			substripeCount: 16,
			dazzleContinuum: false,
			orientationConfig: { set: [ 'HORIZONTAL', 'VERTICAL' ] }
		},
		assignment: {
			switcheroo: false,
			flipGrain: false,
			mode: 'WEAVE', // 'SUPERTILE'
			// offsetAddress: null,
			supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
			weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
		},
		opacity: 1
	},
	stripeCountConfig: {
		mode: 'STANDARD', // 'GINGHAM', 'GINGHAM_CHEVRON_CONTINUUM'
		stripeCount: 4,
		ginghamChevronContinuum: { initial: 1, delta: 1 }
	},
	tileRotationAboutTileCenter: 0,
	baseStripeDiagonal: 'MINOR',
	gridRotationAboutGridCenter: 0,
	negativeGridToo: false,
	centerViewOnCenterOfTileAtZeroZeroAddress: false,
	getShapeOriginAndSizedUnit: null,
	getStripePositions: null,
	scaleFromCanvasCenter: true,
	animation: {
		frameRate: 1000 / 60,
		refreshCanvas: true
	},
	iteration: {
		startIteration: 0,
		endIteration: 8
	}
}
