import * as insertElementRightAfter from '../../../src/page/insertElementRightAfter'
import setupEffectTogglesContainer from '../../../src/page/setupEffectTogglesContainer'
import deleteElementIfExists from '../../../src/page/deleteElementIfExists'

describe('setup effect toggles container', () => {
	let returnedEffectTogglesContainer
	let insertElementRightAfterSpy
	beforeEach(() => {
		deleteElementIfExists('.effect-toggles-container')

		insertElementRightAfterSpy = spyOn(insertElementRightAfter, 'default').and.callThrough()

		returnedEffectTogglesContainer = setupEffectTogglesContainer()
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
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedEffectTogglesContainer, canvasContainer)
	})
})
