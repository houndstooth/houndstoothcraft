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
			settingName: to.SettingStep('animationSettings'),
			settingPath: to.SettingPath([]),
			settingValue: { refreshCanvas: true },
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('colorSettings'),
			settingPath: to.SettingPath([]),
			settingValue: {
				colorAssignmentSettings: {
					switcheroo: false,
				},
			},
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('colorAssignmentSettings'),
			settingPath: to.SettingPath([ 'colorSettings' ]),
			settingValue: { switcheroo: false },
		})

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('refreshCanvas'),
			settingPath: to.SettingPath([ 'animationSettings' ]),
			settingValue: true,
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('switcheroo'),
			settingPath: to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]),
			settingValue: false,
		})
	})

	it('supports not providing a function to be called per leaf', () => {
		subject({ options, pattern, perParent: perParentSpy })

		expect(perParentSpy.calls.all().length).toBe(3)
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('animationSettings'),
			settingPath: to.SettingPath([]),
			settingValue: { refreshCanvas: true },
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('colorSettings'),
			settingPath: to.SettingPath([]),
			settingValue: {
				colorAssignmentSettings: {
					switcheroo: false,
				},
			},
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('colorAssignmentSettings'),
			settingPath: to.SettingPath([ 'colorSettings' ]),
			settingValue: { switcheroo: false },
		})
	})

	it('supports not providing a function to be called per parent', () => {
		subject({ options, pattern, perLeaf: perLeafSpy })

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('refreshCanvas'),
			settingPath: to.SettingPath([ 'animationSettings' ]),
			settingValue: true,
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('switcheroo'),
			settingPath: to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]),
			settingValue: false,
		})
	})

	it('uses the default base pattern if no pattern is specified', () => {
		subject({ options, perParent: perParentSpy })

		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			settingName: to.SettingStep('colorSettings'),
			settingPath: to.SettingPath([]),
			settingValue: DEFAULT_BASE_PATTERN.colorSettings,
		})
	})

	it('can be called with no argument', () => {
		subject()
	})
})
