// tslint:disable:no-any no-unsafe-any

import {
	checkSettingForConflict,
	CheckSettingForConflictParams,
	globalWrapper,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../../src/indexForTest'

describe('check setting for conflict', () => {
	let patternName: SettingStep
	let subject: (_: CheckSettingForConflictParams) => boolean
	let settingPath: SettingPath
	let settingName: SettingStep
	let settingValue: any
	let options: any
	beforeEach(() => {
		patternName = to.SettingStep('layersPattern')
		subject = checkSettingForConflict.default
		spyOn(globalWrapper.console, 'warn')
	})

	it('reports conflicts', () => {
		settingPath = to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingStep('assignmentMode')
		settingValue = 'yoda'
		options = { patternCheckingAgainst: { colorSettings: { colorAssignmentSettings: { assignmentMode: 'luke' } } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `layersPattern.colorSettings.colorAssignmentSettings.assignmentMode`: `yoda` would be overridden by `luke`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('does not report a conflict when setting are identical', () => {
		settingPath = to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingStep('assignmentMode')
		settingValue = 'luke'
		options = { patternCheckingAgainst: { colorSettings: { colorAssignmentSettings: { assignmentMode: 'luke' } } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('does not report a conflict when the setting are equivalent functions', () => {
		settingPath = to.SettingPath([ 'tileSettings' ])
		settingName = to.SettingStep('getTileOriginAndSize')
		settingValue = (a: number): number => a
		options = { patternCheckingAgainst: { tileSettings: { getTileOriginAndSize: (a: number): number => a } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('reports a conflict when the setting are functions that are not equivalent (by stringified comparison)', () => {
		settingPath = to.SettingPath([ 'tileSettings' ])
		settingName = to.SettingStep('getTileOriginAndSize')
		settingValue = (a: number): number => a
		options = { patternCheckingAgainst: { tileSettings: { getTileOriginAndSize: (b: number): number => b } } }

		// tslint:disable-next-line:no-unsafe-any
		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `layersPattern.tileSettings.getTileOriginAndSize`: `function (a) { return a; }` would be overridden by `function (b) { return b; }`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('does not report a conflict when the setting are equivalent arrays', () => {
		settingPath = to.SettingPath([ 'colorSettings' ])
		settingName = to.SettingStep('colorSet')
		settingValue = [ 'a', 'b' ]
		options = { patternCheckingAgainst: { colorSettings: { colorSet: [ 'a', 'b' ] } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('reports a conflict when the setting are arrays that are not equivalent', () => {
		settingPath = to.SettingPath([ 'colorSettings' ])
		settingName = to.SettingStep('colorSet')
		settingValue = [ 'a', 'b' ]
		options = { patternCheckingAgainst: { colorSettings: { colorSet: [ 'b', 'a' ] } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `layersPattern.colorSettings.colorSet`: `["a","b"]` would be overridden by `["b","a"]`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('reports a conflict when the setting are different types of data structure', () => {
		settingPath = to.SettingPath([ 'colorSettings' ])
		settingName = to.SettingStep('colorSet')
		settingValue = [ 'a', 'b' ]
		options = { patternCheckingAgainst: { colorSettings: { colorSet: 'bna' } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `layersPattern.colorSettings.colorSet`: `["a","b"]` would be overridden by `bna`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('in the message, shows the contents of objects (such as colors) (as opposed to [object Object])', () => {
		settingPath = to.SettingPath([ 'colorSettings' ])
		settingName = to.SettingStep('backgroundColor')
		settingValue = { r: 0, g: 5, b: 10, a: 1 }
		options = { patternCheckingAgainst: { colorSettings: { backgroundColor: { a: 0 } } } }

		const shouldWarn: boolean = subject({ patternName, settingPath, settingName, settingValue, options })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `layersPattern.colorSettings.backgroundColor`: `{"r":0,"g":5,"b":10,"a":1}` would be overridden by `{"a":0}`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})
})
