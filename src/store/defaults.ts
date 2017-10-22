// tslint:disable:no-magic-numbers max-file-line-count

import {
	AssignmentMode,
	BaseStripeDiagonal,
	getStandardTileOriginAndSize,
	standardStripePositions,
	StripeCountMode,
	Unit,
} from '../components'
import { BLACK, TRANSPARENT } from '../constants'
import { Color } from '../render'
import * as to from '../to'
import {
	AnimationSettings,
	BasePattern,
	ColorAssignment,
	ColorSettings,
	GridSettings,
	Houndstooth,
	LayerSettings,
	State,
	StripeCountContinuumSettings,
	StripePositionSettings,
	StripeSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
} from './types'

const DEFAULT_CANVAS_SIZE = to.Dimension(800)
const DEFAULT_ZOOM = 1
const DEFAULT_GRID_SIZE = 16
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)
const DEFAULT_COLOR_SET: Color[] = [ BLACK, TRANSPARENT ]
const DEFAULT_COLOR_ASSIGNMENT: ColorAssignment = {
	assignmentMode: AssignmentMode.Weave,
	flipGrain: false,
	offsetAddress: () => to.Address([ 0, 0 ]),
	supertile: to.Supertile([ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ]),
	switcheroo: false,
	transformTileColorIndices: ({ tileColorIndices }) => tileColorIndices,
	weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
}
const DEFAULT_OPACITY = 1
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_BASE_STRIPE_DIAGONAL = BaseStripeDiagonal.Minor
const DEFAULT_FRAME_RATE = 1.005
const DEFAULT_START_LAYER = to.Layer(0)
const DEFAULT_END_LAYER = to.Layer(0)
const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_END_ANIMATION_FRAME = to.Frame(0)
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS = false
const DEFAULT_REFRESH_CANVAS = true
const DEFAULT_START_ANIMATION_FRAME = to.Frame(0)
const DEFAULT_DELTA_STRIPE_COUNT = 1
const DEFAULT_INITIAL_STRIPE_COUNT = 1
const DEFAULT_STRIPE_COUNT_MODE = StripeCountMode.Standard
const DEFAULT_GET_STRIPE_POSITIONS = standardStripePositions
const DEFAULT_RENDER_TEXTURE = undefined
const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE = getStandardTileOriginAndSize
const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER = to.Radian(0)
const DEFAULT_ZOOM_ON_CANVAS_CENTER = false

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	endAnimationFrame: DEFAULT_END_ANIMATION_FRAME,
	frameRate: DEFAULT_FRAME_RATE,
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
	startAnimationFrame: DEFAULT_START_ANIMATION_FRAME,
}

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignment: DEFAULT_COLOR_ASSIGNMENT,
	colorSet: DEFAULT_COLOR_SET,
	opacity: DEFAULT_OPACITY,
}

const DEFAULT_GRID_SETTINGS: GridSettings = {
	gridSize: DEFAULT_GRID_SIZE,
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
}

const DEFAULT_LAYER_SETTINGS: LayerSettings = {
	endLayer: DEFAULT_END_LAYER,
	startLayer: DEFAULT_START_LAYER,
}

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}
const DEFAULT_STRIPE_POSITION_SETTINGS: StripePositionSettings = {
	getStripePositions: DEFAULT_GET_STRIPE_POSITIONS,
	stripeCountContinuumSettings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
	stripeCountSetting: DEFAULT_STRIPE_COUNT,
}
const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: DEFAULT_STRIPE_POSITION_SETTINGS,
}

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	renderTexture: DEFAULT_RENDER_TEXTURE,
}

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSizeSetting: DEFAULT_TILE_SIZE,
}

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	canvasSize: DEFAULT_CANVAS_SIZE,
	centerViewOnCenterOfTileAtHomeAddress: DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS,
	rotateViewAboutCanvasCenter: DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER,
	zoom: DEFAULT_ZOOM,
	zoomOnCanvasCenter: DEFAULT_ZOOM_ON_CANVAS_CENTER,
}

const DEFAULT_BASE_PATTERN: BasePattern = {
	animationSettings: DEFAULT_ANIMATION_SETTINGS,
	colorSettings: DEFAULT_COLOR_SETTINGS,
	gridSettings: DEFAULT_GRID_SETTINGS,
	layerSettings: DEFAULT_LAYER_SETTINGS,
	stripeSettings: DEFAULT_STRIPE_SETTINGS,
	textureSettings: DEFAULT_TEXTURE_SETTINGS,
	tileSettings: DEFAULT_TILE_SETTINGS,
	viewSettings: DEFAULT_VIEW_SETTINGS,
}

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: {},
	basePattern: DEFAULT_BASE_PATTERN,
	layersPattern: {},
	name: 'standard',
}

const DEFAULT_STATE: State = {
	animating: false,
	contexts: [],
	currentAnimationFrame: to.Frame(0),
	currentLayer: to.Layer(0),
	exportFrames: false,
	interval: undefined,
	lastSavedAnimationFrame: to.Frame(0),
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
	mixedDownContext: undefined,
	mixingDown: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
}

export {
	DEFAULT_CANVAS_SIZE,
	DEFAULT_BASE_PATTERN,
	DEFAULT_HOUNDSTOOTH,
	DEFAULT_STATE,
}
