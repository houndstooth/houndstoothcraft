// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'

const enableOrDisableAnimationControls: NullarySideEffector =
	(): void => {
		const canBeAnimated: boolean = mainHoundstoothHasAnimations()

		const frameInput: HTMLInputElement = documentWrapper.querySelector('#frame-input') as HTMLInputElement
		/* istanbul ignore else */
		if (frameInput) {
			frameInput.disabled = canBeAnimated
		}

		const playButton: HTMLButtonElement = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (playButton) {
			playButton.disabled = canBeAnimated
		}

		const pauseButton: HTMLButtonElement = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (pauseButton) {
			pauseButton.disabled = true
		}

		const rewindButton: HTMLButtonElement = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		/* istanbul ignore else */
		if (rewindButton) {
			rewindButton.disabled = true
		}
	}

const mainHoundstoothHasAnimations: () => boolean =
	(): boolean => !Object.keys(state.mainHoundstooth.animationsPattern).length

export default enableOrDisableAnimationControls
