import addEffectToggle from '../../../src/controls/addEffectToggle'
import setupEffectTogglesContainer from '../../../src/controls/setupEffectTogglesContainer'

describe('add effect toggle', () => {
	it('adds a labelled checkbox for the effect to the toggles container', () => {
		const effectTogglesContainer = document.querySelector('.effect-toggles-container') || setupEffectTogglesContainer()
		effectTogglesContainer.innerHTML = ''
		const mockHoundstoothEffect = { name: 'mock tooth' }

		addEffectToggle(mockHoundstoothEffect)

		expect(effectTogglesContainer.innerHTML).toBe(
			'<label style="cursor: pointer; display: block;">' +
				'<input type="checkbox" class="mock-tooth" style="cursor: pointer;">' +
				'mock tooth' +
			'</label>'
		)

		const nextHoundstoothEffect = { name: 'next tooth' }

		addEffectToggle(nextHoundstoothEffect)

		expect(effectTogglesContainer.innerHTML).toBe(
			'<label style="cursor: pointer; display: block;">' +
				'<input type="checkbox" class="mock-tooth" style="cursor: pointer;">' +
				'mock tooth' +
			'</label>' +
			'<label style="cursor: pointer; display: block;">' +
				'<input type="checkbox" class="next-tooth" style="cursor: pointer;">' +
				'next tooth' +
			'</label>'
		)
	})
})
