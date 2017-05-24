// import { } from '../render/colors' // WHITE, BLACK, TRANSPARENT, WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW

const CMYKTOOTH_SIZE = 1000

export default {
	shared: {
		tileSize: CMYKTOOTH_SIZE,
		canvasSize: CMYKTOOTH_SIZE,
		opacity: .5,
		supertileOffset: [ 0, 1 ],
		originAtGridCenter: true,
		negativeGridToo: true
	},
	iteration: {
		iterating: true,
		endIteration: 4
	}
}
