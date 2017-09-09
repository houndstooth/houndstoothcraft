import setupEffectTogglesContainer from '../../../src/controls/setupEffectTogglesContainer'
import insertElementRightAfter from '../../../src/controls/insertElementRightAfter'

describe('setup effect toggles container', () => {
	let returnedEffectTogglesContainer
	let insertElementRightAfterSpy
	beforeEach(() => {
		insertElementRightAfterSpy = jasmine.createSpy().and.callFake(insertElementRightAfter)
		setupEffectTogglesContainer.__Rewire__('insertElementRightAfter', insertElementRightAfterSpy)
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
		expect(insertElementRightAfterSpy).toHaveBeenCalledWith(returnedEffectTogglesContainer, canvasContainer)
	})
})
