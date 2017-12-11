import {
	appState,
	createCheckbox,
	createEffectToggle,
	createLabel,
	globalWrapper,
	NamedEffect,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

const subject: (_: NamedEffect) => void = createEffectToggle.default

describe('create effect toggle', () => {
	const divChildren: HTMLElement[] = []
	const div: HTMLElement = buildMockElement({ children: divChildren }) as HTMLElement
	const checkbox: HTMLInputElement = buildMockElement() as HTMLInputElement
	const label: HTMLElement = buildMockElement() as HTMLElement

	const effectTogglesContainerChildren: HTMLElement[] = []
	const effectTogglesContainer: HTMLElement = buildMockElement({
		children: effectTogglesContainerChildren,
	}) as HTMLElement

	const effect: NamedEffect = { name: 'mock tooth', description: '' }

	beforeEach(() => {
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
