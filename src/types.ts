import { Context } from './app'
import { BasePattern, Frame, Houndstooth, Layer, NamedEffect } from './pattern'
import { NullarySideEffector } from './utilities'

interface State {
	animating: boolean,
	contexts: Context[],
	currentFrame: Frame,
	currentLayer: Layer,
	currentPattern: Partial<BasePattern>,
	endFrame: Frame,
	exportFrames: boolean,
	gridProgressInterval?: number,
	interval?: number,
	readonly mainHoundstooth: Houndstooth,
	mixedDownContext: Context,
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
	State,
}
