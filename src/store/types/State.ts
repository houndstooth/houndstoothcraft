import { Context } from '../../page'
import Houndstooth from './Houndstooth'

type State = {
	currentLayer: number,
	currentAnimationFrame: number,
	contexts: Context[],
	mixedDownContext: Context | undefined,
	lastSavedAnimationFrame: number,
	interval: { (): void } | undefined,
	animating: boolean,
	exportFrames: boolean,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Houndstooth[],
	mainHoundstooth: Houndstooth,
}

export default State
