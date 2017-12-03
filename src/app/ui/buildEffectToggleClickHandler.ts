// tslint:disable:no-unsafe-any max-line-length

import { NamedEffect } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { resetInterface } from '../ui'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'

const buildEffectToggleClickHandler: (_: { checkbox: InputElement, houndstoothEffect: NamedEffect }) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: { checkbox: InputElement, houndstoothEffect: NamedEffect }): NullarySideEffector =>
		(): void => {
			resetInterface.default()

			const effectFunction: (houndstoothEffect: NamedEffect) => void = checkbox.checked ? addEffect : removeEffect
			effectFunction(houndstoothEffect)

			executeSelectedHoundstoothEffects.default()

			enableOrDisableAnimationControls()

			enableOrDisableOtherEffectToggles()
		}

const addEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		state.selectedHoundstoothEffects.push(houndstoothEffect)
	}

const removeEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter((selectedHoundstoothEffect: NamedEffect) =>
			selectedHoundstoothEffect.name !== houndstoothEffect.name)
	}

export default buildEffectToggleClickHandler
