const INITIAL_STORE = {
	iterationFrame: 0,
	animationFrame: 0,
	lastSavedAnimationFrame: 0,
	interval: null,
	animating: false,
	exportFrames: false,
	performanceLogging: false,
	mainHoundstooth: {
		basePattern: {},
		animationsPattern: {},
		iterationsPattern: {},
	},
}

export default { INITIAL_STORE }
