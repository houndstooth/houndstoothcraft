import { defaults, getFromBaseOrDefaultPattern, setSetting, to } from '../../../../../src'

const { DEFAULT_CANVAS_SIZE } = defaults

describe('get from base or default pattern', () => {
	it('accesses child setting if it exists on the base pattern', () => {
		setSetting.main('viewSettings', { canvasSize: to.Px(2) })

		expect(getFromBaseOrDefaultPattern.main('canvasSize')).toBe(to.Px(2))
	})

	it('gets the setting off the default pattern if it is not on the base pattern', () => {
		setSetting.main('viewSettings', { canvasSize: undefined })

		expect(getFromBaseOrDefaultPattern.main('canvasSize')).toBe(DEFAULT_CANVAS_SIZE)
	})
})
