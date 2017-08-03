const INITIAL_MAIN_HOUNDSTOOTH = {
	basePattern: {},
	animationsPattern: {},
	iterationsPattern: {},
}

const INITIAL_STORE = {
	iterationFrame: 0,
	animationFrame: 0,
	lastSavedAnimationFrame: 0,
	interval: null,
	animating: false,
	exportFrames: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
	mainHoundstooth: INITIAL_MAIN_HOUNDSTOOTH,
}

export default { INITIAL_STORE, INITIAL_MAIN_HOUNDSTOOTH }
