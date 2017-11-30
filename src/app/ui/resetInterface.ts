// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector, windowWrapper } from '../../utilities'
import { clearContexts } from '../canvas'
import { PageElement } from '../page'
import { resetState } from '../store'

const resetInterface: NullarySideEffector =
	(): void => {
		const warnings: PageElement = documentWrapper.querySelector('#warnings-container')
		warnings.innerHTML = ''

		clearContexts.default()
		windowWrapper.clearInterval(state.interval)
		windowWrapper.clearInterval(state.gridProgressInterval)
		state.resolveGrid()

		const existingEffects: Effect[] = state.selectedHoundstoothEffects.slice()
		resetState.default(state)
		state.selectedHoundstoothEffects = existingEffects
	}

export default resetInterface
