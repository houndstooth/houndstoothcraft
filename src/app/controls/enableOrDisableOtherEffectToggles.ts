import { Effect, NamedEffect } from '../../types'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { combineEffects, effectsHaveConflicts } from '../settings'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedEffects: Effect = combineEffects.default({
			effects: appState.controls.selectedEffects,
		})

		Object.values(appState.settings.availableEffects).forEach((effect: NamedEffect): void => {
			appState.dom.effectToggles[effect.name].disabled = effectsHaveConflicts.default({
				effect,
				effectCheckingAgainst: combinedEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
