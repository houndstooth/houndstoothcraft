import Spy = jasmine.Spy
import {
	DEFAULT_BASE_PATTERN,
	mapOverPattern,
	MapOverPatternParams,
	Pattern,
	SettingStep,
	to,
} from '../../../../../../src/indexForTest'

describe('map over pattern', () => {
	let subject: (_?: MapOverPatternParams) => void
	let options: {}
	let pattern: Pattern
	let patternName: SettingStep
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
		patternName = to.SettingStep('layersPattern')
		perLeafSpy = jasmine.createSpy('perLeaf')
		perParentSpy = jasmine.createSpy('perParent')
	})

	it('deeply maps over the base pattern, calling functions on parents and leaves, with requested options', () => {
		subject({ options, pattern, patternName, perLeaf: perLeafSpy, perParent: perParentSpy })

		expect(perParentSpy.calls.all().length).toBe(3)
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('animationSettings'),
			settingPath: to.SettingPath([]),
			settingValue: { refreshCanvas: true },
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			patternName,
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
			patternName,
			settingName: to.SettingStep('colorAssignmentSettings'),
			settingPath: to.SettingPath([ 'colorSettings' ]),
			settingValue: { switcheroo: false },
		})

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('refreshCanvas'),
			settingPath: to.SettingPath([ 'animationSettings' ]),
			settingValue: true,
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('switcheroo'),
			settingPath: to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]),
			settingValue: false,
		})
	})

	it('supports not providing a function to be called per leaf', () => {
		subject({ options, pattern, patternName, perParent: perParentSpy })

		expect(perParentSpy.calls.all().length).toBe(3)
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('animationSettings'),
			settingPath: to.SettingPath([]),
			settingValue: { refreshCanvas: true },
		})
		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			patternName,
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
			patternName,
			settingName: to.SettingStep('colorAssignmentSettings'),
			settingPath: to.SettingPath([ 'colorSettings' ]),
			settingValue: { switcheroo: false },
		})
	})

	it('supports not providing a function to be called per parent', () => {
		subject({ options, pattern, patternName, perLeaf: perLeafSpy })

		expect(perLeafSpy.calls.all().length).toBe(2)
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('refreshCanvas'),
			settingPath: to.SettingPath([ 'animationSettings' ]),
			settingValue: true,
		})
		expect(perLeafSpy).toHaveBeenCalledWith({
			options,
			patternName,
			settingName: to.SettingStep('switcheroo'),
			settingPath: to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]),
			settingValue: false,
		})
	})

	it('uses the default base pattern if no pattern is specified', () => {
		subject({ options, perParent: perParentSpy })

		expect(perParentSpy).toHaveBeenCalledWith({
			options,
			patternName: 'basePattern',
			settingName: to.SettingStep('colorSettings'),
			settingPath: to.SettingPath([]),
			settingValue: DEFAULT_BASE_PATTERN.colorSettings,
		})
	})

	it('can be called with no argument', () => {
		subject()
	})
})
