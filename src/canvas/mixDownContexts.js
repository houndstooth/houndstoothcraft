import state from '../../state'

export default () => state.contexts.forEach(context => {
	state.mixedDownContext.drawImage(context.context.canvas, 0, 0)
})
