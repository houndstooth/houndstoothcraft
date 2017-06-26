import ctx from './ctx'

export default () => {
	const canvasSize = state.viewConfig.canvasSize
	ctx.clearRect(0, 0, canvasSize, canvasSize)
}
