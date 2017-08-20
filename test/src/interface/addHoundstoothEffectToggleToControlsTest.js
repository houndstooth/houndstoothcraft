import addHoundstoothEffectToggleToControls from '../../../src/interface/addHoundstoothEffectToggleToControls'
import controls from '../../../src/interface/controls'

describe('add houndstooth effect toggle to controls', () => {
	it('adds a labelled checkbox to the controls for the effect', () => {
		controls.innerHTML = ''
		const mockHoundstoothEffect = { name: 'mock tooth' }

		addHoundstoothEffectToggleToControls(mockHoundstoothEffect)

		expect(controls.innerHTML).toBe(
			'<label style="cursor: pointer; display: block;">' +
				'<input type="checkbox" class="mock-tooth" style="cursor: pointer;">' +
				'mock tooth' +
			'</label>'
		)

		const nextHoundstoothEffect = { name: 'next tooth' }

		addHoundstoothEffectToggleToControls(nextHoundstoothEffect)

		expect(controls.innerHTML).toBe(
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
