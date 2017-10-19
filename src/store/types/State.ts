import { Frame, Layer } from '../../execute'
import { Context } from '../../page'
import { Houndstooth } from './Houndstooth'

interface State {
	animating: boolean,
	contexts: Context[],
	currentAnimationFrame: Frame,
	currentLayer: Layer,
	exportFrames: boolean,
	interval: (() => void) | undefined,
	lastSavedAnimationFrame: Frame,
	mainHoundstooth: Houndstooth,
	mixedDownContext: Context | undefined,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Houndstooth[],
}

export { State }
