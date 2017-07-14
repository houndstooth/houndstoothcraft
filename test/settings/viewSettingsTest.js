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

			expect(standardTileIsColors({ baseId: 0, originInPixels: [ 0 * zoom * TILE_SIZE, 0 * zoom * TILE_SIZE ], tileSizeInPixels: zoom * TILE_SIZE, colors: [ TRANSPARENT, BLACK ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 8, originInPixels: [ 1 * zoom * TILE_SIZE, 0 * zoom * TILE_SIZE ], tileSizeInPixels: zoom * TILE_SIZE, colors: [ TRANSPARENT, TRANSPARENT ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 16, originInPixels: [ 0 * zoom * TILE_SIZE, 1 * zoom * TILE_SIZE ], tileSizeInPixels: zoom * TILE_SIZE, colors: [ BLACK, BLACK ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 24, originInPixels: [ 1 * zoom * TILE_SIZE, 1 * zoom * TILE_SIZE ], tileSizeInPixels: zoom * TILE_SIZE, colors: [ BLACK, TRANSPARENT ] })).toBe(true)
		})
	})

	xdescribe('zoomOnCanvasCenter', () => {

	})

	xdescribe('centerViewOnCenterOfTileAtZeroZeroAddress', () => {

	})
})
