import {
	checkSettingForConflict,
	CheckSettingForConflict,
	globalWrapper,
	SettingsPath,
	SettingsStep,
	to,
} from '../../../../../src/indexForTest'

const subject: (_: CheckSettingForConflict) => boolean = checkSettingForConflict.default

describe('check setting for conflict', () => {
	let settingsPath: SettingsPath
	let settingName: SettingsStep
	let setting: {}
	let settingCheckingForConflict: {}
	beforeEach(() => {
		spyOn(globalWrapper.console, 'warn')
	})

	it('reports conflicts', () => {
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingsStep('assignmentMode')
		setting = 'yoda'
		settingCheckingForConflict = 'luke'

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `colorSettings.colorAssignmentSettings.assignmentMode`: `yoda` would be overridden by `luke`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('does not report a conflict when settings are identical', () => {
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingsStep('as signmentMode')
		setting = 'luke'
		settingCheckingForConflict = 'luke'

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('does not report a conflict when the settings are equivalent functions', () => {
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		setting = (a: number): number => a
		settingCheckingForConflict = (a: number): number => a

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('reports a conflict when the settings are functions that are not equivalent (by stringified comparison)', () => {
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		setting = (a: number): number => a
		settingCheckingForConflict = (b: number): number => b

		// tslint:disable-next-line:no-unsafe-any
		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `tileSettings.getTileOriginAndSize`: `function (a) { return a; }` would be overridden by `function (b) { return b; }`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('does not report a conflict when the settings are equivalent arrays', () => {
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		setting = [ 'a', 'b' ]
		settingCheckingForConflict = [ 'a', 'b' ]

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		expect(globalWrapper.console.warn).not.toHaveBeenCalled()
		expect(shouldWarn).toBe(false)
	})

	it('reports a conflict when the settings are arrays that are not equivalent', () => {
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		setting = [ 'a', 'b' ]
		settingCheckingForConflict = [ 'b', 'a' ]

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `colorSettings.colorSet`: `["a","b"]` would be overridden by `["b","a"]`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('reports a conflict when the settings are different types of data structure', () => {
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		setting = [ 'a', 'b' ]
		settingCheckingForConflict = 'bna'

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `colorSettings.colorSet`: `["a","b"]` would be overridden by `bna`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})

	it('in the message, shows the contents of objects (such as colors) (as opposed to [object Object])', () => {
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('backgroundColor')
		setting = { r: 0, g: 5, b: 10, a: 1 }
		settingCheckingForConflict = { a: 0 }

		const shouldWarn: boolean = subject({ settingsPath, settingName, setting, settingCheckingForConflict })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'effect would have conflicts on setting `colorSettings.backgroundColor`: `{"r":0,"g":5,"b":10,"a":1}` would be overridden by `{"a":0}`'
		expect(globalWrapper.console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(shouldWarn).toBe(true)
	})
})
