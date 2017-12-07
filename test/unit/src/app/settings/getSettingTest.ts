import { patternState, setSetting, to } from '../../../../../src'

describe('get setting', () => {
	it('accesses child setting if it exists on the current pattern', () => {
		setSetting.default('tileSettings', { tileSize: to.Unit(30) })

		expect(patternState.get('tileSize')).toBe(to.Unit(30))
	})

	it('gets the setting off the default pattern if it is not on the current pattern', () => {
		setSetting.default('tileSettings', { tileSize: undefined })

		expect(patternState.get('tileSize')).toBe(to.Unit(50))
	})
})
