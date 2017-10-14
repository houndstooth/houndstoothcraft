import { BLACK, TRANSPARENT } from '../constants'
import { Color } from '../render'
import { Assignment } from '../components'
import { BasePattern, Houndstooth, State } from './types'
import Supertile from '../components/types/Supertile'

const DEFAULT_CANVAS_SIZE: number = 800
const DEFAULT_ZOOM: number = 1
const DEFAULT_GRID_SIZE: number = 16
const DEFAULT_TILE_SIZE: number = 50
const DEFAULT_COLOR_SET: Color[] = [ BLACK, TRANSPARENT ]
const DEFAULT_COLOR_ASSIGNMENT: Assignment = {
	assignmentMode: 'WEAVE',
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
	supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ] as Supertile,
}
const DEFAULT_OPACITY: number = 1
const DEFAULT_STRIPE_COUNT: number = 4
const DEFAULT_BASE_STRIPE_DIAGONAL: string = 'MINOR'
const DEFAULT_FRAME_RATE: number = 1.005
const DEFAULT_START_LAYER: number = 0
const DEFAULT_END_LAYER: number = 0

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
	mixedDownContext: null,
	lastSavedAnimationFrame: 0,
	interval: null,
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
