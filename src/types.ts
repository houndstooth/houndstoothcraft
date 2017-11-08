import { Context } from './app'
import { Effect, Frame, Houndstooth, Layer } from './pattern'

interface State {
	animating: boolean,
	contexts: Context[],
	currentFrame: Frame,
	currentLayer: Layer,
	exportFrames: boolean,
	gridProgressInterval?: () => void,
	interval?: () => void,
	lastSavedFrame: Frame,
	readonly mainHoundstooth: Houndstooth,
	mixedDownContext?: Context,
	mixingDown: boolean,
	patternRef: number,
	performanceLogging: boolean,
	resolveGrid: () => void,
	selectedHoundstoothEffects: Effect[],
	syncMode: boolean,
	tileCount: number,
	tilesCompleted: number,
}

export {
	State,
}
