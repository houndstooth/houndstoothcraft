// tslint:disable:max-file-line-count

import {
	AppState,
	CanvasState,
	ControlsState,
	DomState,
	ExecuteState,
	SettingNamesToPathsMap,
	SettingsState,
} from './app'
import {
	animationSettings,
	BasePattern,
	ColorSet,
	colorSettings,
	Frame,
	gridSettings,
	Houndstooth,
	Layer,
	layerSettings,
	NamedEffect,
	PatternFunctions,
	stripeSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './pattern'
import { noop, NullarySideEffector, to } from './utilities'

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
const DEFAULT_DESCRIPTION: string = 'This is what things look like when you don\'t have any effects on. Try adding one.'
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}
const DEFAULT_NAME: string = 'standard'

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	description: DEFAULT_DESCRIPTION,
	layersPattern: DEFAULT_LAYERS_PATTERN,
	name: DEFAULT_NAME,
}

const DEFAULT_COLOR_SET: ColorSet = colorSettings.DEFAULT_COLOR_SETTINGS.colorSet

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_AVAILABLE_EFFECTS: NamedEffect[] = []
const DEFAULT_CONTEXTS: CanvasRenderingContext2D[] = []
const DEFAULT_CURRENT_ANIMATION_FRAME: Frame = to.Frame(0)
const DEFAULT_CURRENT_LAYER: Layer = to.Layer(0)
const DEFAULT_CURRENT_PATTERN: BasePattern = DEFAULT_BASE_PATTERN
const DEFAULT_EFFECT_TOGGLES: { [_: string ]: HTMLInputElement } = {}
const DEFAULT_END_FRAME: Frame = to.Frame(0)
const DEFAULT_END_LAYER: Layer = to.Layer(0)
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_GRID_PROGRESS_INTERVAL: undefined = undefined
const DEFAULT_ANIMATION_INTERVAL: undefined = undefined
const DEFAULT_MIXED_DOWN_CONTEXT: CanvasRenderingContext2D = {} as CanvasRenderingContext2D
const DEFAULT_PATTERN_REF: number = 0
const DEFAULT_PERFORMANCE_LOGGING: boolean = false
const DEFAULT_RESOLVE_GRID: NullarySideEffector = noop.default
const DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS: NamedEffect[] = []
const DEFAULT_SETTING_NAMES_TO_PATHS_MAP: SettingNamesToPathsMap = {}
const DEFAULT_TILE_COUNT: number = 0
const DEFAULT_TILES_COMPLETED: number = 0
const DEFAULT_DESCRIPTIONS_CONTAINER: HTMLElement = {} as HTMLElement
const DEFAULT_LAYERS_PROGRESS_BAR: HTMLElement = {} as HTMLElement
const DEFAULT_PROGRESS_MESSAGE: HTMLElement = {} as HTMLElement
const DEFAULT_PROGRESS_BAR: HTMLElement = {} as HTMLElement
const DEFAULT_PLAY_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_PAUSE_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_REWIND_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_SNAPSHOT_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_FRAME_INPUT: HTMLInputElement = {} as HTMLInputElement

const DEFAULT_CANVAS_STATE: CanvasState = {
	contexts: DEFAULT_CONTEXTS,
	mixedDownContext: DEFAULT_MIXED_DOWN_CONTEXT,
}

const DEFAULT_CONTROLS_STATE: ControlsState = {
	animating: DEFAULT_ANIMATING,
	currentFrame: DEFAULT_CURRENT_ANIMATION_FRAME,
	endFrame: DEFAULT_END_FRAME,
	endLayer: DEFAULT_END_LAYER,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	selectedEffects: DEFAULT_SELECTED_HOUNDSTOOTH_EFFECTS,
}

const DEFAULT_DOM_STATE: DomState = {
	descriptionsContainer: DEFAULT_DESCRIPTIONS_CONTAINER,
	effectToggles: DEFAULT_EFFECT_TOGGLES,
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
	settingNamesToPathsMap: DEFAULT_SETTING_NAMES_TO_PATHS_MAP,
}

const DEFAULT_APP_STATE: AppState = {
	canvas: DEFAULT_CANVAS_STATE,
	controls: DEFAULT_CONTROLS_STATE,
	dom: DEFAULT_DOM_STATE,
	execute: DEFAULT_EXECUTE_STATE,
	settings: DEFAULT_SETTINGS_STATE,
}

export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_COLOR_SET,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_HOUNDSTOOTH,
	DEFAULT_APP_STATE,
}
