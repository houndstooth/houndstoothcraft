// tslint:disable:no-object-literal-type-assertion

import {
	appendOverrideNode,
	appState,
	createOverrideLeaf,
	CreateOverrideParams,
	globalWrapper,
	overrideHandler,
	OverrideOptions,
	SettingPath,
	SettingStep,
	to,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

describe('create override leaf', () => {
	let overrideNode: HTMLElement
	let overrideName: HTMLElement
	let overrideInput: HTMLInputElement
	let settingPath: SettingPath
	let children: HTMLElement[]
	let options: OverrideOptions
	let settingName: SettingStep

	let subject: (_: CreateOverrideParams) => void
	beforeEach(() => {
		subject = createOverrideLeaf.default

		options = { grandparents: [], parent: {} as HTMLElement, patternName: 'layersPattern' }
		settingPath = to.SettingPath([ 'gridSettings' ])
		settingName = to.SettingStep('tileResolution')

		children = []
		overrideNode = buildMockElement({ children }) as HTMLElement
		overrideName = {} as HTMLElement
		overrideInput = buildMockElement() as HTMLInputElement

		spyOn(globalWrapper.document, 'createElement').and.callFake((tagName: string): HTMLElement => {
			switch (tagName) {
				case 'div':
					return overrideNode
				case 'span':
					return overrideName
				case 'input':
					return overrideInput
				default:
					return {} as HTMLElement
			}
		})

		spyOn(appendOverrideNode, 'default')

		subject({ options, settingPath, settingName, settingValue: undefined })
	})

	it('appends a node into the overrides', () => {
		expect(appendOverrideNode.default).toHaveBeenCalledWith({
			options,
			overrideNode,
			settingPath,
		})
	})

	it('creates a details element as the summary', () => {
		expect(children[0]).toBe(overrideName)
	})

	it('the setting\'s name is the summary', () => {
		expect(overrideName.innerHTML).toBe('tileResolution')
	})

	it('creates an input for you to use to override', () => {
		expect(children[1]).toBe(overrideInput)
	})

	it('attaches the override handler to the input', () => {
		expect(overrideInput.onchange).toBe(overrideHandler.default)
	})

	it('gives the input an id which describes its settings path, including the pattern', () => {
		expect(overrideInput.id).toBe('layersPattern-gridSettings-tileResolution')
	})

	describe('when the corresponding value is defined on the main houndstooth', () => {
		it('gives the input that initial value', () => {
			appState.settings.mainHoundstooth.layersPattern.gridSettings = {
				tileResolution: (): number => 45,
			}

			subject({ options, settingPath, settingName, settingValue: undefined })

			expect(overrideInput.value).toBe('function () { return 45; }')
		})
	})

	describe('when the corresponding value is not defined on the main houndstooth', () => {
		it('gives the input an undefined value', () => {
			appState.settings.mainHoundstooth.layersPattern.gridSettings = {}

			subject({ options, settingPath, settingName, settingValue: undefined })

			expect(overrideInput.value).toBeUndefined()
		})
	})
})
