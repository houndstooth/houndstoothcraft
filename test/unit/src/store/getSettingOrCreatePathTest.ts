import { getSettingOrCreatePath } from '../../../../src/store/getSettingOrCreatePath'
import * as to from '../../../../src/utilities/to'

describe('get setting or create path', () => {
	it('accesses child setting if it exists', () => {
		const expectedSetting = {}
		const settings = {
			childPathFirstStep: {
				childPathSecondStep: expectedSetting,
			},
		}
		const settingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toBe(expectedSetting)
	})

	it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
		const settings = {}
		const settingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toEqual({})
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

		const childSetting = getSettingOrCreatePath({ settings, settingsPath })

		expect(childSetting).toBe(0)
		expect(settings).toEqual({
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		})
	})
})
