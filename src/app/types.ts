import { Frame, Houndstooth, Layer, NamedEffect } from '../pattern'
import { NullarySideEffector } from '../utilities'
import { Context, InputElement, PageElement } from './dom'
import { SettingsPath } from './settings'

interface CanvasState {
	contexts: Context[],
	mixedDownContext: Context,
}

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	exportFrames: boolean,
	selectedHoundstoothEffects: NamedEffect[],
}

interface DomState {
	descriptionsContainer: PageElement,
	effectToggles: { [_: string ]: InputElement },
	frameInput: InputElement,
	layersProgressBar: PageElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: PageElement,
	progressMessage: PageElement,
	rewindButton: HTMLButtonElement,
	snapshotButton: HTMLButtonElement,
}

interface ExecuteState {
	animationInterval?: number,
	currentLayer: Layer,
	gridProgressInterval?: number,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: NullarySideEffector,
	tileCount: number,
	tilesCompleted: number,

	// tslint:disable-next-line:no-any
	[ _: string ]: any,
}

interface SettingsState {
	availableEffects: NamedEffect[],
	readonly mainHoundstooth: Houndstooth,
	settingNamesToPathsMap: { [ index: string ]: SettingsPath },
}

interface AppState {
	canvas: CanvasState,
	controls: ControlsState,
	dom: DomState,
	execute: ExecuteState,
	settings: SettingsState,
}

export {
	CanvasState,
	ControlsState,
	DomState,
	ExecuteState,
	SettingsState,
	AppState,
}
