import { NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { clearContexts, clearMixedDownContext } from '../canvas'
import { cancelPreviousPattern, clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import { resetMainHoundstooth } from '../settings'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import { BuildEffectToggleClickHandlerParams } from './types'
import updateDescriptions from './updateDescriptions'

const buildEffectToggleClickHandler: (_: BuildEffectToggleClickHandlerParams) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: BuildEffectToggleClickHandlerParams): NullarySideEffector =>
		(): void => {
			appState.dom.descriptionsContainer.innerHTML = ''

			clearContexts.default()
			clearMixedDownContext.default()

			clearInterval.default('animationInterval')
			clearInterval.default('gridProgressInterval')

			appState.execute.resolveGrid()

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
		appState.controls.selectedHoundstoothEffects.push(houndstoothEffect)
	}

const removeEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		// tslint:disable-next-line:max-line-length
		appState.controls.selectedHoundstoothEffects = appState.controls.selectedHoundstoothEffects.filter((selectedHoundstoothEffect: NamedEffect) =>
			selectedHoundstoothEffect.name !== houndstoothEffect.name)
	}

export default buildEffectToggleClickHandler
