import setup from '../../src/application/setup'
import execute from '../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import pixelIsColor from '../helpers/pixelIsColor'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'
import standardTileIsColors from '../helpers/standardTileIsColors'

describe('.viewSettings', () => {
	describe('.canvasSize', () => {
		it('works', () => {
			setup({
				effects: [],
				overrides: {
					initial: {
						colorSettings: { set: [ BLACK ] },
						viewSettings: { canvasSize: 125 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(pixelIsColor([ 0, 0 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 0 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 0, 124 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 124 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 125, 0 ], TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 0, 125 ], TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 125, 125 ], TRANSPARENT)).toBe(true)
		})
	})

	describe('.zoom', () => {
		it('works', () => {
			const zoom = 2
			setup({
				effects: [],
				overrides: {
					initial: {
						viewSettings: { zoom },
						gridSettings: { gridSize: 2 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 0 * zoom * TILE_SIZE, 0 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 1 * zoom * TILE_SIZE, 0 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 0 * zoom * TILE_SIZE, 1 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 1 * zoom * TILE_SIZE, 1 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.zoomOnCanvasCenter', () => {
		it('leaves the right and bottom quadrants empty if the grid would take up only the top left before zooming, because instead of growing from the origin in the top left it grows away from the center', () => {
			const zoom = 2
			setup({
				effects: [],
				overrides: {
					initial: {
						viewSettings: {
							zoomOnCanvasCenter: true,
							zoom: 2,
						},
						gridSettings: { gridSize: 8 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 3 * zoom * TILE_SIZE, 3 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 3 * zoom * TILE_SIZE, 4 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 4 * zoom * TILE_SIZE, 3 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 4 * zoom * TILE_SIZE, 4 * zoom * TILE_SIZE ],
				tileSizeInPixels: zoom * TILE_SIZE,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.centerViewOnCenterOfTileAtZeroZeroAddress', () => {
		it('is self-explanatory', () => {
			const tileSize = 100
			setup({
				effects: [],
				overrides: {
					initial: {
						tileSettings: { tileSize },
						viewSettings: { centerViewOnCenterOfTileAtZeroZeroAddress: true },
						gridSettings: { gridSize: 2 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 350, 350 ],
				tileSizeInPixels: 100,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 450, 350 ],
				tileSizeInPixels: 100,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 350, 450 ],
				tileSizeInPixels: 100,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 450, 450 ],
				tileSizeInPixels: 100,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})
})
