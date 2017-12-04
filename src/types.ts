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

interface State {
	animating: boolean,
	canvas: CanvasState,
	currentFrame: Frame,
	currentPattern: Partial<BasePattern>,
	endFrame: Frame,
	execute: ExecuteState,
	exportFrames: boolean,
	readonly mainHoundstooth: Houndstooth,
	selectedHoundstoothEffects: NamedEffect[],
}

export {
	CanvasState,
	ExecuteState,
	State,
}
