// tslint:disable:no-unsafe-any max-line-length

import { NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { clearContexts, clearMixedDownContext } from '../canvas'
import { InputElement, PageElement } from '../dom'
import { cancelPreviousPattern, clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import { resetMainHoundstooth } from '../settings'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import updateDescriptions from './updateDescriptions'

const buildEffectToggleClickHandler: (_: { checkbox: InputElement, houndstoothEffect: NamedEffect }) => NullarySideEffector =
	({ checkbox, houndstoothEffect }: { checkbox: InputElement, houndstoothEffect: NamedEffect }): NullarySideEffector =>
		(): void => {
			const descriptions: PageElement = documentWrapper.querySelector('#descriptions-container')
			descriptions.innerHTML = ''

			clearContexts.default()
			clearMixedDownContext.default()

			clearInterval.default('animationInterval')
			clearInterval.default('gridProgressInterval')

			state.resolveGrid()

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
		state.selectedHoundstoothEffects.push(houndstoothEffect)
	}

const removeEffect: (houndstoothEffect: NamedEffect) => void =
	(houndstoothEffect: NamedEffect): void => {
		state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter((selectedHoundstoothEffect: NamedEffect) =>
			selectedHoundstoothEffect.name !== houndstoothEffect.name)
	}

export default buildEffectToggleClickHandler
