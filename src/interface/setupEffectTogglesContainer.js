import interfaceUtilities from '../utilities/interfaceUtilities'
import setupCanvasContainer from '../application/setupCanvasContainer'

export default () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	interfaceUtilities.insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}
