import { BLACK, TRANSPARENT } from '../constants'

export const CANVAS_SIZE = 800
export const ZOOM = 1
export const GRID_SIZE = 16
export const TILE_SIZE = 50
export const COLOR_SET = [ BLACK, TRANSPARENT ]
export const COLOR_ASSIGNMENT = {
	assignmentMode: 'WEAVE',
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
}
export const OPACITY = 1
export const STRIPE_COUNT = 4
export const BASE_STRIPE_DIAGONAL = 'MINOR'
export const FRAME_RATE = 1.005
export const START_LAYER = 0
export const END_LAYER = 0

export const HOUNDSTOOTH_DEFAULTS = {
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
