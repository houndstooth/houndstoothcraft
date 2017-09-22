const createContext = ({ canvasContainer, canvasSize }) => {
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasSize[ 0 ]
	canvas.height = canvasSize[ 1 ]

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

export default createContext
