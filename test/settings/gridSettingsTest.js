import setup from '../../src/application/setup'
import execute from '../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import standardTileIsColors from '../helpers/standardTileIsColors'
import { BLACK, WHITE, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('grid settings', () => {
	describe('gridSize', () => {
		it('changes how many tiles there are', () => {
			setup({
				effects: [ ],
				overrides: {
					initial: {
						colorSettings: {
	        				set: [ BLACK, WHITE ],
						},
						gridSettings: {
							gridSize: 3,
						},
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			const tileSizeInPixels = TILE_SIZE
			const tiles = [
				{ baseId: 0, originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, BLACK ] },
				{ baseId: 8, originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLACK, BLACK ] },
				{ baseId: 16, originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, BLACK ] },
				{ baseId: 24, originInPixels: [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				
				{ baseId: 32, originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, WHITE ] },
				{ baseId: 40, originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLACK, WHITE ] },
				{ baseId: 48, originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, WHITE ] },
				{ baseId: 56, originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				
				{ baseId: 64, originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, BLACK ] },
				{ baseId: 72, originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLACK, BLACK ] },
				{ baseId: 80, originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ WHITE, BLACK ] },
				{ baseId: 88, originInPixels: [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				
				{ baseId: 96, originInPixels: [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				{ baseId: 104, originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				{ baseId: 112, originInPixels: [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
				{ baseId: 120, originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ], tileSizeInPixels, colors: [ TRANSPARENT, TRANSPARENT ] },
			]

			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})
})
