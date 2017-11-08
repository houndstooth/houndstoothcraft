import { getFromBaseOrDefaultPattern } from '../../../../../src/app/store/getFromBaseOrDefaultPattern'
import { setSetting } from '../../../../../src/app/store/setSetting'
import { DEFAULT_CANVAS_SIZE } from '../../../../../src/defaults'
import * as to from '../../../../../src/to'

describe('get from base or default pattern', () => {
	it('accesses child setting if it exists on the base pattern', () => {
		setSetting('viewSettings', { canvasSize: to.Px(2) })

		expect(getFromBaseOrDefaultPattern('canvasSize')).toBe(to.Px(2))
	})

	it('gets the setting off the default pattern if it is not on the base pattern', () => {
		setSetting('viewSettings', { canvasSize: undefined })

		expect(getFromBaseOrDefaultPattern('canvasSize')).toBe(DEFAULT_CANVAS_SIZE)
	})
})
