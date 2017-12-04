// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import * as to from '../../to'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { clearMixedDownContext } from '../canvas'
import { clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		clearInterval.default('animationInterval')

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
