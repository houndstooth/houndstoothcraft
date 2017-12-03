// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'

const pauseClickHandler: NullarySideEffector =
	(): void => {
		state.animating = false

		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = false
		}

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = true
		}
	}

export default pauseClickHandler
