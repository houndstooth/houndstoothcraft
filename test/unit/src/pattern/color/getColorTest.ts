import { Color, getColor, to } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

describe('get Color', () => {
	it('gets the color object from the pattern state, using the passed index', () => {
		const expectedColor: Color = { a: 1 }
		setPatternStateForTest('colorSettings', { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) })

		expect(getColor.default({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
