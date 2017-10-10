import Houndstooth from './Houndstooth'

type State = {
	currentLayer: number,
	currentAnimationFrame: number,
	contexts: any[],
	mixedDownContext: any,
	lastSavedAnimationFrame: number,
	interval: () => void,
	animating: boolean,
	exportFrames: boolean,
	mixingDown: boolean,
	performanceLogging: boolean,
	selectedHoundstoothEffects: Houndstooth[],
	mainHoundstooth: Houndstooth,
}

export default State
