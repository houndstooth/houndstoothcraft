import { Effect, NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { combineHoundstoothEffects, effectsHaveConflicts } from '../settings'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects.default({
			houndstoothEffects: appState.controls.selectedHoundstoothEffects,
		})

		Object.values(appState.settings.availableEffects).forEach((effect: NamedEffect): void => {
			appState.dom.effectToggles[effect.name].disabled = effectsHaveConflicts.default({
				effect,
				effectCheckingAgainst: combinedHoundstoothEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
