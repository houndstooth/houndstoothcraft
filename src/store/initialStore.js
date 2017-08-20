const INITIAL_MAIN_HOUNDSTOOTH = {
	basePattern: {},
	animationsPattern: {},
	layersPattern: {},
}

const INITIAL_STORE = {
	currentLayer: 0,
	currentAnimationFrame: 0,
	contexts: [],
	canvases: [],
	mixedDownCanvas: null,
	lastSavedAnimationFrame: 0,
	interval: null,
	animating: false,
	exportFrames: false,
	performanceLogging: false,
	selectedHoundstoothEffects: [],
	mainHoundstooth: INITIAL_MAIN_HOUNDSTOOTH,
}

export default { INITIAL_STORE, INITIAL_MAIN_HOUNDSTOOTH }
