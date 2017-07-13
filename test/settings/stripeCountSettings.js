import execute from '../../src/application/execute'
import setup from '../../src/application/setup'
import standardTileIsColors from '../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'

describe('.stripeCountSettings', () => {
	describe('.mode', () => {
		let overrides
		beforeEach(() => {
			overrides = {
				initial: {
					viewSettings: {
						canvasSize: TILE_SIZE,
					},
					gridSettings: {
						gridSize: 1,
					},
					stripeCountSettings: {
						mode: undefined,
					},
				},
			}
		})

		it('works in standard mode', () => {
			setup({	effects: [ ], overrides	})
			activateTestMarkerCanvas()

			execute()

			const tile = { baseId: 0, originInPixels: [ 0 , 0 ], tileSizeInPixels: TILE_SIZE, colors: [ TRANSPARENT, BLACK ] }
			expect(standardTileIsColors(tile)).toBe(true)
		})

		it('works in gingham mode', () => {
			overrides.initial.stripeCountSettings.mode = 'GINGHAM'
			setup({	effects: [ ], overrides })
			activateTestMarkerCanvas()

			execute()

			const HALF_TRANSPARENT_BLACK = { r: 0, g: 0, b: 0, a: 0.5 }
			const tile = { baseId: 0, originInPixels: [ 0 , 0 ], tileSizeInPixels: TILE_SIZE, colors: [ HALF_TRANSPARENT_BLACK, HALF_TRANSPARENT_BLACK ] }
			expect(standardTileIsColors(tile)).toBe(true)
		})

		xit('works in gingham chevron continuum mode', () => {
		})
	})

	xdescribe('.stripeCount', () => {
	})

	xdescribe('.ginghamChevronContinuum', () => {
	})
})
