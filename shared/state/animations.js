export default {
	houndazzle: {
		substripeCount: null,
		dazzleContinuum: null
	},
	houndsmorphosis: {
		endIteration: null
	},
	shared: {
		canvasSize: null,
		unit: p => p * 1.0005,
		endIteration: null,
		gridSize: null,
		tileSize: null,
		colorA: null,
		colorB: null,
		stripeCount: {
			baseCount: p => p * 1.0005,
			ginghamChevronContinuum: {
				on: null,
				style: null,
				fluid: {
					thinningRate: null //p => p * 1.0000002
				},
				// yeah, these ones are no good for animation
				// because it's not fluid, they just snap here to there over thresholds
				// only for positioning for a static
				aligning: {
					continuumStartsAtStripeCount: null, //p => p * 1.01,
					stripeCountIncreasePerDiagonal: null, //p => p * 1.005
				}
			}
		},
		switcheroo: null,
		flipGrain: null,
		tileRotationAboutTileCenter: null,
		baseStripeDiagonal: null,
		ginghamMode: null,
		gongramColors: null,
		gridRotationAboutCenter: p => p + Math.PI / 360,
		opacity: null,
		supertileOffset: null,
		offsetOrigin: null,
		negativeGridToo: null,
		stripeStyle: null,
	},
	animation: {
		frameRate: null,
		animating: null,
		refreshCanvas: null
	}
}
