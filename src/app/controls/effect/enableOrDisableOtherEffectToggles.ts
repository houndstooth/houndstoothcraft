import { NamedEffect } from '../../../types'
import { appState } from '../../appState'
import { effectsHaveConflicts } from '../../setting'

const enableOrDisableOtherEffectToggles: () => void =
	(): void => {
		Object.entries(appState.settings.availableEffects).forEach(([ name, effect ]: [string, NamedEffect]): void => {
			appState.dom.effectToggles[name].disabled = effectsHaveConflicts.default({
				effect,
				effectCheckingAgainst: appState.settings.combinedEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
