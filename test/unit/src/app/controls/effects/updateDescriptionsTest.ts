import { appState, createDescription, updateDescriptions } from '../../../../../../src/indexForTest'

describe('update descriptions', () => {
	let subject: () => void
	beforeEach(() => {
		subject = updateDescriptions.default
	})

	it('adds the description for each of the selected effects', () => {
		spyOn(createDescription, 'default')

		appState.settings.availableEffects = {
			'Family Learning Channel': { name: 'Family Learning Channel', description: 'i am a banana' },
			'and now': { name: 'and now', description: 'angry ticks fire out of my nipples' },
			'everybody dance': { name: 'everybody dance', description: 'this is fun' },
		}

		appState.controls.selectedEffects = [
			'everybody dance', 'Family Learning Channel',
		]

		subject()

		expect(createDescription.default).toHaveBeenCalledWith('this is fun')
		expect(createDescription.default).toHaveBeenCalledWith('i am a banana')
	})
})
