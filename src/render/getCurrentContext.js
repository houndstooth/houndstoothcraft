import store from '../../store'

export default () => store.contexts[store.currentLayer]
