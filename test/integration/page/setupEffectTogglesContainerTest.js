import insertElementRightAfter from '../../../src/page/insertElementRightAfter'
import setupEffectTogglesContainer from '../../../src/page/setupEffectTogglesContainer'

describe('setup effect toggles container', () => {
	let returnedEffectTogglesContainer
	let insertElementRightAfterSpy
	beforeEach(() => {
		insertElementRightAfterSpy = jasmine.createSpy().and.callFake(insertElementRightAfter)
		setupEffectTogglesContainer.__Rewire__('insertElementRightAfter', insertElementRightAfterSpy)

		returnedEffectTogglesContainer = setupEffectTogglesContainer()
	})

	xit('returns the newly created effect toggles container', () => {
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
