import { addDescription, NullarySideEffector, state, updateDescriptions } from '../../../../../src'

const subject: NullarySideEffector = updateDescriptions.default

describe('update descriptions', () => {
	it('adds the description for each of the selected effects', () => {
		spyOn(addDescription, 'default')

		state.controls.selectedHoundstoothEffects = [
			{ name: 'Nu är det Jul igen', description: 'this is fun' },
			{ name: 'Family Learning Channel', description: 'i am a banana' },
		]

		subject()

		expect(addDescription.default).toHaveBeenCalledWith('this is fun')
		expect(addDescription.default).toHaveBeenCalledWith('i am a banana')
	})
})
