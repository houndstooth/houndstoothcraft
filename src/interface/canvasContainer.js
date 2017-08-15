let canvasContainer = document.querySelector('.canvas-container')

if (!canvasContainer) {
	canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')
	document.body.appendChild(canvasContainer)
}

export default canvasContainer
