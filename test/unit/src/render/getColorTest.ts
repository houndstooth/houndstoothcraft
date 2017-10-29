import { Color } from '../../../../src/render'
import { getColor } from '../../../../src/render/getColor'
import { setSetting } from '../../../../src/store/setSetting'
import * as to from '../../../../src/utilities/to'

describe('get Color', () => {
	it('gets the color object from the state, using the passed index', () => {
		const expectedColor: Color = { a: 1 }
		setSetting('colorSettings', { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) })

		expect(getColor({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
