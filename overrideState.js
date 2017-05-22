import { BLACK, WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, TRANSPARENT } from './shared/render/colors'

export default {
	shared: {
		gridSize: 12,
		stripeCount: {
			ginghamChevronContinuum: {
				on: false,
				style: 'ALIGNING',
				aligning: {
					continuumStartsAtStripeCount: 3,
					stripeCountIncreasePerDiagonal: 2
				}
			},
		}
	},
	// animation: {
	// 	animating: false,
	// 	frameRate: 1000 / 60,
	// 	refreshCanvas: true
	// },
	// iteration: {
	// 	iterating: false,
	// 	startIteration: 0,
	// 	endIteration: 8
	// }
}