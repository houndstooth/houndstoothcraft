import execute from '../../src/application/execute'
import setup from '../../src/application/setup'
import standardTileIsColors from '../helpers/standardTileIsColors'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('.stripeCountSettings', () => {
	describe('.mode', () => {
		let overrides
		beforeEach(() => {
			overrides = {
				initial: {
					viewSettings: { canvasSize: TILE_SIZE },
					gridSettings: { gridSize: 1 },
					stripeCountSettings: { mode: undefined },
				},
			}
		})

		it('works in standard mode', () => {
			setup({ effects: [], overrides })
			activateTestMarkerCanvas()

			execute()

			const tile = {
				baseId: 0,
				originInPixels: [ 0, 0 ],
				tileSizeInPixels: TILE_SIZE,
				colors: [ TRANSPARENT, BLACK ],
			}
			expect(standardTileIsColors(tile)).toBe(true)
		})

		it('works in gingham mode', () => {
			overrides.initial.stripeCountSettings.mode = 'GINGHAM'
			setup({ effects: [], overrides })
			activateTestMarkerCanvas()

			execute()

			const HALF_TRANSPARENT_BLACK = { r: 0, g: 0, b: 0, a: 0.5 }
			const tile = {
				baseId: 0,
				originInPixels: [ 0, 0 ],
				tileSizeInPixels: TILE_SIZE,
				colors: [ HALF_TRANSPARENT_BLACK, HALF_TRANSPARENT_BLACK ],
			}
			expect(standardTileIsColors(tile)).toBe(true)
		})
	})

	describe('.stripeCount', () => {
		it('changes the number of stripes in striped tiles', () => {
			const tileSizeInPixels = TILE_SIZE
			setup({
				effects: [],
				overrides: {
					initial: {
						gridSettings: { gridSize: 2 },
						stripeCountSettings: { stripeCount: 5 },
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			let originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]
			expect(tileSectorCenterIsColor({ id: 1, originInPixels, tileSizeInPixels, x: 0, y: 0, n: 5, color: TRANSPARENT })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 2, originInPixels, tileSizeInPixels, x: 1, y: 1, n: 5, color: BLACK })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 3, originInPixels, tileSizeInPixels, x: 2, y: 2, n: 5, color: TRANSPARENT })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 4, originInPixels, tileSizeInPixels, x: 3, y: 3, n: 5, color: BLACK })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 5, originInPixels, tileSizeInPixels, x: 4, y: 4, n: 5, color: TRANSPARENT })).toBe(true)

			originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]
			expect(tileSectorCenterIsColor({ id: 6, originInPixels, tileSizeInPixels, x: 0, y: 0, n: 5, color: BLACK })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 7, originInPixels, tileSizeInPixels, x: 1, y: 1, n: 5, color: TRANSPARENT })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 8, originInPixels, tileSizeInPixels, x: 2, y: 2, n: 5, color: BLACK })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 9, originInPixels, tileSizeInPixels, x: 3, y: 3, n: 5, color: TRANSPARENT })).toBe(true)
			expect(tileSectorCenterIsColor({ id: 10, originInPixels, tileSizeInPixels, x: 4, y: 4, n: 5, color: BLACK })).toBe(true)
		})
	})
})
