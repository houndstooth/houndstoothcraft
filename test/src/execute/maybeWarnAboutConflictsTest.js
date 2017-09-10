import maybeWarnAboutConflicts from '../../../src/execute/maybeWarnAboutConflicts'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import controls from '../../../src/controls'

describe('warning about conflicts', () => {
	let warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting
	beforeEach(() => {
		spyOn(consoleWrapper, 'warn')
		spyOn(controls, 'warn')
	})

	it('warns when requested and there are conflicts', () => {
		warnAboutConflicts = true
		settingsPath = [ 'colorSettings', 'assignment' ]
		settingName = 'assignmentMode'
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		const expectedWarning = 'some effects have conflicts on setting `colorSettings.assignment.assignmentMode`: `yoda` was overridden by `luke`'
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(controls.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when not requested', () => {
		warnAboutConflicts = false
		settingsPath = [ 'colorSettings', 'assignment' ]
		settingName = 'assignmentMode'
		existingSetting = 'yoda'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(controls.warn).not.toHaveBeenCalled()
	})

	it('does not warn when settings are identical', () => {
		warnAboutConflicts = true
		settingsPath = [ 'colorSettings', 'assignment' ]
		settingName = 'assignmentMode'
		existingSetting = 'luke'
		overridingSetting = 'luke'

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(controls.warn).not.toHaveBeenCalled()
	})

	it('does not warn when the settings are equivalent functions', () => {
		// necessary for function names to be the same
		const patternOne = { getTileOriginAndSize: a => a + 1 }
		const patternTwo = { getTileOriginAndSize: a => a + 1 }

		warnAboutConflicts = true
		settingsPath = [ 'tileSettings' ]
		settingName = 'getTileOriginAndSize'
		existingSetting = patternOne.getTileOriginAndSize
		overridingSetting = patternTwo.getTileOriginAndSize


		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })


		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(controls.warn).not.toHaveBeenCalled()
	})

	it('does warn when the settings are functions that are not equivalent (by stringified comparison)', () => {
		// necessary for function names to be the same
		const patternOne = { getTileOriginAndSize: a => a + 1 }
		const patternTwo = { getTileOriginAndSize: b => b + 1 }

		warnAboutConflicts = true
		settingsPath = [ 'tileSettings' ]
		settingName = 'getTileOriginAndSize'
		existingSetting = patternOne.getTileOriginAndSize
		overridingSetting = patternTwo.getTileOriginAndSize


		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })


		const expectedWarning = 'some effects have conflicts on setting `tileSettings.getTileOriginAndSize`: `function getTileOriginAndSize(a) {return a + 1;}` was overridden by `function getTileOriginAndSize(b) {return b + 1;}`'
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(controls.warn).toHaveBeenCalledWith(expectedWarning)
	})

	it('does not warn when the settings are equivalent arrays', () => {
		warnAboutConflicts = true
		settingsPath = [ 'colorSettings' ]
		settingName = 'set'
		existingSetting = [ 'a', 'b' ]
		overridingSetting = [ 'a', 'b' ]

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		expect(consoleWrapper.warn).not.toHaveBeenCalled()
		expect(controls.warn).not.toHaveBeenCalled()
	})

	it('does warn when the settings are arrays that are not equivalent', () => {
		warnAboutConflicts = true
		settingsPath = [ 'colorSettings' ]
		settingName = 'set'
		existingSetting = [ 'a', 'b' ]
		overridingSetting = [ 'b', 'a' ]

		maybeWarnAboutConflicts({ warnAboutConflicts, settingsPath, settingName, existingSetting, overridingSetting })

		const expectedWarning = 'some effects have conflicts on setting `colorSettings.set`: `[ a, b ]` was overridden by `[ b, a ]`'
		expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
		expect(controls.warn).toHaveBeenCalledWith(expectedWarning)
	})
})
