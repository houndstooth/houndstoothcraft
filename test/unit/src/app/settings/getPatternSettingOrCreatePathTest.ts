// tslint:disable:no-any

import { getPatternSettingOrCreatePath, SettingPath, to } from '../../../../../src/indexForTest'

describe('get pattern setting or create path', () => {
	let subject: (_: { pattern: any, settingPath: SettingPath }) => any
	beforeEach(() => {
		subject = getPatternSettingOrCreatePath.default
	})

	it('accesses child setting if it exists', () => {
		const pattern: any = {
			childPathFirstStep: {
				childPathSecondStep: 346346,
			},
		}
		const settingPath: SettingPath = to.SettingPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = subject({ pattern, settingPath })

		expect(childSetting).toBe(346346)
	})

	it('creates the path for this setting, i.e. setting it to an empty object if it does not exist', () => {
		const pattern: any = {}
		const settingPath: SettingPath = to.SettingPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = subject({ pattern, settingPath })

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
		const settingPath: SettingPath = to.SettingPath([ 'childPathFirstStep', 'childPathSecondStep' ])

		const childSetting: any = subject({ pattern, settingPath })

		expect(childSetting).toBe(0)
		expect(pattern).toEqual({
			childPathFirstStep: {
				childPathSecondStep: 0,
			},
		})
	})
})
