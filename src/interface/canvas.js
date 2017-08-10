let canvas = document.querySelector('.realCanvas')

if (!canvas) {
	canvas = document.createElement('canvas')
	canvas.classList.add('realCanvas')
	document.body.appendChild(canvas)
}

export default canvas
