import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { state } from '../state'
import { Effect } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { resetInterface } from './resetInterface'

const buildEffectToggleClickHandler: (_: { checkbox: InputElement, houndstoothEffect: Effect }) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: { checkbox: InputElement, houndstoothEffect: Effect }): NullarySideEffector =>
		(): void => {
			resetInterface()

			const effectFunction: (houndstoothEffect: Effect) => void = checkbox.checked ? addEffect : removeEffect
			effectFunction(houndstoothEffect)

			executeSelectedHoundstoothEffects()
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

export { buildEffectToggleClickHandler }
