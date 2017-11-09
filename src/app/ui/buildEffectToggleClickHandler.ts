// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { documentWrapper } from '../../utilities'
import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { resetInterface } from './resetInterface'

const buildEffectToggleClickHandler: (_: { checkbox: InputElement, houndstoothEffect: Effect }) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: { checkbox: InputElement, houndstoothEffect: Effect }): NullarySideEffector =>
		(): void => {
			resetInterface()

			const effectFunction: (houndstoothEffect: Effect) => void = checkbox.checked ? addEffect : removeEffect
			effectFunction(houndstoothEffect)

			executeSelectedHoundstoothEffects()

			dealWithAnimationControls()
		}

const addEffect: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		state.selectedHoundstoothEffects.push(houndstoothEffect)
	}

const removeEffect: (houndstoothEffect: Effect) => void =
	(houndstoothEffect: Effect): void => {
		state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter((selectedHoundstoothEffect: Effect) =>
			selectedHoundstoothEffect.name !== houndstoothEffect.name)
	}

const dealWithAnimationControls: NullarySideEffector =
	(): void => {
		const playButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		if (playButton) {
			playButton.disabled = !Object.keys(state.mainHoundstooth.animationsPattern).length
		}

		const pauseButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		if (pauseButton) {
			pauseButton.disabled = true
		}

		// tslint:disable-next-line:max-line-length
		const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		if (rewindButton) {
			rewindButton.disabled = true
		}
	}

export { buildEffectToggleClickHandler }
