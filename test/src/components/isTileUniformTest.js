import isTileUniform from '../../../src/components/isTileUniform'
import store from '../../../store'

describe('is tile uniform', () => {
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
		expect(isTileUniform({ tileColorIndices })).toBe(true)
	})

	it('returns false if any of the tile color indices point to a color that is different', () => {
		const tileColorIndices = [ 0, 0, 1, 0, 1 ]
		expect(isTileUniform({ tileColorIndices })).toBe(false)
	})
})
