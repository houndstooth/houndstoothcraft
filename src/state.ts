import { Context } from './app'
import { DEFAULT_HOUNDSTOOTH } from './defaults'
import { Effect, Frame, Layer } from './pattern'
import * as to from './to'
import { State } from './types'
import { codeUtilities, noop, NullarySideEffector } from './utilities'

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_CONTEXTS: Context[] = []
const DEFAULT_CURRENT_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_CURRENT_LAYER: Layer = to.Layer(0)
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_INTERVAL: undefined = undefined
const DEFAULT_LAST_SAVED_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_MIXED_DOWN_CANVAS: undefined = undefined
const DEFAULT_MIXING_DOWN: boolean = false
const DEFAULT_PATTERN_REF: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_RESOLVE_GRID: NullarySideEffector = noop.default
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
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	interval: DEFAULT_INTERVAL,
	lastSavedFrame: DEFAULT_LAST_SAVED_ANIMATION_FRAME,
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
	mixedDownContext: DEFAULT_MIXED_DOWN_CANVAS,
	mixingDown: DEFAULT_MIXING_DOWN,
	patternRef: DEFAULT_PATTERN_REF,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	selectedHoundstoothEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
	syncMode: DEFAULT_SYNC_MODE,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

const state: State = codeUtilities.deepClone(DEFAULT_STATE)

export { state, DEFAULT_STATE }
