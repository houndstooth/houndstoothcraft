import store from '../../store'

export default () => store.canvases.forEach(canvas => {
	store.mixedDownCanvas.getContext('2d').drawImage(canvas, 0, 0)
})
