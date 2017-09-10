import documentUtilities from '../utilities/documentUtilities'
import canvas from '../canvas'

export default () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || canvas.setupCanvasContainer()
	documentUtilities.insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}
