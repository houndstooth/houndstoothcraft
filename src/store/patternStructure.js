const assignment = {
	switcheroo: true,
	flipGrain: true,
	transformAssignedSet: true,
	assignmentMode: true,
	offsetSetForGridIndex: true,
	offsetAddress: true,
	supertile: true,
	weave: {
		rows: true,
		columns: true,
	},
}

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
		isTileUniform: true,
		tileToShapes: true,
		getOutline: {
			whenTileIsUniform: true,
			whenTileIsMultiform: true,
		},
	},
	colorSettings: {
		set: true,
		substripeTextureSettings: {
			substripeCount: true,
			substripeCountContinuumMode: true,
			orientationSettings: {
				set: true,
				assignment,
			},
			colorSettings: {
				set: true,
				assignment,
			},
		},
		assignment,
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
	gatherOptions: {
		getSubstripeTexture: true,
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
