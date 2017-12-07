import { Color, getColor, setSetting, to } from '../../../../../src'

describe('get Color', () => {
	it('gets the color object from the pattern state, using the passed index', () => {
		const expectedColor: Color = { a: 1 }
		setSetting.default('colorSettings', { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) })

		expect(getColor.default({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
