import { CANVAS_SIZE } from '../defaults'

let canvas = document.querySelector('canvas')

if (!canvas) {
	canvas = document.createElement('canvas')
	document.body.appendChild(canvas)
}

const canvasSize = settings.initial.viewConfig && settings.initial.viewConfig.canvasSize || CANVAS_SIZE
canvas.width = canvasSize
canvas.height = canvasSize

export default canvas
