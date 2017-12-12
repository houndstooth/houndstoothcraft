import {
	appState,
	createCheckbox,
	createEffectToggle,
	createLabel,
	globalWrapper,
	NamedEffect,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'


describe('create effect toggle', () => {
	let subject: (_: NamedEffect) => void
	const divChildren: HTMLElement[] = []
	let div: HTMLElement
	let checkbox: HTMLInputElement
	let label: HTMLElement

	const effectTogglesContainerChildren: HTMLElement[] = []
	let effectTogglesContainer: HTMLElement

	const effect: NamedEffect = { name: 'mock tooth', description: '' }

	beforeEach(() => {
		subject = createEffectToggle.default
		div = buildMockElement({ children: divChildren }) as HTMLElement
		checkbox = buildMockElement() as HTMLInputElement
		label = buildMockElement() as HTMLElement
		effectTogglesContainer = buildMockElement({
			children: effectTogglesContainerChildren,
		}) as HTMLElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(div)
		spyOn(createCheckbox, 'default').and.returnValue(checkbox)
		spyOn(createLabel, 'default').and.returnValue(label)
		spyOn(globalWrapper.document, 'querySelector').and.returnValue(effectTogglesContainer)

		subject(effect)
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
