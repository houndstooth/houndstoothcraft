import { formatSettingPath, SettingPath, SettingStep, to } from '../../../../../src/indexForTest'

describe('format setting path', () => {
	it('appends the setting name to the path and joins all by dots', () => {
		const subject: (_: { settingName: SettingStep, settingPath: SettingPath }) => string = formatSettingPath.default
		const settingPath: SettingPath = to.SettingPath([ 'a', 'b', 'c' ])
		const settingName: SettingStep = to.SettingStep('d')

		expect(subject({ settingPath, settingName })).toBe('a.b.c.d')
	})
})
