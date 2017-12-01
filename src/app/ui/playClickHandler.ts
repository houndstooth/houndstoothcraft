// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { mixDownContexts } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'

const playClickHandler: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = true
		}

		const pauseButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = false
		}

		const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (rewindButton) {
			rewindButton.disabled = false
		}

		state.animating = true

		mixDownContexts.default()

		console.log('resuming? silence is yes')
		if (!resumingAnimation()) {
			console.log('no')
			executeSelectedHoundstoothEffects.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!state.interval

export default playClickHandler
