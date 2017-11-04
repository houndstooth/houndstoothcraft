// tslint:disable:no-unsafe-any

import { PageElement } from '../page/types'
import { clear } from '../render'
import { state } from '../state'
import { resetState } from '../store'
import { Effect } from '../store/types'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const resetInterface: NullarySideEffector =
	(): void => {
		const warnings: PageElement = document.querySelector('.warnings-container')
		warnings.innerHTML = ''

		clear()
		window.clearInterval(state.interval)
		window.clearInterval(state.progressInterval)

		const existingEffects: Effect[] = state.selectedHoundstoothEffects.slice()
		resetState(state)
		state.selectedHoundstoothEffects = existingEffects
	}

export { resetInterface }
