import execute from '../../src/application/execute'
import buildPattern from '../../src/settings/buildPattern'
import standardTileIsColors from '../helpers/standardTileIsColors'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../src/constants'
import settingsUtilities from '../../src/utilities/settingsUtilities'
import settingsPaths from '../../src/settings/settingsPaths'

describe('.stripeCountSettings', () => {
	const tileSizeInPixels = settingsUtilities.getFromSettingsOrDefault(settingsPaths.TILE_SIZE)

	describe('.stripeCountMode', () => {
		let patternOverrides
		beforeEach(() => {
			patternOverrides = {
				base: {
					viewSettings: { canvasSize: tileSizeInPixels },
					gridSettings: { gridSize: 1 },
					stripeCountSettings: { stripeCountMode: undefined },
				},
			}
		})

		it('works in standard mode', () => {
			buildPattern({ patternEffects: [], patternOverrides })
			activateTestMarkerCanvas()

			execute()

			const tile = {
				baseId: 0,
				originInPixels: [ 0, 0 ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, BLACK ],
			}
			expect(standardTileIsColors(tile)).toBe(true)
		})

		it('works in gingham mode', () => {
			patternOverrides.base.stripeCountSettings.stripeCountMode = 'GINGHAM'
			buildPattern({ patternEffects: [], patternOverrides })
			activateTestMarkerCanvas()

			execute()

			const HALF_TRANSPARENT_BLACK = { r: 0, g: 0, b: 0, a: 0.5 }
			const tile = {
				baseId: 0,
				originInPixels: [ 0, 0 ],
				tileSizeInPixels,
				colors: [ HALF_TRANSPARENT_BLACK, HALF_TRANSPARENT_BLACK ],
			}
			expect(standardTileIsColors(tile)).toBe(true)
		})
	})

	describe('.stripeCount', () => {
		it('changes the number of stripes in striped tiles', () => {
			buildPattern({
				patternEffects: [],
				patternOverrides: {
					base: {
						gridSettings: { gridSize: 2 },
						stripeCountSettings: { stripeCount: 5 },
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			let originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]
			expect(tileSectorCenterIsColor({
				id: 1,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 0,
				n: 5,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 2,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 1,
				n: 5,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 3,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 2,
				n: 5,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 4,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 3,
				n: 5,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 5,
				originInPixels,
				tileSizeInPixels,
				x: 4,
				y: 4,
				n: 5,
				color: TRANSPARENT,
			})).toBe(true)

			originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]
			expect(tileSectorCenterIsColor({
				id: 6,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 0,
				n: 5,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 7,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 1,
				n: 5,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 8,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 2,
				n: 5,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 9,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 3,
				n: 5,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 10,
				originInPixels,
				tileSizeInPixels,
				x: 4,
				y: 4,
				n: 5,
				color: BLACK,
			})).toBe(true)
		})
	})
})
