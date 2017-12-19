import { createOverrideId, FullSettingPath, SettingPath, SettingStep, to } from '../../../../../src/indexForTest'

describe('create override id', () => {
	it('takes the full setting path and joins it together with hyphens', () => {
		const subject: (_: FullSettingPath) => string = createOverrideId.default
		const patternName: SettingStep = to.SettingStep('animationsPattern')
		const settingPath: SettingPath = to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ])
		const settingName: SettingStep = to.SettingStep('opacity')

		const actualId: string = subject({ patternName, settingName, settingPath })

		const expectedId: string = 'animationsPattern-colorSettings-colorAssignmentSettings-opacity'
		expect(actualId).toBe(expectedId)
	})
})
