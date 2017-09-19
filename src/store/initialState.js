const INITIAL_MAIN_HOUNDSTOOTH = {
	basePattern: {},
	animationsPattern: {},
	layersPattern: {},
}

export const INITIAL_STATE = {
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
