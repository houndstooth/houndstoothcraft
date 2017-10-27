import { settingPath } from '../../../../src/execute/settingPath'
import { SettingsStep } from '../../../../src/store/types/SettingsStep'
import * as to from '../../../../src/utilities/to'

describe('setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const settingsPath: SettingsStep[] = to.SettingsPath([ 'a', 'b', 'c' ])
		const settingName: SettingsStep = to.SettingsStep('d')

		expect(settingPath({ settingsPath, settingName })).toBe('a.b.c.d')
	})
})
