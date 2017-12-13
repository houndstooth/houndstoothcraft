import { Effect, NamedEffect } from '../../types'
import { appState } from '../appState'
import { combineEffects, effectsHaveConflicts } from '../settings'

const enableOrDisableOtherEffectToggles: () => void =
	(): void => {
		const combinedEffects: Effect = combineEffects.default({
			effects: appState.controls.selectedEffects,
		})

		Object.entries(appState.settings.availableEffects).forEach(([ name, effect ]: [string, NamedEffect]): void => {
			appState.dom.effectToggles[name].disabled = effectsHaveConflicts.default({
				effect,
				effectCheckingAgainst: combinedEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
