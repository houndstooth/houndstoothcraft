import { buildMockElement } from '../test'
import { Context, InputElement, PageElement } from './app'
import { DEFAULT_HOUNDSTOOTH } from './defaults'
import { BasePattern, Frame, Layer, NamedEffect } from './pattern'
import * as to from './to'
import { CanvasState, ControlsState, DomState, ExecuteState, SettingsState, State } from './types'
import { codeUtilities, noop, NullarySideEffector } from './utilities'

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_AVAILABLE_EFFECTS: NamedEffect[] = []
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
const DEFAULT_DESCRIPTIONS_CONTAINER: PageElement = buildMockElement()
const DEFAULT_LAYERS_PROGRESS_BAR: PageElement = buildMockElement()
const DEFAULT_PROGRESS_MESSAGE: PageElement = buildMockElement()
const DEFAULT_PROGRESS_BAR: PageElement = buildMockElement()
const DEFAULT_PLAY_BUTTON: HTMLButtonElement = buildMockElement() as HTMLButtonElement
const DEFAULT_PAUSE_BUTTON: HTMLButtonElement = buildMockElement() as HTMLButtonElement
const DEFAULT_REWIND_BUTTON: HTMLButtonElement = buildMockElement() as HTMLButtonElement
const DEFAULT_SNAPSHOT_BUTTON: HTMLButtonElement = buildMockElement() as HTMLButtonElement
const DEFAULT_FRAME_INPUT: InputElement = buildMockElement() as InputElement

const DEFAULT_CANVAS_STATE: CanvasState = {
	contexts: DEFAULT_CONTEXTS,
	mixedDownContext: DEFAULT_MIXED_DOWN_CONTEXT,
}

const DEFAULT_CONTROLS_STATE: ControlsState = {
	animating: DEFAULT_ANIMATING,
	currentFrame: DEFAULT_CURRENT_ANIMATION_FRAME,
	endFrame: DEFAULT_END_FRAME,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	selectedHoundstoothEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
}

const DEFAULT_DOM_STATE: DomState = {
	descriptionsContainer: DEFAULT_DESCRIPTIONS_CONTAINER,
	frameInput: DEFAULT_FRAME_INPUT,
	layersProgressBar: DEFAULT_LAYERS_PROGRESS_BAR,
	pauseButton: DEFAULT_PAUSE_BUTTON,
	playButton: DEFAULT_PLAY_BUTTON,
	progressBar: DEFAULT_PROGRESS_BAR,
	progressMessage: DEFAULT_PROGRESS_MESSAGE,
	rewindButton: DEFAULT_REWIND_BUTTON,
	snapshotButton: DEFAULT_SNAPSHOT_BUTTON,
}

const DEFAULT_EXECUTE_STATE: ExecuteState = {
	animationInterval: DEFAULT_ANIMATION_INTERVAL,
	currentLayer: DEFAULT_CURRENT_LAYER,
	gridProgressInterval: DEFAULT_GRID_PROGRESS_INTERVAL,
	patternRef: DEFAULT_PATTERN_REF,
	performanceLogging: DEFAULT_PERFORMANCE_LOGGING,
	resolveGrid: DEFAULT_RESOLVE_GRID,
	tileCount: DEFAULT_TILE_COUNT,
	tilesCompleted: DEFAULT_TILES_COMPLETED,
}

const DEFAULT_SETTINGS_STATE: SettingsState = {
	availableEffects: DEFAULT_AVAILABLE_EFFECTS,
	currentPattern: DEFAULT_CURRENT_PATTERN,
	mainHoundstooth: DEFAULT_HOUNDSTOOTH,
}

const DEFAULT_STATE: State = {
	canvas: DEFAULT_CANVAS_STATE,
	controls: DEFAULT_CONTROLS_STATE,
	dom: DEFAULT_DOM_STATE,
	execute: DEFAULT_EXECUTE_STATE,
	settings: DEFAULT_SETTINGS_STATE,
}

const state: State = codeUtilities.deepClone(DEFAULT_STATE)

export { state, DEFAULT_STATE }
