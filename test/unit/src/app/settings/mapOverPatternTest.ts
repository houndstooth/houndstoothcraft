import Spy = jasmine.Spy
import { DEFAULT_BASE_PATTERN } from '../../../../../src/app/settings/defaults'
import { mapOverPattern, MapOverPatternParams, Pattern, to } from '../../../../../src/indexForTest'

describe('map over pattern', () => {
	let subject: (_?: MapOverPatternParams) => void
	let options: {}
	let pattern: Pattern
	let perLeafSpy: Spy
	let perParentSpy: Spy
	beforeEach(() => {
		subject = mapOverPattern.default

		options = { reallyImportantThing: 'need me when you call a per fn' }
		pattern = {
			animationSettings: {
				refreshCanvas: true,
			},
			colorSettings: {
				colorAssignmentSettings: {
					switcheroo: false,
				},
			},
		}
		perLeafSpy = jasmine.createSpy('perLeaf')
		perParentSpy = jasmine.createSpy('perParent')
	})

	it('deeply maps over the base pattern, calling functions on parents and leaves, with requested options', () => {
		subject({ options, pattern, perLeaf: perLeafSpy, perParent: perParentSpy })

		expect(perParentSpy.calls.all().length).toBe(3)
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'animationSettings',
			settingValue: { refreshCanvas: true },
			settingsPath: to.SettingsPath([]),
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'colorSettings',
			settingValue: {
				colorAssignmentSettings: {
					switcheroo: false,
				},
			},
			settingsPath: to.SettingsPath([]),
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'colorAssignmentSettings',
			settingValue: { switcheroo: false },
			settingsPath: to.SettingsPath([ 'colorSettings' ]),
		})

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: 'refreshCanvas',
			settingValue: true,
			settingsPath: to.SettingsPath([ 'animationSettings' ]),
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: 'switcheroo',
			settingValue: false,
			settingsPath: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]),
		})
	})

	it('supports not providing a function to be called per leaf', () => {
		subject({ options, pattern, perParent: perParentSpy })

		expect(perParentSpy.calls.all().length).toBe(3)
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'animationSettings',
			settingValue: { refreshCanvas: true },
			settingsPath: to.SettingsPath([]),
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'colorSettings',
			settingValue: {
				colorAssignmentSettings: {
					switcheroo: false,
				},
			},
			settingsPath: to.SettingsPath([]),
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'colorAssignmentSettings',
			settingValue: { switcheroo: false },
			settingsPath: to.SettingsPath([ 'colorSettings' ]),
		})
	})

	it('supports not providing a function to be called per parent', () => {
		subject({ options, pattern, perLeaf: perLeafSpy })

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: 'refreshCanvas',
			settingValue: true,
			settingsPath: to.SettingsPath([ 'animationSettings' ]),
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: 'switcheroo',
			settingValue: false,
			settingsPath: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]),
		})
	})

	it('uses the default base pattern if no pattern is specified', () => {
		subject({ options, perParent: perParentSpy })

		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: 'colorSettings',
			settingValue: DEFAULT_BASE_PATTERN.colorSettings,
			settingsPath: to.SettingsPath([]),
		})
	})

	it('can be called with no argument', () => {
		subject()
	})
})
