import display from '../display'
import store from '../../store'
import storeStuff from '../store'
import setupWarnings from './setupWarnings'

export default () => {
	const warnings = document.querySelector('.warnings') || setupWarnings()
	warnings.innerHTML = ''

	display.clear()
	clearInterval(store.interval)

	const existingEffects = store.selectedHoundstoothEffects.slice()
	storeStuff.resetStore(store)
	store.selectedHoundstoothEffects = existingEffects
}
