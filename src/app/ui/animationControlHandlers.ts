// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import * as to from '../../to'
import { NullarySideEffector } from '../../utilities'
import { documentWrapper, windowWrapper } from '../../utilities/windowWrapper'
import { executeSelectedHoundstoothEffects } from '../execute'

const playClickHandler: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = true
		}

		if (!state.animating) {
			state.animating = true

			const pauseButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
			/* istanbul ignore else */
			if (pauseButton) {
				pauseButton.disabled = false
			}

			if (state.currentFrame === to.Frame(0)) {
				const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
				/* istanbul ignore else */
				if (rewindButton) {
					rewindButton.disabled = false
				}

				executeSelectedHoundstoothEffects()
			}
		}
	}

const pauseClickHandler: NullarySideEffector =
	(): void => {
		state.animating = false

		const playButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = false
		}

		const pauseButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = true
		}
	}

const rewindClickHandler: NullarySideEffector =
	(): void => {
		windowWrapper.clearInterval(state.interval)
		state.currentFrame = to.Frame(0)

		if (!state.animating) {
			const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
			/* istanbul ignore else */
			if (rewindButton) {
				rewindButton.disabled = true
			}
		}

		executeSelectedHoundstoothEffects()
	}

export {
	playClickHandler,
	pauseClickHandler,
	rewindClickHandler,
}
