import { settingPath, SettingsPath, SettingsStep, to } from '../../../../../src'

describe('setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const settingsPath: SettingsPath = to.SettingsPath([ 'a', 'b', 'c' ])
		const settingName: SettingsStep = to.SettingsStep('d')

		expect(settingPath.main({ settingsPath, settingName })).toBe('a.b.c.d')
	})
})
