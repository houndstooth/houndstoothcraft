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
			set: [ BLACK, TRANSPARENT ],
			houndazzle: {
				on: false,
				substripeCount: 16,
				dazzleContinuum: false,
				orientation: { set: [ 'HORIZONTAL', 'VERTICAL' ] }
			},
			assignment: {
				switcheroo: false,
				flipGrain: false,
				mode: 'WEAVE', // 'SUPERTILE'
				offset: [ 0, 0 ],
				supertile: [ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ],
				weave: { rows: [ 1, 0 ], columns: [ 0, 1 ] }
			},
			opacity: 1
		},
		stripeCount: {
			mode: 'GINGHAM_CHEVRON_CONTINUUM', // 'GINGHAM', 'GINGHAM_CHEVRON_CONTINUUM'
			baseCount: 4,
			ginghamChevronContinuum: {
				initial: 1,
				delta: 1
			}
		},
		tileRotationAboutTileCenter: 0,
		baseStripeDiagonal: 'MINOR', // 'PRINCIPAL'
		gridRotationAboutCenter: 0,
		offsetOrigin: [ 0, 0 ],
		negativeGridToo: false,
		stripeStyle: 'STANDARD' // 'DERASTERIZED_BY_AREA', 'SEGMENT_OF_HARMONIC_CONTINUUM_ACROSS_GRID', 'FULL_HARMONIC_CONTINUUM_COMPRESSED_INTO_SINGLE_TILE'
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
