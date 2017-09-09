import store from '../../store'

export default () => store.contexts.forEach(context => {
	store.mixedDownContext.drawImage(context.context.canvas, 0, 0)
})
