import { BLACK, TRANSPARENT } from '../constants'

export default {
	viewConfig: {
		canvasSize: 800,
		zoom: 1,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtZeroZeroAddress: false
	},
	gridConfig: {
		gridSize: 16,
		gridRotationAboutGridCenter: 0,
		includeNegativeQuadrants: false
	},
	tileConfig: {
		tileSize: 50,
		collapseSameColoredShapesWithinTile: true,
		isTileUniform: null,
		tileToShapes: null,
		getCoordinates: {
			whenTileIsUniform: null,
			whenTileIsMultiform: null
		}
	},
	colorConfig: {
		set: [ BLACK, TRANSPARENT ],
		mode: 'STANDARD',
		houndazzle: {
			substripeCount: 16,
			dazzleContinuum: false,
			orientationConfig: null
		},
		assignment: {
			switcheroo: false,
			flipGrain: false,
			mode: 'WEAVE',
			offsetAddress: null,
			supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
			weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
		},
		opacity: 1
	},
	stripeCountConfig: {
		mode: 'STANDARD',
		stripeCount: 4,
		ginghamChevronContinuum: { initial: 1, delta: 1 }
	},
	gatherOptions: null,
	baseStripeDiagonal: 'MINOR',
	getTileOriginAndSizedUnit: null,
	getStripePositions: null,
	animation: {
		frameRate: 1000 / 60,
		refreshCanvas: true
	},
	iteration: {
		startIteration: 0,
		endIteration: 8
	}
}
