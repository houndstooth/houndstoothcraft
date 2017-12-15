// tslint:disable:no-object-literal-type-assertion

import {
	appendOverrideNode,
	CreateOverrideParams,
	createOverrideParent,
	globalWrapper,
	OverrideOptions,
	SettingsPath,
	to,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

describe('create override parent', () => {
	let overrideNode: HTMLElement
	let overrideName: HTMLElement
	let settingsPath: SettingsPath
	let children: HTMLElement[]
	let options: OverrideOptions
	beforeEach(() => {
		const subject: (_: CreateOverrideParams) => void = createOverrideParent.default

		options = { grandparents: [], parent: {} as HTMLElement, patternName: '' }
		settingsPath = to.SettingsPath([])
		const settingName: string = 'jesusSettings'

		children = []
		overrideNode = buildMockElement({ children }) as HTMLElement
		overrideName = {} as HTMLElement

		spyOn(globalWrapper.document, 'createElement').and.callFake((tagName: string): HTMLElement => {
			switch (tagName) {
				case 'details':
					return overrideNode
				case 'summary':
					return overrideName
				default:
					return {} as HTMLElement
			}
		})

		spyOn(appendOverrideNode, 'default')

		subject({ options, settingsPath, settingName, settingValue: undefined })
	})

	it('appends a node into the overrides', () => {
		expect(appendOverrideNode.default).toHaveBeenCalledWith({
			options,
			overrideNode,
			settingsPath,
		})
	})

	it('creates a details element as the summary', () => {
		expect(children[0]).toBe(overrideName)
	})

	it('the setting\'s name is the summary', () => {
		expect(overrideName.innerHTML).toBe('jesusSettings')
	})
})
