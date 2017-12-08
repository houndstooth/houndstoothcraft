import { BasePattern, Frame, Houndstooth, Layer, NamedEffect } from '../pattern'
import { NullarySideEffector } from '../utilities'
import { SettingsPath } from './settings'

interface CanvasState {
	contexts: CanvasRenderingContext2D[],
	mixedDownContext: CanvasRenderingContext2D,
}

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	endLayer: Layer,
	exportFrames: boolean,
	selectedEffects: NamedEffect[],
}

interface DomState {
	descriptionsContainer: HTMLElement,
	effectToggles: { [_: string ]: HTMLInputElement },
	frameInput: HTMLInputElement,
	layersProgressBar: HTMLElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: HTMLElement,
	progressMessage: HTMLElement,
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
	currentPattern: BasePattern,
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
