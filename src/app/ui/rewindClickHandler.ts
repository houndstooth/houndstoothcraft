// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import * as to from '../../to'
import { documentWrapper, NullarySideEffector, windowWrapper } from '../../utilities'
import { clearMixedDownContext } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		windowWrapper.clearInterval(state.interval)
		state.interval = undefined

		updateCurrentFrame(to.Frame(0))

		if (!state.animating) {
			const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
			/* istanbul ignore else */
			if (rewindButton) {
				rewindButton.disabled = true
			}
			clearMixedDownContext.default()
		}

		executeSelectedHoundstoothEffects.default()
	}

export default rewindClickHandler
