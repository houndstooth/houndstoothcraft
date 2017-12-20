// tslint:disable:no-object-literal-type-assertion

import {
	appendOverride,
	appState,
	createOverrideClear,
	createOverrideNodes,
	CreateOverrideParams,
	createOverrideParent,
	globalWrapper,
	isParentOfAnyOverridingChildren,
	OverrideOptions,
	OverrideParentNode,
	SettingPath,
	SettingStep,
	to,
	toggleOverrideParentOpen,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'
import Spy = jasmine.Spy

describe('create override parent', () => {
	let overrideParent: HTMLDetailsElement
	let overrideParentName: HTMLElement
	let overrideParentSummary: HTMLElement
	let overrideParentClear: HTMLButtonElement
	let patternName: SettingStep
	let settingName: SettingStep
	let settingPath: SettingPath
	let children: HTMLElement[]
	let summaryChildren: HTMLElement[]
	let options: OverrideOptions

	let isParentOfAnyOverridingChildrenSpy: Spy

	let subject: (_: CreateOverrideParams) => void
	beforeEach(() => {
		subject = createOverrideParent.default

		options = { grandparents: [], parent: {} as HTMLElement }
		patternName = to.SettingStep('layersPattern')
		settingPath = to.SettingPath([ 'colorSettings' ])
		settingName = to.SettingStep('colorAssignmentSettings')

		children = []
		summaryChildren = []
		overrideParent = buildMockElement({ children }) as HTMLDetailsElement
		overrideParentSummary = buildMockElement({ children: summaryChildren }) as HTMLElement
		overrideParentName = {} as HTMLElement
		overrideParentClear = {} as HTMLButtonElement

		spyOn(globalWrapper.document, 'createElement').and.callFake((tagName: string): HTMLElement => {
			switch (tagName) {
				case 'span':
					return overrideParentName
				case 'details':
					return overrideParent
				case 'summary':
					return overrideParentSummary
				default:
					return {} as HTMLElement
			}
		})
		spyOn(createOverrideClear, 'default').and.returnValue(overrideParentClear)

		spyOn(appendOverride, 'default')
		isParentOfAnyOverridingChildrenSpy = spyOn(isParentOfAnyOverridingChildren, 'default')
		isParentOfAnyOverridingChildrenSpy.and.returnValue(false)

		createOverrideNodes.default()

		subject({ options, patternName, settingPath, settingName })
	})

	it('appends a node into the overrides', () => {
		expect(appendOverride.default).toHaveBeenCalledWith({
			options,
			override: overrideParent,
			settingPath,
		})
	})

	it('creates a details element as the summary', () => {
		expect(children[0]).toBe(overrideParentSummary)
	})

	it('creates a name and adds it to the summary', () => {
		expect(summaryChildren[0]).toBe(overrideParentName)
	})

	it('the setting\'s name is the summary', () => {
		expect(overrideParentName.innerHTML).toBe('colorAssignmentSettings')
	})

	it('is closed by default', () => {
		expect(overrideParent.open).toBe(false)
	})

	it('can be opened', () => {
		const layersPattern: OverrideParentNode = appState.controls.overrideNodes.children.layersPattern as OverrideParentNode
		const colorSettings: OverrideParentNode = layersPattern.children.colorSettings as OverrideParentNode
		// tslint:disable-next-line:max-line-length
		const colorAssignmentSettings: OverrideParentNode = colorSettings.children.colorAssignmentSettings as OverrideParentNode
		colorAssignmentSettings.open = true

		subject({ options, patternName, settingPath, settingName })

		expect(overrideParent.open).toBe(true)
	})

	it('attaches a click handler to the summary', () => {
		expect(overrideParentSummary.onclick).toBe(toggleOverrideParentOpen.default)
	})

	it('gives the summary an id', () => {
		expect(overrideParentSummary.id).toBe('layersPattern-colorSettings-colorAssignmentSettings')
	})

	it('adds a clear button if any of its children are overriding', () => {
		isParentOfAnyOverridingChildrenSpy.and.returnValue(true)
		summaryChildren.length = 0

		subject({ options, patternName, settingPath, settingName })

		expect(summaryChildren[1]).toBe(overrideParentClear)
	})
})
