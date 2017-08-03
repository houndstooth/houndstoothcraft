import { BLACK, TRANSPARENT } from '../constants'

const CANVAS_SIZE = 800
const ZOOM = 1
const GRID_SIZE = 16
const TILE_SIZE = 50
const COLOR_SET = [ BLACK, TRANSPARENT ]
const COLOR_ASSIGNMENT = {
	assignmentMode: 'WEAVE',
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
}
const OPACITY = 1
const STRIPE_COUNT = 4
const BASE_STRIPE_DIAGONAL = 'MINOR'
const FRAME_RATE = 1.005
const START_ITERATION_FRAME = 0
const END_ITERATION_FRAME = 0

const HOUNDSTOOTH_DEFAULTS = {
	basePattern: {
		viewSettings: {
			canvasSize: CANVAS_SIZE,
			zoom: ZOOM,
		},
		gridSettings: {
			gridSize: GRID_SIZE,
		},
		tileSettings: {
			tileSizeSetting: TILE_SIZE,
		},
		colorSettings: {
			set: COLOR_SET,
			assignment: COLOR_ASSIGNMENT,
			opacity: OPACITY,
		},
		stripeSettings: {
			stripePositionSettings: {
				stripeCountSetting: STRIPE_COUNT,
			},
			baseStripeDiagonal: BASE_STRIPE_DIAGONAL,
		},
		animationSettings: {
			frameRate: FRAME_RATE,
		},
		iterationSettings: {
			startIterationFrame: START_ITERATION_FRAME,
			endIterationFrame: END_ITERATION_FRAME,
		},
	},
	animationsPattern: {},
	iterationsPattern: {},
}

export default {
	HOUNDSTOOTH_DEFAULTS,
	CANVAS_SIZE,
	ZOOM,
	GRID_SIZE,
	TILE_SIZE,
	COLOR_SET,
	COLOR_ASSIGNMENT,
	OPACITY,
	STRIPE_COUNT,
	BASE_STRIPE_DIAGONAL,
	FRAME_RATE,
	START_ITERATION_FRAME,
	END_ITERATION_FRAME,
}
