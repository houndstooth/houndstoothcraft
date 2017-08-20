import store from '../../store'

export default () => store.contexts = store.canvases.map(canvas => canvas.getContext('2d'))
