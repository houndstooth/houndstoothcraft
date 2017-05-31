import { BLACK, TRANSPARENT } from '../application/constants' // WHITE, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW

export default {
	houndsmorphosis: {
		endIteration: 32
	},
	shared: {
		canvasSize: 800,
		unit: 1,
		gridSize: 16,
		tileSize: 50,
		color: {
			colors: [ BLACK, TRANSPARENT ],
			gongramColors: false,
			houndazzle: {
				on: false,
				substripeCount: 16,
				dazzleContinuum: false,
				orientation: {
					orientations: [ 'HORIZONTAL', 'VERTICAL' ],
					orientationAssignment: {
						switcheroo: false,
						flipGrain: false,
						mode: 'WEAVE', // 'SUPERTILE'
						offset: [ 0, 0 ],
						supertile: [ [ [ 0, 1 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 1, 0 ] ] ],
						weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
					},
				},
				color: {
					colors: [ BLACK, TRANSPARENT ],
					colorAssignment: {
						switcheroo: false,
						flipGrain: false,
						mode: 'WEAVE', // 'SUPERTILE'
						offset: [ 0, 0 ],
						supertile: [ [ [ 0, 1 ], [ 1, 1 ] ], [ [ 0, 0 ], [ 1, 0 ] ] ],
						weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
					},
				}
			},
			colorAssignment: {
				switcheroo: false,
				flipGrain: false,
				mode: 'WEAVE', // 'SUPERTILE'
				offset: [ 0, 0 ],
				supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
				weave: { rows: [ 0, 1 ], columns: [ 1, 0 ] }
			},
			opacity: 1
		},
		stripeCount: {
			ginghamMode: false,
			baseCount: 4,
			ginghamChevronContinuum: {
				on: false,
				initial: 1,
				delta: 1
			}
		},
		tileRotationAboutTileCenter: 0,
		baseStripeDiagonal: 'MINOR', // 'PRINICIPAL' //then maybe within stripes there should be like a stripe orientation config
		gridRotationAboutCenter: 0,
		offsetOrigin: [ 0, 0 ],
		negativeGridToo: false,
		stripeStyle: 'STANDARD'
		// stripeStyle: 'DERASTERIZED_BY_AREA'
		// stripeStyle: 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID' // good for gcc when doing aligning style
		// stripeStyle: 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE' // good for harmonitooth, i.e. animating when full continuum in each tile
	},
	animation: {
		frameRate: 1000 / 60,
		refreshCanvas: true
	},
	iteration: {
		startIteration: 0,
		endIteration: 8
	}
}
