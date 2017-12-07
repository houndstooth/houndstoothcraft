import {
	appState,
	createCheckbox,
	createEffectToggle,
	createLabel,
	documentWrapper,
	NamedEffect,
	PageElement,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create effect toggle', () => {
	const divChildren: PageElement[] = []
	const div: PageElement = buildMockElement({ children: divChildren })
	const checkbox: PageElement = buildMockElement()
	const label: PageElement = buildMockElement()

	const effectTogglesContainerChildren: PageElement[] = []
	const effectTogglesContainer: PageElement = buildMockElement({ children: effectTogglesContainerChildren })

	const effect: NamedEffect = { name: 'mock tooth', description: '' }

	beforeEach(() => {
		spyOn(documentWrapper, 'createElement').and.returnValue(div)
		spyOn(createCheckbox, 'default').and.returnValue(checkbox)
		spyOn(createLabel, 'default').and.returnValue(label)
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)

		createEffectToggle.default(effect)
	})

	it('puts the div in the effect toggles container', () => {
		expect(effectTogglesContainerChildren[ 0 ]).toBe(div)
	})

	it('adds the checkbox to the div', () => {
		expect(divChildren[ 0 ]).toBe(checkbox)
	})

	it('adds the label to the div, after the checkbox', () => {
		expect(divChildren[ 1 ]).toBe(label)
	})

	it('creates the label with the effect', () => {
		expect(createLabel.default).toHaveBeenCalledWith({ effect })
	})

	it('creates the checkbox using the effect', () => {
		expect(createCheckbox.default).toHaveBeenCalledWith({ effect })
	})

	it('stores the effect toggle checkbox on the app state', () => {
		expect(appState.dom.effectToggles['mock tooth']).toBe(checkbox)
	})
})
