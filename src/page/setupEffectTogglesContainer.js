import insertElementRightAfter from './insertElementRightAfter'
import setupCanvasContainer from './setupCanvasContainer'

export default () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}
