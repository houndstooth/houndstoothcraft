import canvas from '../canvas'
import state from '../../state'
import store from '../store'
import page from '../page'

export default () => {
	const warnings = document.querySelector('.warnings') || page.setupWarnings()
	warnings.innerHTML = ''

	canvas.clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	store.resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}
