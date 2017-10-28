// tslint:disable:no-magic-numbers max-file-line-count

import { Frame } from '../animation'
import { Layer } from '../execute'
import { Context, Px } from '../page'
import { Radian } from '../space'
import * as to from '../utilities/to'
import { BasePattern, Effect, Houndstooth, PatternFunctions, State, ViewSettings } from './types'
import { DEFAULT_ANIMATION_SETTINGS } from './types/settings/AnimationSettings'
import { DEFAULT_COLOR_SETTINGS } from './types/settings/ColorSettings'
import { DEFAULT_GRID_SETTINGS } from './types/settings/GridSettings'
import { DEFAULT_LAYER_SETTINGS } from './types/settings/LayerSettings'
import { DEFAULT_STRIPE_SETTINGS } from './types/settings/StripeSettings'
import { DEFAULT_TEXTURE_SETTINGS } from './types/settings/TextureSettings'
import { DEFAULT_TILE_SETTINGS } from './types/settings/TileSettings'

const DEFAULT_CANVAS_SIZE: Px = to.Px(800)
const DEFAULT_ZOOM = 1

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
