import { BLACK, TRANSPARENT } from '../constants'

export default {
	initial: {
		viewSettings: {
			canvasSize: 800,
			zoom: 1,
		},
		gridSettings: {
			gridSize: 16,
		},
		tileSettings: {
			tileSize: 50,
		},
		colorSettings: {
			set: [ BLACK, TRANSPARENT ],
			assignment: {
				assignmentMode: 'WEAVE',
				weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] },
				supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
			},
			opacity: 1,
		},
		stripeCountSettings: {
			stripeCount: 4,
		},
		baseStripeDiagonal: 'MINOR',
		animation: {
			frameRate: 1.005,
		},
		iteration: {
			endIterationFrame: 100,
		},
	},
	animations: {},
	iterations: {},
}
