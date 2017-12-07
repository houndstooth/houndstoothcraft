import { ColorSet, isTileUniform, ShapeColorIndex, to } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

describe('is tile uniform', () => {
	beforeEach(() => {
		const colorSet: ColorSet = to.ColorSet([
			{ r: 101, g: 100, b: 50, a: 0.5 },
			{ r: 2, g: 100, b: 50, a: 0.5 },
			{ r: 3, g: 100, b: 50, a: 0.5 },
			{ r: 101, g: 100, b: 50, a: 0.5 },
			{ r: 5, g: 100, b: 50, a: 0.5 },
		])
		setPatternStateForTest('colorSettings', { colorSet })
	})

	it('returns true if all of the tile color indices point to the same color', () => {
		const shapeColorIndices: ShapeColorIndex[] = to.ShapeColorIndices([ 0, 0, 3, 0, 3 ])
		expect(isTileUniform.default({ shapeColorIndices })).toBe(true)
	})

	it('returns false if any of the tile color indices point to a color that is different', () => {
		const shapeColorIndices: ShapeColorIndex[] = to.ShapeColorIndices([ 0, 0, 1, 0, 1 ])
		expect(isTileUniform.default({ shapeColorIndices })).toBe(false)
	})
})
