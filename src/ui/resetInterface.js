import { clear } from '../canvas'
import state from '../../state'
import { resetState } from '../store'
import { createWarningsContainer } from '../page'

const resetInterface = () => {
	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()
	warnings.innerHTML = ''

	clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}

export default resetInterface
