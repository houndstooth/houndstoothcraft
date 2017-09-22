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
const START_LAYER = 0
const END_LAYER = 0

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
			colorSet: COLOR_SET,
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
		layerSettings: {
			startLayer: START_LAYER,
			endLayer: END_LAYER,
		},
	},
	animationsPattern: {},
	layersPattern: {},
}

export {
	CANVAS_SIZE,
	ZOOM,
	GRID_SIZE,
	TILE_SIZE,
	COLOR_ASSIGNMENT,
	COLOR_SET,
	OPACITY,
	START_LAYER,
	END_LAYER,
	FRAME_RATE,
	BASE_STRIPE_DIAGONAL,
	STRIPE_COUNT,
	HOUNDSTOOTH_DEFAULTS,
}
