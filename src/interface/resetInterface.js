import clear from '../render/clear'
import store from '../../store'
import warnings from '../interface/warnings'
import resetStore from '../store/resetStore'

export default () => {
	warnings.innerHTML = ''
	clear()
	clearInterval(store.interval)

	const existingEffects = store.selectedHoundstoothEffects.slice()
	resetStore(store)
	store.selectedHoundstoothEffects = existingEffects
}
