// tslint:disable:no-object-literal-type-assertion

import {
	appendOverride,
	appState,
	createOverrideClear,
	createOverrideLeaf,
	CreateOverrideParams,
	getOverrideLeafNode,
	globalWrapper,
	overrideInputHandler,
	OverrideOptions,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../../src/indexForTest'
import { createMockElement } from '../../../../helpers'
import Spy = jasmine.Spy

describe('create override leaf', () => {
	let overrideLeaf: HTMLElement
	let overrideLeafName: HTMLElement
	let overrideLeafInput: HTMLInputElement
	let overrideLeafClear: HTMLButtonElement
	let patternName: SettingStep
	let settingPath: SettingPath
	let children: HTMLElement[]
	let options: OverrideOptions
	let settingName: SettingStep

	let getOverrideLeafNodeSpy: Spy

	let subject: (_: CreateOverrideParams) => void
	beforeEach(() => {
		subject = createOverrideLeaf.default

		options = { grandparents: [], parent: {} as HTMLElement }
		patternName = to.SettingStep('layersPattern')
		settingPath = to.SettingPath([ 'gridSettings' ])
		settingName = to.SettingStep('tileResolution')

		children = []
		overrideLeaf = createMockElement({ children }) as HTMLElement
		overrideLeafName = {} as HTMLElement
		overrideLeafInput = createMockElement() as HTMLInputElement
		overrideLeafClear = createMockElement() as HTMLButtonElement

		spyOn(globalWrapper.document, 'createElement').and.callFake((tagName: string): HTMLElement => {
			switch (tagName) {
				case 'div':
					return overrideLeaf
				case 'span':
					return overrideLeafName
				case 'input':
					return overrideLeafInput
				default:
					return {} as HTMLElement
			}
		})
		spyOn(createOverrideClear, 'default').and.returnValue(overrideLeafClear)

		spyOn(appendOverride, 'default')
		getOverrideLeafNodeSpy = spyOn(getOverrideLeafNode, 'default')
		getOverrideLeafNodeSpy.and.returnValue({ overriding: false })

		subject({ options, patternName, settingPath, settingName })
	})

	it('appends a node into the override', () => {
		expect(appendOverride.default).toHaveBeenCalledWith({
			options,
			override: overrideLeaf,
			settingPath,
		})
	})

	it('creates a details element as the summary', () => {
		expect(children[0]).toBe(overrideLeafName)
	})

	it('the setting\'s name is the summary', () => {
		expect(overrideLeafName.innerHTML).toBe('tileResolution')
	})

	it('creates an input for you to use to override', () => {
		expect(children[1]).toBe(overrideLeafInput)
	})

	it('attaches the override handler to the input', () => {
		expect(overrideLeafInput.onchange).toBe(overrideInputHandler.default)
	})

	it('gives the input an id which describes its setting path, including the pattern', () => {
		expect(overrideLeaf.id).toBe('layersPattern-gridSettings-tileResolution')
	})

	describe('when the corresponding value is defined on the main houndstooth', () => {
		it('gives the input that initial value', () => {
			appState.settings.mainHoundstooth.layersPattern.gridSettings = {
				tileResolution: (): number => 45,
			}

			subject({ options, patternName, settingPath, settingName })

			expect(overrideLeafInput.value).toBe('function () { return 45; }')
		})
	})

	describe('when the corresponding value is not defined on the main houndstooth', () => {
		it('gives the input an undefined value', () => {
			appState.settings.mainHoundstooth.layersPattern.gridSettings = {}

			subject({ options, patternName, settingPath, settingName })

			expect(overrideLeafInput.value).toBeUndefined()
		})
	})

	it('appends an clear button when it is currently overriding', () => {
		getOverrideLeafNodeSpy.and.returnValue({ overriding: true })
		children.length = 0

		subject({ options, patternName, settingPath, settingName })

		expect(children[2]).toBe(overrideLeafClear)
	})
})
