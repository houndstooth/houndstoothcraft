import { maybeWarnAboutConflicts } from '../../../../src/execute/maybeWarnAboutConflicts'
import { SettingsStep } from '../../../../src/store/types/SettingsStep'
import * as ui from '../../../../src/ui'
import * as to from '../../../../src/utilities/to'
import { console } from '../../../../src/utilities/windowWrapper'

describe('warning about conflicts', () => {
	let warnAboutConflicts: boolean
	let settingsPath: SettingsStep[]
	let settingName: SettingsStep
	let existingSetting: {}
	let overridingSetting: {}
	beforeEach(() => {
		spyOn(console, 'warn')
		spyOn(ui, 'warn')
	})

	it('warns when requested and there are conflicts', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `colorSettings.colorAssignment.assignmentMode`: `yoda` was overridden by `luke`'
		expect(console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(ui.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when not requested', () => {
		warnAboutConflicts = false
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(console.warn).not.toHaveBeenCalled()
		expect(ui.warn).not.toHaveBeenCalled()
	})

	it('does not warn when settings are identical', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings', 'colorAssignment' ])
		settingName = to.SettingsStep('assignmentMode')
		existingSetting = 'luke'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(console.warn).not.toHaveBeenCalled()
		expect(ui.warn).not.toHaveBeenCalled()
	})

	it('does not warn when the settings are equivalent functions', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		existingSetting = (a: number): number => a
		overridingSetting = (a: number): number => a

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(console.warn).not.toHaveBeenCalled()
		expect(ui.warn).not.toHaveBeenCalled()
	})

	it('does warn when the settings are functions that are not equivalent (by stringified comparison)', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'tileSettings' ])
		settingName = to.SettingsStep('getTileOriginAndSize')
		existingSetting = (a: number): number => a
		overridingSetting = (b: number): number => b

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		// tslint:disable-next-line:max-line-length
		const expectedWarning: string = 'some effects have conflicts on setting `tileSettings.getTileOriginAndSize`: `function (a) { return a; }` was overridden by `function (b) { return b; }`'
		expect(console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(ui.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when the settings are equivalent arrays', () => {
		warnAboutConflicts = true
		settingsPath = to.SettingsPath([ 'colorSettings' ])
		settingName = to.SettingsStep('colorSet')
		existingSetting = [ 'a', 'b' ]
		overridingSetting = [ 'a', 'b' ]

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(console.warn).not.toHaveBeenCalled()
		expect(ui.warn).not.toHaveBeenCalled()
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
		expect(console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(ui.warn).toHaveBeenCalledWith(expectedWarning)
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
		expect(console.warn).toHaveBeenCalledWith(expectedWarning)
		expect(ui.warn).toHaveBeenCalledWith(expectedWarning)
	})
})
