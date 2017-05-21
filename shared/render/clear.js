import ctx from './ctx'
import state from '../../state'

export default () => {
    const canvasSize = state.shared.canvasSize
    ctx.clearRect(0, 0, canvasSize, canvasSize)
}