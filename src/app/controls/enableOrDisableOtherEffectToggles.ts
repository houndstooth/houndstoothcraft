import { Effect, NamedEffect } from '../../types'
import { appState } from '../appState'
import { combineEffects, effectsHaveConflicts } from '../settings'

const enableOrDisableOtherEffectToggles: () => void =
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
