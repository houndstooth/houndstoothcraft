import { Context } from './app'
import { BasePattern, Effect, Frame, Houndstooth, Layer } from './pattern'
import { NullarySideEffector } from './utilities'

interface State {
	animating: boolean,
	contexts: Context[],
	currentFrame: Frame,
	currentLayer: Layer,
	currentPattern: Partial<BasePattern>,
	endFrame: Frame,
	exportFrames: boolean,
	gridProgressInterval?: NullarySideEffector,
	interval?: NullarySideEffector,
	readonly mainHoundstooth: Houndstooth,
	mixedDownContext: Context,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: NullarySideEffector,
	selectedHoundstoothEffects: Effect[],
	tileCount: number,
	tilesCompleted: number,
}

export {
	State,
}
