import { Context } from './app'
import { BasePattern, Frame, Houndstooth, Layer, NamedEffect } from './pattern'
import { NullarySideEffector } from './utilities'

interface CanvasState {
	contexts: Context[],
	mixedDownContext: Context,
}

interface State {
	animating: boolean,
	animationInterval?: number,
	canvas: CanvasState,
	currentFrame: Frame,
	currentLayer: Layer,
	currentPattern: Partial<BasePattern>,
	endFrame: Frame,
	exportFrames: boolean,
	gridProgressInterval?: number,
	readonly mainHoundstooth: Houndstooth,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: NullarySideEffector,
	selectedHoundstoothEffects: NamedEffect[],
	tileCount: number,
	tilesCompleted: number,

	// tslint:disable-next-line:no-any
	[ _: string ]: any,
}

export {
	CanvasState,
	State,
}
