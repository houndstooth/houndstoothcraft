import { Context } from './app'
import { DEFAULT_HOUNDSTOOTH } from './defaults'
import { BasePattern, Frame, Layer, NamedEffect } from './pattern'
import * as to from './to'
import { CanvasState, State } from './types'
import { codeUtilities, noop, NullarySideEffector } from './utilities'

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_CONTEXTS: Context[] = []
const DEFAULT_CURRENT_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_CURRENT_LAYER: Layer = to.Layer(0)
const DEFAULT_CURRENT_PATTERN: Partial<BasePattern> = {}
const DEFAULT_END_FRAME: Frame = to.Frame(0)
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_ANIMATION_INTERVAL: undefined = undefined
const DEFAULT_MIXED_DOWN_CONTEXT: Context = {}
const DEFAULT_PATTERN_REF: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_RESOLVE_GRID: NullarySideEffector = noop.default
const DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS: NamedEffect[] = []
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0

const DEFAULT_CANVAS_STATE: CanvasState = {
	contexts: DEFAULT_CONTEXTS,
	mixedDownContext: DEFAULT_MIXED_DOWN_CONTEXT,
}

const DEFAULT_STATE: State = {
	animating: DEFAULT_ANIMATING,
	animationInterval: DEFAULT_ANIMATION_INTERVAL,
	canvas: DEFAULT_CANVAS_STATE,
	currentFrame: DEFAULT_CURRENT_ANIMATION_FRAME,
	currentLayer: DEFAULT_CURRENT_LAYER,
	currentPattern: DEFAULT_CURRENT_PATTERN,
	endFrame: DEFAULT_END_FRAME,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
	patternRef: DEFAULT_PATTERN_REF,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	selectedHoundstoothEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

const state: State = codeUtilities.deepClone(DEFAULT_STATE)

export { state, DEFAULT_STATE }
