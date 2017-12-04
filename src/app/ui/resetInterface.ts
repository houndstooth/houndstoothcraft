// tslint:disable:no-unsafe-any

import { Frame, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { clearContexts, clearMixedDownContext, resetMixedDownContext } from '../canvas'
import { clearInterval } from '../execute'
import { PageElement } from '../page'
import { resetSettings } from '../store'
import updateCurrentFrame from './updateCurrentFrame'

const resetInterface: NullarySideEffector =
	(): void => {
		const descriptions: PageElement = documentWrapper.querySelector('#descriptions-container')
		descriptions.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		clearInterval.default('interval')
		clearInterval.default('gridProgressInterval')

		state.resolveGrid()

		const existingFrame: Frame = state.currentFrame
		const existingEffects: NamedEffect[] = state.selectedHoundstoothEffects.slice()
		resetSettings.default()

		updateCurrentFrame(existingFrame)
		resetMixedDownContext.default()
		state.selectedHoundstoothEffects = existingEffects
	}

export default resetInterface
