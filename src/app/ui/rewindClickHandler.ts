// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import * as to from '../../to'
import { documentWrapper, NullarySideEffector, windowWrapper } from '../../utilities'
import { executeSelectedHoundstoothEffects } from '../execute'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		windowWrapper.clearInterval(state.interval)

		updateCurrentFrame(to.Frame(0))

		if (!state.animating) {
			const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
			/* istanbul ignore else */
			if (rewindButton) {
				rewindButton.disabled = true
			}
		}

		executeSelectedHoundstoothEffects.default()
	}

export default rewindClickHandler
