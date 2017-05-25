export default {
	shared: {
		unit: p => p * 1.0005,
		stripeCount: {
			baseCount: p => p * 1.0005,
			ginghamChevronContinuum: {
				fluid: {
					thinningRate: p => p * 1.0000002
				},
				aligning: {
					continuumStartsAtStripeCount: p => p * 1.01,
					stripeCountIncreasePerDiagonal: p => p * 1.005
				}
			}
		},
		gridRotationAboutCenter: p => p + Math.PI / 360
	}
}
