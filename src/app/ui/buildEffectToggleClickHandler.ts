// tslint:disable:no-unsafe-any max-line-length

import { Effect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { resetInterface } from '../ui'

const buildEffectToggleClickHandler: (_: { checkbox: InputElement, houndstoothEffect: Effect }) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: { checkbox: InputElement, houndstoothEffect: Effect }): NullarySideEffector =>
		(): void => {
			resetInterface.default()

			const effectFunction: (houndstoothEffect: Effect) => void = checkbox.checked ? addEffect : removeEffect
			effectFunction(houndstoothEffect)

			executeSelectedHoundstoothEffects.default()

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
		const canBeAnimated: boolean = mainHoundstoothHasAnimations()

		const frameInput: HTMLInputElement | undefined = documentWrapper.querySelector('#frame-input') as HTMLInputElement
		if (frameInput) {
			frameInput.disabled = canBeAnimated
		}

		const playButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		if (playButton) {
			playButton.disabled = canBeAnimated
		}

		const pauseButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		if (pauseButton) {
			pauseButton.disabled = true
		}

		const rewindButton: HTMLButtonElement | undefined = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		if (rewindButton) {
			rewindButton.disabled = true
		}
	}

const mainHoundstoothHasAnimations: () => boolean =
	(): boolean => !Object.keys(state.mainHoundstooth.animationsPattern).length

export default buildEffectToggleClickHandler
