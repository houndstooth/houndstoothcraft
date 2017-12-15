// tslint:disable:no-any no-unsafe-any

import {
	codeUtilities,
	PrepareFunctionObjectsParams,
	prepareFunctionObjectsPerSetting,
	SettingFunctionObject,
	to,
} from '../../../../../src/indexForTest'

let subject: (_: PrepareFunctionObjectsParams) => SettingFunctionObject[]

describe('prepare function objects per setting', () => {
	let actualFunctionObjects: SettingFunctionObject[]
	let expectedSettingFunctionsSourcePattern: any
	let settingFunctionsSourcePattern: any
	let settingFunction: any
	let secondSettingFunction: any
	beforeEach(() => {
		subject = prepareFunctionObjectsPerSetting.default
		settingFunction = (p: number): number => p * 2
		secondSettingFunction = (p: number): number => p - 1
		settingFunctionsSourcePattern = {
			childPathFirstStep: {
				childPathSecondStep: {
					childPathFinalStep: settingFunction,
				},
			},
			secondChildPathFirstStep: {
				secondChildPathFinalStep: secondSettingFunction,
				thingThatShouldNotBe: 'Great Old One',
			},
		}

		expectedSettingFunctionsSourcePattern = codeUtilities.deepClone(settingFunctionsSourcePattern)
		actualFunctionObjects = subject({ settingFunctionsSourcePattern })
	})

	it('gathers the functions to be applied', () => {
		const expectedFunctionObjects: SettingFunctionObject[] = to.SettingFunctionObjects([
			{
				settingFunction,
				settingName: 'childPathFinalStep',
				settingPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
			},
			{
				settingFunction: secondSettingFunction,
				settingName: 'secondChildPathFinalStep',
				settingPath: [ 'secondChildPathFirstStep' ],
			},
		]) as any
		expect(actualFunctionObjects).toEqual(expectedFunctionObjects)
	})

	it('does not modify the source pattern', () => {
		expect(settingFunctionsSourcePattern).toEqual(expectedSettingFunctionsSourcePattern)
	})
})
