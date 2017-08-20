export default () => {
	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')
	document.body.appendChild(canvasContainer)

	return canvasContainer
}
