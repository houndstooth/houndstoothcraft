import { CANVAS_SIZE } from './customize'

const canvas = document.querySelector('canvas')
canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

export default canvas.getContext('2d')