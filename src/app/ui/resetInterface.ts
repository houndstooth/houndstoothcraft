// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector, windowWrapper } from '../../utilities'
import { PageElement } from '../page'
import { clear } from '../render'
import { resetState } from '../store'

const resetInterface: NullarySideEffector =
	(): void => {
		const warnings: PageElement = documentWrapper.querySelector('#warnings-container')
		warnings.innerHTML = ''

		clear.default()
		windowWrapper.clearInterval(state.interval)
		windowWrapper.clearInterval(state.gridProgressInterval)
		state.resolveGrid()

		const existingEffects: Effect[] = state.selectedHoundstoothEffects.slice()
		resetState.default(state)
		state.selectedHoundstoothEffects = existingEffects
	}

export default resetInterface
