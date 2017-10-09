import addEffectToggle from '../../../../src/ui/addEffectToggle'
import buildMockElement from '../../helpers/buildMockElement'
import * as window from '../../../../src/utilities/windowWrapper'
import * as createLabel from '../../../../src/ui/createLabel'

describe('add effect toggle', () => {
	const mockLabel = {}
	const mockHoundstoothEffect = { name: 'mock tooth' }
	const mockEffectTogglesContainerChildren = []

	beforeAll(() => {
		const effectTogglesContainer = buildMockElement({ mockChildren: mockEffectTogglesContainerChildren })
		spyOn(window.document, 'querySelector').and.returnValue(effectTogglesContainer)
		spyOn(createLabel, 'default').and.returnValue(mockLabel)

		addEffectToggle(mockHoundstoothEffect)
	})

	it('adds a labelled checkbox for the effect to the toggles container', () => {
		expect(mockEffectTogglesContainerChildren[0]).toBe(mockLabel)
	})

	it('creates the label with the houndstooth effect', () => {
		expect(createLabel.default).toHaveBeenCalledWith(mockHoundstoothEffect)
	})
})