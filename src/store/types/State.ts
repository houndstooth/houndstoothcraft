import { Frame } from '../../animation'
import { Layer } from '../../execute'
import { Context } from '../../page'
import { Effect } from './Effect'
import { Houndstooth } from './Houndstooth'

interface State {
	animating: boolean,
	contexts: Context[],
	currentFrame: Frame,
	currentLayer: Layer,
	exportFrames: boolean,
	interval: (() => void) | undefined,
	lastSavedFrame: Frame,
	mainHoundstooth: Houndstooth,
	mixedDownContext: Context | undefined,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Effect[],
}

export { State }
