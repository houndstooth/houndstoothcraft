// tslint:disable:no-unsafe-any

import { clear } from '../canvas'
import { createWarningsContainer } from '../page'
import { PageElement } from '../page/types'
import { state } from '../state'
import { resetState } from '../store'
import { Effect } from '../store/types'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const resetInterface: NullarySideEffector =
	(): void => {
		const warnings: PageElement = document.querySelector('.warnings-container') || createWarningsContainer()
		warnings.innerHTML = ''

		clear()
		window.clearInterval(state.interval)

		const existingEffects: Effect[] = state.selectedHoundstoothEffects.slice()
		resetState(state)
		state.selectedHoundstoothEffects = existingEffects
	}

export { resetInterface }
