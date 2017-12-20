import {
	createOverrideText,
	CreateOverrideTextParams,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('create override text', () => {
	// tslint:disable-next-line:max-line-length
	it('uses the provided marking function to determine based on the full setting path whether it should append some mark to the setting name', () => {
		const subject: (_: CreateOverrideTextParams) => string = createOverrideText.default

		const settingName: SettingStep = to.SettingStep('zoom')
		const settingPath: SettingPath = to.SettingPath([ 'viewSettings' ])
		const patternName: SettingStep = to.SettingStep('basePattern')
		const maybeMark: Spy = jasmine.createSpy('maybeMark').and.returnValue(' * ...or not')

		const actualText: string = subject({ maybeMark, settingName, settingPath, patternName })

		expect(maybeMark).toHaveBeenCalledWith({ settingName, settingPath, patternName })
		expect(actualText).toBe('zoom * ...or not')
	})
})
