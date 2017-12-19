import { FullSettingPath, parseOverrideId, to } from '../../../../../src/indexForTest'

describe('parse override id', () => {
	it('takes the hyphenated string and returns the full setting path object', () => {
		const subject: (_: string) => FullSettingPath = parseOverrideId.default

		const {
			patternName,
			settingName,
			settingPath,
		}: FullSettingPath = subject('basePattern-stripeSettings-stripePositionSettings-stripeCount')

		expect(patternName).toBe(to.SettingStep('basePattern'))
		expect(settingPath).toEqual(to.SettingPath([ 'stripeSettings', 'stripePositionSettings' ]))
		expect(settingName).toBe(to.SettingStep('stripeCount'))
	})
})
