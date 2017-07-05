import { CANVAS_SIZE } from '../defaults'

let canvas = document.querySelector('canvas')

if (!canvas) {
	canvas = document.createElement('canvas')
	document.body.appendChild(canvas)
}

const canvasSize = current.settings.initial.viewSettings && current.settings.initial.viewSettings.canvasSize || CANVAS_SIZE
canvas.width = canvasSize
canvas.height = canvasSize

export default canvas
