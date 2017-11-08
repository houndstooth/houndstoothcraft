import { SettingsPath, SettingsStep } from '../../../../../src/app/store/types'
import { maybeWarnAboutConflicts } from '../../../../../src/app/ui/maybeWarnAboutConflicts'
import * as warn from '../../../../../src/app/ui/warn'
import * as to from '../../../../../src/to'
import { consoleWrapper } from '../../../../../src/utilities/windowWrapper'

describe('warning about conflicts', () => {
	let warnAboutConflicts: boolean
	let settingsPath: SettingsPath
	let settingName: SettingsStep
	let existingSetting: {}
	let overridingSetting: {}
	beforeEach(() => {
		spyOn(consoleWrapper, 'warn')
		spyOn(warn, 'warn')
	})

	it('warns when requested and there are conflicts', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `colorSettings.colorAssignmentSettings.assignmentMode`: `yoda` was overridden by `luke`'
		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(warn.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when not requested', () => {
		warnAboutConflicts = false
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(warn.warn).not.toHaveBeenCalled()
	})

	it('does not warn when settings are identical', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'luke'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(warn.warn).not.toHaveBeenCalled()
	})

	it('does not warn when the settings are equivalent functions', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		existingSetting = (a: number): number => a
		overridingSetting = (a: number): number => a

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(warn.warn).not.toHaveBeenCalled()
	})

	it('does warn when the settings are functions that are not equivalent (by stringified comparison)', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		existingSetting = (a: number): number => a
		overridingSetting = (b: number): number => b

		// tslint:disable-next-line:no-unsafe-any
		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `tileSettings.getTileOriginAndSize`: `function (a) { return a; }` was overridden by `function (b) { return b; }`'
		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(warn.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when the settings are equivalent arrays', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		existingSetting = [ 'a', 'b' ]
		overridingSetting = [ 'a', 'b' ]

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(warn.warn).not.toHaveBeenCalled()
	})

	it('does warn when the settings are arrays that are not equivalent', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		existingSetting = [ 'a', 'b' ]
		overridingSetting = [ 'b', 'a' ]

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `colorSettings.colorSet`: `["a","b"]` was overridden by `["b","a"]`'
		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(warn.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does warn when the settings are different types of data structure', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		existingSetting = [ 'a', 'b' ]
		overridingSetting = 'bna'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `colorSettings.colorSet`: `["a","b"]` was overridden by `bna`'
		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(warn.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('shows the contents of objects (such as colors) (as opposed to [object Object])', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('backgroundColor')
		existingSetting = { r: 0, g: 5, b: 10, a: 1 }
		overridingSetting = { a: 0 }

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `colorSettings.backgroundColor`: `{"r":0,"g":5,"b":10,"a":1}` was overridden by `{"a":0}`'
		// tslint:disable-next-line:no-unsafe-any
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(warn.warn).toHaveBeenCalledWith(expectedWarning)
	})
})
