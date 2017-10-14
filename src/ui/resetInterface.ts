import { clear } from '../canvas'
import state from '../state'
import { resetState } from '../store'
import { createWarningsContainer } from '../page'
import { window, document } from '../utilities/windowWrapper'
import { NullarySideEffector } from '../utilities/types'

const resetInterface: NullarySideEffector = (() => {
	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()
	warnings.innerHTML = ''

	clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}) as NullarySideEffector

export default resetInterface
