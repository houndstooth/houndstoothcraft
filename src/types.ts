import { Context } from './app'
import { BasePattern, Frame, Houndstooth, Layer, NamedEffect } from './pattern'
import { NullarySideEffector } from './utilities'

interface CanvasState {
	contexts: Context[],
	mixedDownContext: Context,
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
	currentPattern: Partial<BasePattern>,
	readonly mainHoundstooth: Houndstooth,
}

interface State {
	animating: boolean,
	canvas: CanvasState,
	currentFrame: Frame,
	endFrame: Frame,
	execute: ExecuteState,
	exportFrames: boolean,
	selectedHoundstoothEffects: NamedEffect[],
	settings: SettingsState,
}

export {
	CanvasState,
	ExecuteState,
	SettingsState,
	State,
}
