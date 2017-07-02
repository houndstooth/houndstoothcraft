import { BLACK, TRANSPARENT } from './constants'

const GRID_SIZE = 16
const TILE_SIZE = 50
const ZOOM = 1
const COLOR_SET = [ BLACK, TRANSPARENT ]
const COLOR_ASSIGNMENT = {
	mode: 'WEAVE',
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
}
const OPACITY = 1
const STRIPE_COUNT = 4
const BASE_STRIPE_DIAGONAL = 'MINOR'
const CANVAS_SIZE = 800
const FRAME_RATE = 1.005
const END_ITERATION = 100

export {
	GRID_SIZE,
	TILE_SIZE,
	ZOOM,
	COLOR_SET,
	COLOR_ASSIGNMENT,
	OPACITY,
	STRIPE_COUNT,
	BASE_STRIPE_DIAGONAL,
	CANVAS_SIZE,
	FRAME_RATE,
	END_ITERATION,
}
