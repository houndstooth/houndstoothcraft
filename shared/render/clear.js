import ctx from './ctx'
import state from '../application/state'

export default () => {
    const canvasSize = state.shared.canvasSize
    ctx.clearRect(0, 0, canvasSize, canvasSize)
}