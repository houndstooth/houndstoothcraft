let canvas = document.querySelector('canvas')

if (!canvas) {
	canvas = document.createElement('canvas')
	document.body.appendChild(canvas)
}

export default canvas
