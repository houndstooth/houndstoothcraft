import display from '../display'
import state from '../../state'
import store from '../store'
import setupWarnings from './setupWarnings'

export default () => {
	const warnings = document.querySelector('.warnings') || setupWarnings()
	warnings.innerHTML = ''

	display.clear()
	clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	store.resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}
