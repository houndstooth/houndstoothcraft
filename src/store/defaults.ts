import { BLACK, TRANSPARENT } from '../constants'
import { Color } from '../render'
import { Assignment, Supertile, AssignmentMode } from '../components'
import { BasePattern, Houndstooth, State } from './types'

const DEFAULT_CANVAS_SIZE = 800
const DEFAULT_ZOOM = 1
const DEFAULT_GRID_SIZE = 16
const DEFAULT_TILE_SIZE = 50 as any
const DEFAULT_COLOR_SET: Color[] = [ BLACK, TRANSPARENT ]
const DEFAULT_COLOR_ASSIGNMENT: Assignment = {
	assignmentMode: AssignmentMode.WEAVE,
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ] as Supertile,
}
const DEFAULT_OPACITY = 1
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_BASE_STRIPE_DIAGONAL = 'MINOR'
const DEFAULT_FRAME_RATE = 1.005
const DEFAULT_START_LAYER = 0
const DEFAULT_END_LAYER = 0

const DEFAULT_PATTERN: BasePattern = {
	viewSettings: {
		canvasSize: DEFAULT_CANVAS_SIZE as any,
		zoom: DEFAULT_ZOOM,
	},
	gridSettings: {
		gridSize: DEFAULT_GRID_SIZE,
	},
	tileSettings: {
		tileSizeSetting: DEFAULT_TILE_SIZE,
	},
	colorSettings: {
		colorSet: DEFAULT_COLOR_SET,
		assignment: DEFAULT_COLOR_ASSIGNMENT,
		opacity: DEFAULT_OPACITY,
	},
	stripeSettings: {
		stripePositionSettings: {
			stripeCountSetting: DEFAULT_STRIPE_COUNT,
		},
		baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	},
	animationSettings: {
		frameRate: DEFAULT_FRAME_RATE,
	},
	layerSettings: {
		startLayer: DEFAULT_START_LAYER,
		endLayer: DEFAULT_END_LAYER,
	},
}

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	basePattern: DEFAULT_PATTERN,
	animationsPattern: {},
	layersPattern: {},
	name: 'standard',
}

const DEFAULT_STATE: State = {
	currentLayer: 0,
	currentAnimationFrame: 0,
	contexts: [],
	mixedDownContext: undefined,
	lastSavedAnimationFrame: 0,
	interval: undefined,
	animating: false,
	exportFrames: false,
	mixingDown: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
}

export {
	DEFAULT_STATE,
	DEFAULT_HOUNDSTOOTH,
	DEFAULT_PATTERN,
	DEFAULT_CANVAS_SIZE,
	DEFAULT_ZOOM,
	DEFAULT_GRID_SIZE,
	DEFAULT_TILE_SIZE,
	DEFAULT_COLOR_ASSIGNMENT,
	DEFAULT_COLOR_SET,
	DEFAULT_OPACITY,
	DEFAULT_START_LAYER,
	DEFAULT_END_LAYER,
	DEFAULT_FRAME_RATE,
	DEFAULT_BASE_STRIPE_DIAGONAL,
	DEFAULT_STRIPE_COUNT,
}
