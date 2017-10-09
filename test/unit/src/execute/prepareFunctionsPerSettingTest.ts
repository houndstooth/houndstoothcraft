import prepareFunctionsPerSetting from '../../../../src/execute/prepareFunctionsPerSetting'
import { console } from '../../../../src/utilities/windowWrapper'
import { deepClone } from '../../../../src/utilities/codeUtilities'

describe('#prepareFunctionsPerSetting', () => {
	let actualFunctionsArray
	let expectedsettingsFunctions
	let settingsFunctions
	let settingFunction
	let secondSettingFunction
	let errorSpy
	beforeEach(() => {
		errorSpy = spyOn(console, 'error')
		settingFunction = p => p * 2
		secondSettingFunction = p => p - 1
		settingsFunctions = {
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
		const settingsPath = undefined
		const functionsArray = undefined

		expectedsettingsFunctions = deepClone(settingsFunctions)
		actualFunctionsArray = prepareFunctionsPerSetting({
			settingsFunctions,
			settingsPath,
			functionsArray,
		})
	})

	it('gathers the functions to be applied', () => {
		const expectedFunctionsArray = [
			{
				settingFunctionItself: settingFunction,
				settingsPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
				settingName: 'childPathFinalStep',
			},
			{
				settingFunctionItself: secondSettingFunction,
				settingsPath: [ 'secondChildPathFirstStep' ],
				settingName: 'secondChildPathFinalStep',
			},
		]
		expect(actualFunctionsArray).toEqual(expectedFunctionsArray)
	})

	it('does not modify the settings functions', () => {
		expect(settingsFunctions).toEqual(expectedsettingsFunctions)
	})

	it('errors if you have included anything that is not a function', () => {
		expect(errorSpy.calls.all()[ 0 ].args[ 0 ]).toContain('secondChildPathFirstStep')
		expect(errorSpy.calls.all()[ 0 ].args[ 0 ]).toContain('thingThatShouldNotBe')
		expect(errorSpy.calls.all()[ 0 ].args[ 0 ]).toContain('Great Old One')
	})
})
