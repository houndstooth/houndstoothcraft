import { settingPath, SettingsPath, SettingsStep, to } from '../../../../../src/indexForTest'

const subject: (_: { settingName: SettingsStep, settingsPath: SettingsPath }) => string = settingPath.default

describe('setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const settingsPath: SettingsPath = to.SettingsPath([ 'a', 'b', 'c' ])
		const settingName: SettingsStep = to.SettingsStep('d')

		expect(subject({ settingsPath, settingName })).toBe('a.b.c.d')
	})
})
