import ctx from './ctx'
import state from '../state/state'

export default () => {
	const canvasSize = state.canvasSize
	ctx.clearRect(0, 0, canvasSize, canvasSize)
}
