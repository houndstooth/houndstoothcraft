// tslint:disable:no-unsafe-any

import { Frame, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector, windowWrapper } from '../../utilities'
import { clearContexts, clearMixedDownContext, resetMixedDownContext } from '../canvas'
import { PageElement } from '../page'
import { resetState } from '../store'
import updateCurrentFrame from './updateCurrentFrame'

const resetInterface: NullarySideEffector =
	(): void => {
		const descriptions: PageElement = documentWrapper.querySelector('#descriptions-container')
		descriptions.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		windowWrapper.clearInterval(state.interval)
		windowWrapper.clearInterval(state.gridProgressInterval)
		state.resolveGrid()

		const existingFrame: Frame = state.currentFrame
		const existingEffects: NamedEffect[] = state.selectedHoundstoothEffects.slice()
		resetState.default(state)

		updateCurrentFrame(existingFrame)
		resetMixedDownContext.default()
		state.selectedHoundstoothEffects = existingEffects
	}

export default resetInterface
