// tslint:disable:no-magic-numbers

import { Assignment, AssignmentMode, BaseStripeDiagonal, Supertile } from '../components'
import { BLACK, TRANSPARENT } from '../constants'
import { Color } from '../render'
import { BasePattern, Houndstooth, State } from './types'

const DEFAULT_CANVAS_SIZE = 800
const DEFAULT_ZOOM = 1
const DEFAULT_GRID_SIZE = 16
const DEFAULT_TILE_SIZE = 50 as any
const DEFAULT_COLOR_SET: Color[] = [ BLACK, TRANSPARENT ]
const DEFAULT_COLOR_ASSIGNMENT: Assignment = {
	assignmentMode: AssignmentMode.WEAVE,
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ] as Supertile,
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
}
const DEFAULT_OPACITY = 1
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_BASE_STRIPE_DIAGONAL = BaseStripeDiagonal.MINOR
const DEFAULT_FRAME_RATE = 1.005
const DEFAULT_START_LAYER = 0
const DEFAULT_END_LAYER = 0

const DEFAULT_PATTERN: BasePattern = {
	animationSettings: {
		frameRate: DEFAULT_FRAME_RATE,
	},
	colorSettings: {
		assignment: DEFAULT_COLOR_ASSIGNMENT,
		colorSet: DEFAULT_COLOR_SET,
		opacity: DEFAULT_OPACITY,
	},
	gridSettings: {
		gridSize: DEFAULT_GRID_SIZE,
	},
	layerSettings: {
		endLayer: DEFAULT_END_LAYER,
		startLayer: DEFAULT_START_LAYER,
	},
	stripeSettings: {
		baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
		stripePositionSettings: {
			stripeCountSetting: DEFAULT_STRIPE_COUNT,
		},
	},
	tileSettings: {
		tileSizeSetting: DEFAULT_TILE_SIZE,
	},
	viewSettings: {
		canvasSize: DEFAULT_CANVAS_SIZE as any,
		zoom: DEFAULT_ZOOM,
	},
}

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: {},
	basePattern: DEFAULT_PATTERN,
	layersPattern: {},
	name: 'standard',
}

const DEFAULT_STATE: State = {
	animating: false,
	contexts: [],
	currentAnimationFrame: 0,
	currentLayer: 0,
	exportFrames: false,
	interval: undefined,
	lastSavedAnimationFrame: 0,
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
	mixedDownContext: undefined,
	mixingDown: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
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
