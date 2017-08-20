import clear from '../render/clear'
import store from '../../store'
import resetStore from '../store/resetStore'
import setupWarnings from './setupWarnings'

export default () => {
	const warnings = document.querySelector('.warnings') || setupWarnings()
	warnings.innerHTML = ''

	clear()
	clearInterval(store.interval)

	const existingEffects = store.selectedHoundstoothEffects.slice()
	resetStore(store)
	store.selectedHoundstoothEffects = existingEffects
}
