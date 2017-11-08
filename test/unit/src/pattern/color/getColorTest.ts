import { setSetting } from '../../../../../src/app/store/setSetting'
import { Color } from '../../../../../src/pattern/color'
import { getColor } from '../../../../../src/pattern/color/getColor'
import * as to from '../../../../../src/to'

describe('get Color', () => {
	it('gets the color object from the state, using the passed index', () => {
		const expectedColor: Color = { a: 1 }
		setSetting('colorSettings', { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) })

		expect(getColor({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
