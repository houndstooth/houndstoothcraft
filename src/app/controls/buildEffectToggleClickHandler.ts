import { NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { clearContexts, clearMixedDownContext } from '../canvas'
import { cancelPreviousPattern, clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import { resetMainHoundstooth } from '../settings'
import { state } from '../state'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import { BuildEffectToggleClickHandlerParams } from './types'
import updateDescriptions from './updateDescriptions'

const buildEffectToggleClickHandler: (_: BuildEffectToggleClickHandlerParams) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: BuildEffectToggleClickHandlerParams): NullarySideEffector =>
		(): void => {
			state.dom.descriptionsContainer.innerHTML = ''

			clearContexts.default()
			clearMixedDownContext.default()

			clearInterval.default('animationInterval')
			clearInterval.default('gridProgressInterval')

			state.execute.resolveGrid()

			cancelPreviousPattern.default()
			resetMainHoundstooth.default()

			const effectFunction: (houndstoothEffect: NamedEffect) => void = checkbox.checked ? addEffect : removeEffect
			effectFunction(houndstoothEffect)

			executeSelectedHoundstoothEffects.default()

			enableOrDisableAnimationControls()

			enableOrDisableOtherEffectToggles()

			updateDescriptions()
		}

const addEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		state.controls.selectedHoundstoothEffects.push(houndstoothEffect)
	}

const removeEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		// tslint:disable-next-line:max-line-length
		state.controls.selectedHoundstoothEffects = state.controls.selectedHoundstoothEffects.filter((selectedHoundstoothEffect: NamedEffect) =>
			selectedHoundstoothEffect.name !== houndstoothEffect.name)
	}

export default buildEffectToggleClickHandler
