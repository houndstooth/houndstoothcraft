export default {
	viewSettings: {
		canvasSize: true,
		zoom: true,
		zoomOnCanvasCenter: true,
		centerViewOnCenterOfTileAtZeroZeroAddress: true,
	},
	gridSettings: {
		gridSize: true,
		gridRotationAboutCanvasCenter: true,
		includeNegativeQuadrants: true,
	},
	tileSettings: {
		tileSize: true,
		collapseSameColoredShapesWithinTile: true,
		isTileUniform: true,
		tileToShapes: true,
		getCoordinates: {
			whenTileIsUniform: true,
			whenTileIsMultiform: true,
		},
	},
	colorSettings: {
		set: true,
		houndazzle: {
			substripeCount: true,
			dazzleContinuum: true,
			orientationSettings: true,
		},
		assignment: {
			switcheroo: true,
			flipGrain: true,
			transformAssignedSet: true,
			assignmentMode: true,
			offsetAddress: true,
			supertile: true,
			weave: {
				rows: true,
				columns: true,
			},
		},
		opacity: true,
	},
	stripeCountSettings: {
		stripeCountMode: true,
		stripeCount: true,
		ginghamChevronContinuum: {
			initial: true,
			delta: true,
		},
	},
	gatherOptions: true,
	baseStripeDiagonal: true,
	getTileOriginAndSizedUnit: true,
	getStripePositions: true,
	animation: {
		frameRate: true,
		refreshCanvas: true,
	},
	iteration: {
		startIteration: true,
		endIteration: true,
	},
}
