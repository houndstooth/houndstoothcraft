// import { GREEN, BLUE } from '../application/constants'

export default {
	// 	unit: 10,
		gridSize: 200,
		colorConfig: {
			// set: [ GREEN, BLUE ]
			assignment: {
	// 			flipGrain: true,
	// 			switcheroo: true
				mode: 'SUPERTILE',
				supertile: [ 
					[ [ 0, 0 ], [ 0, 2 ] ], 
					[ [ 1, 1 ], [ 1, 2 ] ],
					[ [ 2, 2 ], [ 2, 3 ] ],
					[ [ 3, 3 ], [ 3, 4 ] ],
					[ [ 4, 4 ], [ 4, 0 ] ],

				]

			}
	// 		houndazzle: {
	// 			colorConfig: {
	// 				set: [ GREEN, BLUE ],
	// 				assignment: {
	// 					mode: 'SUPERTILE',
	// 					supertile: [ [ [ 1, 0 ], [ 1, 0 ] ], [ [ 1, 0 ], [ 1, 0 ] ] ],
	// 				}
	// 			}
	// 		}
		},
	// 	stripeCountConfig: {
	// 		stripeCount: 7
	// 	},
	// iteration: {
	// 	startIteration: 3,
	// 	endIteration: 3
	// }
}
