import { createEffectToggle, createLabel, documentWrapper, Effect, PageElement } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create effect toggle', () => {
	const label: PageElement = buildMockElement()
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	const effectTogglesContainerChildren: PageElement[] = []
	const effectTogglesContainer: PageElement = buildMockElement({ children: effectTogglesContainerChildren })

	beforeAll(() => {
		spyOn(documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(createLabel, 'main').and.returnValue(label)

		createEffectToggle.main(houndstoothEffect)
	})

	it('adds a labelled checkbox for the effect to the toggles container', () => {
		expect(effectTogglesContainerChildren[ 0 ]).toBe(label)
	})

	it('creates the label with the houndstooth effect', () => {
		expect(createLabel.main).toHaveBeenCalledWith({ houndstoothEffect })
	})
})
