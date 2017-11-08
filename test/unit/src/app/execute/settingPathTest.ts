import { settingPath } from '../../../../../src/app/execute/settingPath'
import { SettingsPath, SettingsStep } from '../../../../../src/app/store/types'
import * as to from '../../../../../src/to'

describe('setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const settingsPath: SettingsPath = to.SettingsPath([ 'a', 'b', 'c' ])
		const settingName: SettingsStep = to.SettingsStep('d')

		expect(settingPath({ settingsPath, settingName })).toBe('a.b.c.d')
	})
})
