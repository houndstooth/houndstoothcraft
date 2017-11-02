// tslint:disable:no-unsafe-any

import { executeSelectedHoundstoothEffects } from '../execute/executeSelectedHoundstoothEffects'
import { state } from '../state'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const playClickHandler: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement | undefined = document.querySelector('.play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = true
		}

		if (!state.animating) {
			state.animating = true

			const pauseButton: HTMLButtonElement | undefined = document.querySelector('.pause-button') as HTMLButtonElement
			/* istanbul ignore else */
			if (pauseButton) {
				pauseButton.disabled = false
			}

			if (state.currentFrame === to.Frame(0)) {
				const rewindButton: HTMLButtonElement | undefined = document.querySelector('.rewind-button') as HTMLButtonElement
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

		const playButton: HTMLButtonElement | undefined = document.querySelector('.play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = false
		}

		const pauseButton: HTMLButtonElement | undefined = document.querySelector('.pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = true
		}
	}

const rewindClickHandler: NullarySideEffector =
	(): void => {
		window.clearInterval(state.interval)
		state.currentFrame = to.Frame(0)

		if (!state.animating) {
			const rewindButton: HTMLButtonElement | undefined = document.querySelector('.rewind-button') as HTMLButtonElement
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
