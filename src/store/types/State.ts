import Houndstooth from './Houndstooth'

type State = {
	currentLayer: number,
	currentAnimationFrame: number,
	contexts: CanvasRenderingContext2D[],
	mixedDownContext: CanvasRenderingContext2D,
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
