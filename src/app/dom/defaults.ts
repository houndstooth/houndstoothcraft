// tslint:disable:no-object-literal-type-assertion

import { ObjectOf } from '../../utilities'
import { DomState } from './types'

const DEFAULT_CANVAS_CONTAINER: HTMLElement = {} as HTMLElement
const DEFAULT_DESCRIPTIONS_CONTAINER: HTMLElement = {} as HTMLElement
const DEFAULT_EFFECT_TOGGLES: ObjectOf<HTMLInputElement> = {}
const DEFAULT_EFFECT_TOGGLES_CONTAINER: HTMLElement = {} as HTMLElement
const DEFAULT_FRAME_INPUT: HTMLInputElement = {} as HTMLInputElement
const DEFAULT_LAYERS_PROGRESS_BAR: HTMLElement = {} as HTMLElement
const DEFAULT_MIXED_DOWN_CANVAS: HTMLCanvasElement = {} as HTMLCanvasElement
const DEFAULT_HOUNDSTOOTH_CONTROLS: HTMLElement = {} as HTMLElement
const DEFAULT_PAUSE_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_PLAY_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_PROGRESS_BAR: HTMLElement = {} as HTMLElement
const DEFAULT_PROGRESS_MESSAGE: HTMLElement = {} as HTMLElement
const DEFAULT_REWIND_BUTTON: HTMLButtonElement = {} as HTMLButtonElement
const DEFAULT_SNAPSHOT_BUTTON: HTMLButtonElement = {} as HTMLButtonElement

const DEFAULT_DOM_STATE: DomState = {
	canvasContainer: DEFAULT_CANVAS_CONTAINER,
	descriptionsContainer: DEFAULT_DESCRIPTIONS_CONTAINER,
	effectToggles: DEFAULT_EFFECT_TOGGLES,
	effectTogglesContainer: DEFAULT_EFFECT_TOGGLES_CONTAINER,
	frameInput: DEFAULT_FRAME_INPUT,
	houndstoothControls: DEFAULT_HOUNDSTOOTH_CONTROLS,
	layersProgressBar: DEFAULT_LAYERS_PROGRESS_BAR,
	mixedDownCanvas: DEFAULT_MIXED_DOWN_CANVAS,
	pauseButton: DEFAULT_PAUSE_BUTTON,
	playButton: DEFAULT_PLAY_BUTTON,
	progressBar: DEFAULT_PROGRESS_BAR,
	progressMessage: DEFAULT_PROGRESS_MESSAGE,
	rewindButton: DEFAULT_REWIND_BUTTON,
	snapshotButton: DEFAULT_SNAPSHOT_BUTTON,
}

export {
	DEFAULT_DOM_STATE,
}
