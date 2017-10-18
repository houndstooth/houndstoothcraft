import { clear } from '../canvas'
import { createWarningsContainer } from '../page'
import { state } from '../state'
import { resetState } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const resetInterface: NullarySideEffector = (() => {
	const warnings = document.querySelector('.warnings-container') || createWarningsContainer()
	warnings.innerHTML = ''

	clear()
	window.clearInterval(state.interval)

	const existingEffects = state.selectedHoundstoothEffects.slice()
	resetState(state)
	state.selectedHoundstoothEffects = existingEffects
}) as NullarySideEffector

export { resetInterface }
