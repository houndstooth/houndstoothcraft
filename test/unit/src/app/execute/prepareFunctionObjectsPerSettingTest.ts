// tslint:disable:no-any no-unsafe-any

import { SettingsFunctionObject } from '../../../../../src/app/execute'
import { prepareFunctionObjectsPerSetting } from '../../../../../src/app/execute/prepareFunctionObjectsPerSetting'
import * as to from '../../../../../src/to'
import { consoleWrapper } from '../../../../../src/utilities'
import { deepClone } from '../../../../../src/utilities/codeUtilities'

describe('#prepareFunctionObjectsPerSetting', () => {
	let actualFunctionObjects: SettingsFunctionObject[]
	let expectedSettingsFunctionsSourcePattern: any
	let settingsFunctionsSourcePattern: any
	let settingsFunction: any
	let secondSettingsFunction: any
	beforeEach(() => {
		spyOn(consoleWrapper, 'error')
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
