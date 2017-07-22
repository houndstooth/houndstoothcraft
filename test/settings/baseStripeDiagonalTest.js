import buildPattern from '../../src/settings/buildPattern'
import execute from '../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import { BLACK, TRANSPARENT } from '../../src/constants'

describe('.baseStripeDiagonal', () => {
	it('can be set to principal, to change the orientation of the stripes', () => {
		buildPattern({
			patternEffects: [],
			patternOverrides: {
				base: {
					baseStripeDiagonal: 'PRINCIPAL',
				},
			},
		})
		activateTestMarkerCanvas()
		execute()

		let originInPixels
		const tileSizeInPixels = currentState.builtPattern.base.tileSettings.tileSize

		originInPixels = [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ]

		expect(tileSectorCenterIsColor({
			id: 1,
			originInPixels,
			tileSizeInPixels,
			x: 0,
			y: 3,
			n: 4,
			color: BLACK,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 2,
			originInPixels,
			tileSizeInPixels,
			x: 0,
			y: 1,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 3,
			originInPixels,
			tileSizeInPixels,
			x: 1,
			y: 2,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 4,
			originInPixels,
			tileSizeInPixels,
			x: 2,
			y: 3,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 5,
			originInPixels,
			tileSizeInPixels,
			x: 1,
			y: 0,
			n: 4,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 6,
			originInPixels,
			tileSizeInPixels,
			x: 2,
			y: 1,
			n: 4,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 7,
			originInPixels,
			tileSizeInPixels,
			x: 3,
			y: 2,
			n: 4,
			color: BLACK,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 8,
			originInPixels,
			tileSizeInPixels,
			x: 3,
			y: 0,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)


		originInPixels = [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ]

		expect(tileSectorCenterIsColor({
			id: 9,
			originInPixels,
			tileSizeInPixels,
			x: 0,
			y: 3,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 10,
			originInPixels,
			tileSizeInPixels,
			x: 0,
			y: 1,
			n: 4,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 11,
			originInPixels,
			tileSizeInPixels,
			x: 1,
			y: 2,
			n: 4,
			color: BLACK,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 12,
			originInPixels,
			tileSizeInPixels,
			x: 2,
			y: 3,
			n: 4,
			color: BLACK,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 13,
			originInPixels,
			tileSizeInPixels,
			x: 1,
			y: 0,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 14,
			originInPixels,
			tileSizeInPixels,
			x: 2,
			y: 1,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)
		expect(tileSectorCenterIsColor({
			id: 15,
			originInPixels,
			tileSizeInPixels,
			x: 3,
			y: 2,
			n: 4,
			color: TRANSPARENT,
		})).toBe(true)

		expect(tileSectorCenterIsColor({
			id: 16,
			originInPixels,
			tileSizeInPixels,
			x: 3,
			y: 0,
			n: 4,
			color: BLACK,
		})).toBe(true)
	})
})
