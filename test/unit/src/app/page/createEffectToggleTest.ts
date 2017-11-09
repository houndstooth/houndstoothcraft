import * as page from '../../../../../src/app/page'
import { createEffectToggle } from '../../../../../src/app/page/createEffectToggle'
import * as createLabel from '../../../../../src/app/page/createLabel'
import { Effect } from '../../../../../src/pattern'
import * as windowWrapper from '../../../../../src/utilities'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('create effect toggle', () => {
	const label: page.PageElement = buildMockElement()
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	const effectTogglesContainerChildren: page.PageElement[] = []
	const effectTogglesContainer: page.PageElement = buildMockElement({ children: effectTogglesContainerChildren })

	beforeAll(() => {
		spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(createLabel, 'createLabel').and.returnValue(label)

		createEffectToggle(houndstoothEffect)
	})

	it('adds a labelled checkbox for the effect to the toggles container', () => {
		expect(effectTogglesContainerChildren[ 0 ]).toBe(label)
	})

	it('creates the label with the houndstooth effect', () => {
		expect(createLabel.createLabel).toHaveBeenCalledWith({ houndstoothEffect })
	})
})
