import { appState, createDescription, NullarySideEffector, updateDescriptions } from '../../../../../src/indexForTest'


describe('update descriptions', () => {
	let subject: NullarySideEffector
	beforeEach(() => {
		subject = updateDescriptions.default
	})

	it('adds the description for each of the selected effects', () => {
		spyOn(createDescription, 'default')

		appState.controls.selectedEffects = [
			{ name: 'Nu är det Jul igen', description: 'this is fun' },
			{ name: 'Family Learning Channel', description: 'i am a banana' },
		]

		subject()

		expect(createDescription.default).toHaveBeenCalledWith('this is fun')
		expect(createDescription.default).toHaveBeenCalledWith('i am a banana')
	})
})
