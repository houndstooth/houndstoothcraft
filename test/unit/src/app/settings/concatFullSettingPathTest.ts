import { concatFullSettingPath, FullSettingPath, SettingPath, SettingStep, to } from '../../../../../src/indexForTest'

describe('concat full setting path', () => {
	it('concatenates the pattern name, setting path, and setting name into one array', () => {
		const subject: (_: FullSettingPath) => SettingPath = concatFullSettingPath.default
		const patternName: SettingStep = to.SettingStep('godPattern')
		const settingPath: SettingPath = to.SettingPath([ 'jesusSettings', 'manSettings' ])
		const settingName: SettingStep = to.SettingStep('bloodType')

		const actualConcatenatedFullSettingPath: SettingPath = subject({ patternName, settingName, settingPath })

		const expectedConcatenatedFullSettingPath: SettingPath = to.SettingPath([
			'godPattern', 'jesusSettings', 'manSettings', 'bloodType',
		])
		expect(actualConcatenatedFullSettingPath).toEqual(expectedConcatenatedFullSettingPath)
	})
})
