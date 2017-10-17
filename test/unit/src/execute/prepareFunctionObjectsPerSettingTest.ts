import prepareFunctionObjectsPerSetting from '../../../../src/execute/prepareFunctionObjectsPerSetting'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import { console } from '../../../../src/utilities/windowWrapper'

describe('#prepareFunctionObjectsPerSetting', () => {
	let actualFunctionObjects
	let expectedSettingsFunctionsSourcePattern
	let settingsFunctionsSourcePattern
	let settingsFunction
	let secondSettingsFunction
	let errorSpy
	beforeEach(() => {
		errorSpy = spyOn(console, 'error')
		settingsFunction = p => p * 2
		secondSettingsFunction = p => p - 1
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
		const expectedFunctionObjects = [
			{
				settingsFunction,
				settingsPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
				settingName: 'childPathFinalStep',
			},
			{
				settingsFunction: secondSettingsFunction,
				settingsPath: [ 'secondChildPathFirstStep' ],
				settingName: 'secondChildPathFinalStep',
			},
		]
		expect(actualFunctionObjects).toEqual(expectedFunctionObjects)
	})

	it('does not modify the source pattern', () => {
		expect(settingsFunctionsSourcePattern).toEqual(expectedSettingsFunctionsSourcePattern)
	})
})
