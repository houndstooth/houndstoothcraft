import canvas from '../canvas'
import state from '../../state'
import { resetState } from '../store'
import page from '../page'

export default () => {
	const warnings = document.querySelector('.warnings-container') || page.createWarningsContainer()
	warnings.innerHTML = ''

	canvas.clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}
