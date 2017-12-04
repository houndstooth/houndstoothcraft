import { Context } from './app'
import { BasePattern, Frame, Houndstooth, Layer, NamedEffect } from './pattern'
import { NullarySideEffector } from './utilities'

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
	currentPattern: Partial<BasePattern>,
	readonly mainHoundstooth: Houndstooth,
}

interface State {
	canvas: CanvasState,
	controls: ControlsState,
	execute: ExecuteState,
	settings: SettingsState,
}

export {
	CanvasState,
	ControlsState,
	ExecuteState,
	SettingsState,
	State,
}
