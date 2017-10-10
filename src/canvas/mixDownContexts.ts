import state from '../state'

const mixDownContexts: { (): void } = () => state.contexts.forEach(context => {
	state.mixedDownContext.drawImage(context.canvas, 0, 0)
})

export default mixDownContexts
