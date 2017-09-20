import canvas from '../canvas'
import state from '../../state'
import { resetState } from '../store'
import { createWarningsContainer } from '../page'

export default () => {
	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()
	warnings.innerHTML = ''

	canvas.clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}
