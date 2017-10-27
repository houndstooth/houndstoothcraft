// tslint:disable:no-any no-unsafe-any

import { prepareFunctionObjectsPerSetting } from '../../../../src/execute/prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from '../../../../src/execute/types/SettingsFunctionObject'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import * as to from '../../../../src/utilities/to'
import { console } from '../../../../src/utilities/windowWrapper'
import Spy = jasmine.Spy

describe('#prepareFunctionObjectsPerSetting', () => {
	let actualFunctionObjects: SettingsFunctionObject[]
	let expectedSettingsFunctionsSourcePattern: any
	let settingsFunctionsSourcePattern: any
	let settingsFunction: any
	let secondSettingsFunction: any
	let errorSpy: Spy
	beforeEach(() => {
		errorSpy = spyOn(console, 'error')
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

		expectedSettingsFunctionsSourcePattern = deepClone(settingsFunctionsSourcePattern)
		actualFunctionObjects = prepareFunctionObjectsPerSetting({ settingsFunctionsSourcePattern })
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
