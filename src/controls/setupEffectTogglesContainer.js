import insertElementRightAfter from './insertElementRightAfter'
import display from '../display'

export default () => {
	const effectTogglesContainer = document.createElement('div')
	effectTogglesContainer.classList.add('effect-toggles-container')
	effectTogglesContainer.style.padding = '20px'

	const canvasContainer = document.querySelector('.canvas-container') || display.setupCanvasContainer()
	insertElementRightAfter(effectTogglesContainer, canvasContainer)

	return effectTogglesContainer
}
