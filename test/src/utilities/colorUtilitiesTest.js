import colorUtilities from '../../../src/utilities/colorUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('color utilities', () => {
	beforeEach(() => resetStore(store))

	describe('#parseColor', () => {
		it('converts a color object into a canvas-readable string', () => {
			const colorObject = { r: 150, g: 100, b: 50, a: 0.5 }
			const expectedColorString = 'rgba(150,100,50,0.5)'
			expect(colorUtilities.parseColor(colorObject)).toBe(expectedColorString)
		})
	})

	describe('#isTileUniform', () => {
		beforeEach(() => {
			const set = [
				{ r: 101, g: 100, b: 50, a: 0.5 },
				{ r: 2, g: 100, b: 50, a: 0.5 },
				{ r: 3, g: 100, b: 50, a: 0.5 },
				{ r: 101, g: 100, b: 50, a: 0.5 },
				{ r: 5, g: 100, b: 50, a: 0.5 },
			]
			store.mainHoundstooth.basePattern.colorSettings = { set }
		})

		it('returns true if all of the tile color indices point to the same color', () => {
			const tileColorIndices = [ 0, 0, 3, 0, 3 ]
			expect(colorUtilities.isTileUniform({ tileColorIndices })).toBe(true)
		})

		it('returns false if any of the tile color indices point to a color that is different', () => {
			const tileColorIndices = [ 0, 0, 1, 0, 1 ]
			expect(colorUtilities.isTileUniform({ tileColorIndices })).toBe(false)
		})
	})

	describe('#getColor', () => {
		it('gets the color object from the store, using the passed index', () => {
			const expectedColor = {}
			store.mainHoundstooth.basePattern.colorSettings = { set: [ {}, expectedColor, {} ]}

			expect(colorUtilities.getColor({ index: 7 })).toBe(expectedColor)
		})
	})
})
