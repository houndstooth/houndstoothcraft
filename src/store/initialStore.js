const INITIAL_MAIN_HOUNDSTOOTH = {
	basePattern: {},
	animationsPattern: {},
	layersPattern: {},
}

const INITIAL_STORE = {
	currentLayer: 0,
	currentAnimationFrame: 0,
	contexts: [],
	mixedDownContext: null,
	lastSavedAnimationFrame: 0,
	interval: null,
	animating: false,
	exportFrames: false,
	mixingDown: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
	mainHoundstooth: INITIAL_MAIN_HOUNDSTOOTH,
}

export default { INITIAL_STORE, INITIAL_MAIN_HOUNDSTOOTH }
