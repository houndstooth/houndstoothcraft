// tslint:disable:no-any no-unsafe-any

import {
	codeUtilities,
	PrepareFunctionObjectsParams,
	prepareFunctionObjectsPerSetting,
	SettingsFunctionObject,
	to,
} from '../../../../../src/indexForTest'

const subject: (_: PrepareFunctionObjectsParams) => SettingsFunctionObject[] = prepareFunctionObjectsPerSetting.default

describe('prepare function objects per setting', () => {
	let actualFunctionObjects: SettingsFunctionObject[]
	let expectedSettingsFunctionsSourcePattern: any
	let settingsFunctionsSourcePattern: any
	let settingsFunction: any
	let secondSettingsFunction: any
	beforeEach(() => {
		settingsFunction = (p: number): number => p * 2
		secondSettingsFunction = (p: number): number => p - 1
		settingsFunctionsSourcePattern = {
			childPathFirstStep: {
				childPathSecondStep: {
					childPathFinalStep: settingsFunction,
				},
			},
			secondChildPathFirstStep: {
				secondChildPathFinalStep: secondSettingsFunction,
				thingThatShouldNotBe: 'Great Old One',
			},
		}

		expectedSettingsFunctionsSourcePattern = codeUtilities.deepClone(settingsFunctionsSourcePattern)
		actualFunctionObjects = subject({ settingsFunctionsSourcePattern })
	})

	it('gathers the functions to be applied', () => {
		const expectedFunctionObjects: SettingsFunctionObject[] = to.SettingsFunctionObjects([
			{
				settingName: 'childPathFinalStep',
				settingsFunction,
				settingsPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
			},
			{
				settingName: 'secondChildPathFinalStep',
				settingsFunction: secondSettingsFunction,
				settingsPath: [ 'secondChildPathFirstStep' ],
			},
		]) as any
		expect(actualFunctionObjects).toEqual(expectedFunctionObjects)
	})

	it('does not modify the source pattern', () => {
		expect(settingsFunctionsSourcePattern).toEqual(expectedSettingsFunctionsSourcePattern)
	})
})
