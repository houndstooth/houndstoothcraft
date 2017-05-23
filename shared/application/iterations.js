export default {
	cmyktooth: {
		startIteration: null,
		endIteration: null,
		cmykColorsMode: null,
		layerColor: null,
		layerRotation: null
	},
	houndazzle: {
		substripeCount: null,
		dazzleContinuum: null
	},
	houndsmorphosis: {
		endIteration: null
	},
	shared: {
		canvasSize: null,
		unit: null, //p => p * 1.005,
		endIteration: null,
		gridSize: null,
		tileSize: null,
		colorA: null,
		colorB: null,
		stripeCount: {
			baseCount: null,
			ginghamChevronContinuum: {
				on: null,
				style: null,
				fluid: {
					thinningRate: null
				},
				aligning: {
					continuumStartsAtStripeCount: null,
					stripeCountIncreasePerDiagonal: null,
				}
			}
		},
		switcheroo: null,
		flipGrain: null,
		tileRotationAboutTileCenter: null,
		baseStripeDiagonal: null,
		ginghamMode: null,
		gongramColors: null,
		gridRotationAboutCenter: p => p + Math.PI / 4,
		stripeStyle: null,
		opacity: null
	},
	animation: {
		frameRate: null,
		animating: null,
		refreshCanvas: null
	},
	iteration: {
		startIteration: null,
		endIteration: null
	}
}