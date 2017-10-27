import { PageElement } from '../../../../src/page'
import { Effect } from '../../../../src/store/types/Effect'
import { addEffectToggle } from '../../../../src/ui/addEffectToggle'
import * as createLabel from '../../../../src/ui/createLabel'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('add effect toggle', () => {
	const label: PageElement = {}
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	const effectTogglesContainerChildren: PageElement[] = []

	beforeAll(() => {
		const effectTogglesContainer: PageElement = buildMockElement({ children: effectTogglesContainerChildren })
		spyOn(window.document, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(createLabel, 'createLabel').and.returnValue(label)

		addEffectToggle(houndstoothEffect)
	})

	it('adds a labelled checkbox for the effect to the toggles container', () => {
		expect(effectTogglesContainerChildren[ 0 ]).toBe(label)
	})

	it('creates the label with the houndstooth effect', () => {
		expect(createLabel.createLabel).toHaveBeenCalledWith({ houndstoothEffect })
	})
})
