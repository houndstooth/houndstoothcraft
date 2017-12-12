import { Color, getColor, ShapeColorIndex, to } from '../../../../../src/indexForTest'
import { setPatternSettingForTest } from '../../../helpers'

describe('get Color', () => {
	it('gets the color object from the pattern state, using the passed index', () => {
		const subject: (_: { index: ShapeColorIndex }) => Color = getColor.default
		const expectedColor: Color = { a: 1 }
		setPatternSettingForTest('colorSettings', { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) })

		expect(subject({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
