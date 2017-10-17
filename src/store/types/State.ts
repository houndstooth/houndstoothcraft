import { Context } from '../../page'
import Houndstooth from './Houndstooth'

type State = {
	animating: boolean,
	contexts: Context[],
	currentAnimationFrame: number,
	currentLayer: number,
	exportFrames: boolean,
	interval: { (): void } | undefined,
	lastSavedAnimationFrame: number,
	mainHoundstooth: Houndstooth,
	mixedDownContext: Context | undefined,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Houndstooth[],
}

export default State
