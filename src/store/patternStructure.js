const PATTERN_STRUCTURE = {
	viewSettings: {
		canvasSize: true,
		zoom: true,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtZeroZeroAddress: true,
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
		set: true,
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

export default { PATTERN_STRUCTURE }
