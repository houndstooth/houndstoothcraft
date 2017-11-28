import { defaults, getSetting, setSetting, to } from '../../../../../src'

const { DEFAULT_CANVAS_SIZE } = defaults

describe('get setting', () => {
	it('accesses child setting if it exists on the current pattern', () => {
		setSetting.default('viewSettings', { canvasSize: to.Px(2) })

		expect(getSetting.default('canvasSize')).toBe(to.Px(2))
	})

	it('gets the setting off the default pattern if it is not on the current pattern', () => {
		setSetting.default('viewSettings', { canvasSize: undefined })

		expect(getSetting.default('canvasSize')).toBe(DEFAULT_CANVAS_SIZE)
	})
})
