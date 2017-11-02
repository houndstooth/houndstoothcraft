import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { state } from '../state'
import { Effect } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'
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
		// tslint:disable-next-line:no-unsafe-any
		const playButton: HTMLButtonElement | undefined = document.querySelector('.play-button') as HTMLButtonElement
		if (playButton) {
			playButton.disabled = !Object.keys(state.mainHoundstooth.animationsPattern).length
		}
	}

export { buildEffectToggleClickHandler }
