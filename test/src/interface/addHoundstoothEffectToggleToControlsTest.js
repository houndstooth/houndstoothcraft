import addHoundstoothEffectToggleToControls from '../../../src/interface/addHoundstoothEffectToggleToControls'
import controls from '../../../src/interface/controls'

describe('add houndstooth effect toggle to controls', () => {
	it('adds a labelled checkbox to the controls for the effect', () => {
		controls.innerHTML = ''
		const mockHoundstoothEffect = { name: 'mock tooth' }

		addHoundstoothEffectToggleToControls(mockHoundstoothEffect)

		expect(controls.innerHTML).toBe(
			'<div><input type="checkbox" class="mock-tooth"><span>mock tooth</span></div>'
		)

		const nextHoundstoothEffect = { name: 'next tooth' }

		addHoundstoothEffectToggleToControls(nextHoundstoothEffect)

		expect(controls.innerHTML).toBe(
			'<div><input type="checkbox" class="mock-tooth"><span>mock tooth</span></div><div><input type="checkbox" class="next-tooth"><span>next tooth</span></div>'
		)
	})
})
