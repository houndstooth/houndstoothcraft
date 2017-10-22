import * as to from '../../../../src/utilities/to'
import { getSettingOrCreatePath } from '../../../../src/store/getSettingOrCreatePath'

describe('get setting or create path', () => {
	it('accesses child property if it exists', () => {
		const expectedProperty = {}
		const settings = {
			childPathFirstStep: {
				childPathSecondStep: expectedProperty,
			},
		}
		const settingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childProperty = getSettingOrCreatePath({ settings, settingsPath })

		expect(childProperty).toBe(expectedProperty)
	})

	it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
		const settings = {}
		const settingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childProperty = getSettingOrCreatePath({ settings, settingsPath })

		expect(childProperty).toEqual({})
		expect(settings).toEqual({
			childPathFirstStep: {
				childPathSecondStep: {},
			},
		})
	})

	it('does not override zeroes', () => {
		const settings = {
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		}
		const settingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childProperty = getSettingOrCreatePath({ settings, settingsPath })

		expect(childProperty).toBe(0)
		expect(settings).toEqual({
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		})
	})
})
