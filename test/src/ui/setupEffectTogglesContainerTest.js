import documentUtilities from '../../../src/utilities/documentUtilities'
import setupEffectTogglesContainer from '../../../src/ui/setupEffectTogglesContainer'

describe('setup effect toggles container', () => {
	let returnedEffectTogglesContainer
	beforeEach(() => {
		spyOn(documentUtilities, 'insertElementRightAfter').and.callThrough()
		returnedEffectTogglesContainer = setupEffectTogglesContainer()
	})

	it('returns the newly created effect toggles container', () => {
		const realEffectTogglesContainer = document.querySelector('.effect-toggles-container')
		expect(returnedEffectTogglesContainer.isSameNode(realEffectTogglesContainer)).toBe(true)
	})

	it('creates the effect toggles container and adds them to the document, with padding', () => {
		const expectedEffectTogglesContainer = document.createElement('div')
		expectedEffectTogglesContainer.classList.add('effect-toggles-container')
		expectedEffectTogglesContainer.style.padding = '20px'

		expect(returnedEffectTogglesContainer.isEqualNode(expectedEffectTogglesContainer)).toBe(true)
	})

	it('inserts the effect toggles container after the canvas', () => {
		const canvasContainer = document.querySelector('.canvas-container')
		expect(documentUtilities.insertElementRightAfter).toHaveBeenCalledWith(returnedEffectTogglesContainer, canvasContainer)
	})
})
