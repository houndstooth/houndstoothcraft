import { Frame } from '../animation'
import { ColorSet } from '../components/types'
import { Layer } from '../execute'
import { Context, Px } from '../page'
import * as to from '../utilities/to'
import {
	animationSettings,
	colorSettings,
	gridSettings,
	layerSettings,
	stripeSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './settings'
import { BasePattern, Effect, Houndstooth, PatternFunctions, State } from './types'
import { NullarySideEffector } from '../utilities/types'
import { noop } from '../../test/helpers/noop'

const DEFAULT_BASE_PATTERN: BasePattern = {
	animationSettings: animationSettings.DEFAULT_ANIMATION_SETTINGS,
	colorSettings: colorSettings.DEFAULT_COLOR_SETTINGS,
	gridSettings: gridSettings.DEFAULT_GRID_SETTINGS,
	layerSettings: layerSettings.DEFAULT_LAYER_SETTINGS,
	stripeSettings: stripeSettings.DEFAULT_STRIPE_SETTINGS,
	textureSettings: textureSettings.DEFAULT_TEXTURE_SETTINGS,
	tileSettings: tileSettings.DEFAULT_TILE_SETTINGS,
	viewSettings: viewSettings.DEFAULT_VIEW_SETTINGS,
}

const DEFAULT_ANIMATIONS_PATTERN: PatternFunctions = {}
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}
const DEFAULT_NAME: string = 'standard'

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	layersPattern: DEFAULT_LAYERS_PATTERN,
	name: DEFAULT_NAME,
}

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_CONTEXTS: Context[] = []
const DEFAULT_CURRENT_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_CURRENT_LAYER: Layer = to.Layer(0)
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_INTERVAL: undefined = undefined
const DEFAULT_LAST_SAVED_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_MIXED_DOWN_CANVAS: undefined = undefined
const DEFAULT_MIXING_DOWN: boolean = false
const DEFAULT_PATTERN_REF: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_RESOLVE_GRID: NullarySideEffector = noop
const DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS: Effect[] = []
const DEFAULT_SYNC_MODE: boolean = false
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0

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
	patternRef: DEFAULT_PATTERN_REF,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	selectedHoundstoothEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
	syncMode: DEFAULT_SYNC_MODE,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

const DEFAULT_CANVAS_SIZE: Px = viewSettings.DEFAULT_CANVAS_SIZE
const DEFAULT_COLOR_SET: ColorSet = colorSettings.DEFAULT_COLOR_SETTINGS.colorSet

export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_CANVAS_SIZE,
	DEFAULT_COLOR_SET,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_HOUNDSTOOTH,
	DEFAULT_STATE,
}
