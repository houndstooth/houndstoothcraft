// tslint:disable:no-unsafe-any

import { executeSelectedHoundstoothEffects } from '../execute/executeSelectedHoundstoothEffects'
import { state } from '../state'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { document, window } from '../utilities/windowWrapper'

const playClickHandler: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement | undefined = document.querySelector('.play-button') as HTMLButtonElement
		if (playButton) {
			playButton.disabled = true
			playButton.style.fill = '#888'
		}

		if (!state.animating) {
			state.animating = true
			if (state.currentFrame === to.Frame(0)) {
				executeSelectedHoundstoothEffects()
			}
		}
	}

const pauseClickHandler: NullarySideEffector =
	(): void => {
		state.animating = false
	}

const rewindClickHandler: NullarySideEffector =
	(): void => {
		window.clearInterval(state.interval)
		state.currentFrame = to.Frame(0)
		executeSelectedHoundstoothEffects()
	}

export {
	playClickHandler,
	pauseClickHandler,
	rewindClickHandler,
}
