import { getColor } from '../../../../src/render/getColor'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'

describe('get Color', () => {
	it('gets the color object from the state, using the passed index', () => {
		const expectedColor = { a: 1 }
		state.mainHoundstooth.basePattern.colorSettings = { colorSet: to.ColorSet([ { a: 0 }, expectedColor, { a: 0 } ]) }

		expect(getColor({ index: to.ShapeColorIndex(7) })).toBe(expectedColor)
	})
})
