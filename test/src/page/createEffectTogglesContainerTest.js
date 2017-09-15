import * as insertElementRightAfter from '../../../src/page/insertElementRightAfter'
import createEffectTogglesContainer from '../../../src/page/createEffectTogglesContainer'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'

describe('create effect toggles container', () => {
	let returnedEffectTogglesContainer
	beforeEach(() => {
		deleteElementIfExists('.effect-toggles-container')

		spyOn(insertElementRightAfter, 'default').and.callThrough()

		returnedEffectTogglesContainer = createEffectTogglesContainer()
	})

	it('returns the newly created effect toggles container', () => {
		const realEffectTogglesContainer = document.querySelector('.effect-toggles-container')
		expect(returnedEffectTogglesContainer).toBe(realEffectTogglesContainer)
	})

	it('creates the effect toggles container and adds them to the document, with padding', () => {
		const expectedEffectTogglesContainer = document.createElement('div')
		expectedEffectTogglesContainer.classList.add('effect-toggles-container')
		expectedEffectTogglesContainer.style.padding = '20px'

		expect(returnedEffectTogglesContainer).toEqual(expectedEffectTogglesContainer)
	})

	it('inserts the effect toggles container after the canvas', () => {
		const canvasContainer = document.querySelector('.canvas-container')
		expect(insertElementRightAfter.default).toHaveBeenCalledWith(returnedEffectTogglesContainer, canvasContainer)
	})
})
