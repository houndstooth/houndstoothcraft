const PATTERN_STRUCTURE = {
	viewSettings: {
		canvasSize: true,
		zoom: true,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtHomeAddress: true,
		rotateViewAboutCanvasCenter: true,
	},
	gridSettings: {
		gridSize: true,
		includeNegativeQuadrants: true,
	},
	tileSettings: {
		tileSizeSetting: true,
		getTileOriginAndSize: true,
		collapseSameColoredShapesWithinTile: true,
	},
	colorSettings: {
		colorSet: true,
		assignment: {
			switcheroo: true,
			flipGrain: true,
			transformTileColorIndices: true,
			assignmentMode: true,
			offsetAddress: true,
			supertile: true,
			weave: {
				rows: true,
				columns: true,
			},
		},
		opacity: true,
		backgroundColor: true,
	},
	stripeSettings: {
		stripePositionSettings: {
			stripeCountMode: true,
			stripeCountSetting: true,
			stripeCountContinuumSettings: {
				initialStripeCount: true,
				deltaStripeCount: true,
			},
			getStripePositions: true,
		},
		baseStripeDiagonal: true,
	},
	textureSettings: {
		renderTexture: true,
	},
	animationSettings: {
		frameRate: true,
		startAnimationFrame: true,
		endAnimationFrame: true,
		refreshCanvas: true,
	},
	layerSettings: {
		startLayer: true,
		endLayer: true,
	},
}

const HOUNDSTOOTH_STRUCTURE = {
	basePattern: true,
	animationsPattern: true,
	layersPattern: true,
	name: true,
}

const STATE_STRUCTURE = {
	currentLayer: true,
	currentAnimationFrame: true,
	contexts: true,
	mixedDownContext: true,
	lastSavedAnimationFrame: true,
	interval: true,
	animating: true,
	exportFrames: true,
	mixingDown: true,
	performanceLogging: true,
	selectedHoundstoothEffects: true,
	mainHoundstooth: true,
}

export {
	PATTERN_STRUCTURE,
	HOUNDSTOOTH_STRUCTURE,
	STATE_STRUCTURE,
}
