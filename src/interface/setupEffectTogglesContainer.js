import theInterface from '../interface'
import setupCanvasContainer from '../render/setupCanvasContainer'

export default () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	theInterface.insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}
