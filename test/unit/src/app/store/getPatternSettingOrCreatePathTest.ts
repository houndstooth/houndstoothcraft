// tslint:disable:no-any

import { getPatternSettingOrCreatePath, SettingsPath, to } from '../../../../../src'

describe('get pattern setting or create path', () => {
	it('accesses child setting if it exists', () => {
		const expectedSetting: any = {}
		const pattern: any = {
			childPathFirstStep: {
				childPathSecondStep: expectedSetting,
			},
		}
		const settingsPath: SettingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getPatternSettingOrCreatePath.main({ pattern, settingsPath })

		expect(childSetting).toBe(expectedSetting)
	})

	it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
		const pattern: any = {}
		const settingsPath: SettingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getPatternSettingOrCreatePath.main({ pattern, settingsPath })

		expect(childSetting).toEqual({})
		expect(pattern).toEqual({
			childPathFirstStep: {
				childPathSecondStep: {},
			},
		})
	})

	it('does not override zeroes', () => {
		const pattern: any = {
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		}
		const settingsPath: SettingsPath = to.SettingsPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = getPatternSettingOrCreatePath.main({ pattern, settingsPath })

		expect(childSetting).toBe(0)
		expect(pattern).toEqual({
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		})
	})
})
