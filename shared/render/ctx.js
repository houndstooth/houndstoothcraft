import state from '../../state'

const canvas = document.querySelector('canvas')
const canvasSize = state.shared.canvasSize
canvas.width = canvasSize
canvas.height = canvasSize

export default canvas.getContext('2d')