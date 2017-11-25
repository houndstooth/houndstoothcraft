// tslint:disable:no-unsafe-any max-line-length

import { state } from '../../state'
import * as to from '../../to'
import { documentWrapper, NullarySideEffector } from '../../utilities'
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

				executeSelectedHoundstoothEffects.main()
			}
		}
	}

export { playClickHandler as main }
