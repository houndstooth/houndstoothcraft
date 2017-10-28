// tslint:disable:no-magic-numbers max-file-line-count

import { Frame } from '../animation'
import {
	BaseStripeDiagonal,
	getStandardTileOriginAndSize,
	GetStripePositions,
	GetTileOriginAndSize,
	standardStripePositions,
	StripeCountMode,
	Unit,
} from '../components'
import { Layer } from '../execute'
import { Context, Px } from '../page'
import { Radian } from '../space'
import * as to from '../utilities/to'
import {
	BasePattern,
	Effect,
	Houndstooth,
	LayerSettings,
	PatternFunctions,
	State,
	StripeCountContinuumSettings,
	StripePositionSettings,
	StripeSettings,
	TextureSettings,
	TileSettings,
	ViewSettings,
} from './types'
import { DEFAULT_ANIMATION_SETTINGS } from './types/settings/AnimationSettings'
import { DEFAULT_COLOR_SETTINGS } from './types/settings/ColorSettings'
import { DEFAULT_GRID_SETTINGS } from './types/settings/GridSettings'

const DEFAULT_CANVAS_SIZE: Px = to.Px(800)
const DEFAULT_ZOOM = 1
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_BASE_STRIPE_DIAGONAL: BaseStripeDiagonal = BaseStripeDiagonal.Minor
const DEFAULT_START_LAYER: Layer = to.Layer(0)
const DEFAULT_END_LAYER: Layer = to.Layer(0)
const DEFAULT_DELTA_STRIPE_COUNT = 1
const DEFAULT_INITIAL_STRIPE_COUNT = 1
const DEFAULT_STRIPE_COUNT_MODE: StripeCountMode = StripeCountMode.Standard
const DEFAULT_GET_STRIPE_POSITIONS: GetStripePositions = standardStripePositions
const DEFAULT_EXECUTE_TEXTURE: undefined = undefined
const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER: Radian = to.Radian(0)
const DEFAULT_ZOOM_ON_CANVAS_CENTER = false
const DEFAULT_NAME = 'standard'
const DEFAULT_ANIMATIONS_PATTERN: PatternFunctions = {}
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}
const DEFAULT_ANIMATING = false
const DEFAULT_CONTEXTS: Context[] = []
const DEFAULT_CURRENT_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_CURRENT_LAYER: Layer = to.Layer(0)
const DEFAULT_EXPORT_FRAMES = false
const DEFAULT_INTERVAL: undefined = undefined
const DEFAULT_LAST_SAVED_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_MIXED_DOWN_CANVAS: undefined = undefined
const DEFAULT_MIXING_DOWN = false
const DEFAULT_PERFORMANCE_LOGGING = false
const DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS: Effect[] = []

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
	stripeCount: DEFAULT_STRIPE_COUNT,
	stripeCountContinuumSettings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
}
const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: DEFAULT_STRIPE_POSITION_SETTINGS,
}

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	executeTexture: DEFAULT_EXECUTE_TEXTURE,
}

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
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
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	layersPattern: DEFAULT_LAYERS_PATTERN,
	name: DEFAULT_NAME,
}

const DEFAULT_STATE: State = {
	animating: DEFAULT_ANIMATING,
	contexts: DEFAULT_CONTEXTS,
	currentFrame: DEFAULT_CURRENT_ANIMATION_FRAME,
	currentLayer: DEFAULT_CURRENT_LAYER,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	interval: DEFAULT_INTERVAL,
	lastSavedFrame: DEFAULT_LAST_SAVED_ANIMATION_FRAME,
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
	mixedDownContext: DEFAULT_MIXED_DOWN_CANVAS,
	mixingDown: DEFAULT_MIXING_DOWN,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	selectedHoundstoothEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
}

export {
	DEFAULT_CANVAS_SIZE,
	DEFAULT_BASE_PATTERN,
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_HOUNDSTOOTH,
	DEFAULT_STATE,
}
