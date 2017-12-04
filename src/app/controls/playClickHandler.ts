// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { mixDownContexts } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'

const playClickHandler: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = true
		}

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = false
		}

		const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (rewindButton) {
			rewindButton.disabled = false
		}

		state.controls.animating = true

		mixDownContexts.default()

		if (!resumingAnimation()) {
			executeSelectedHoundstoothEffects.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!state.execute.animationInterval

export default playClickHandler
