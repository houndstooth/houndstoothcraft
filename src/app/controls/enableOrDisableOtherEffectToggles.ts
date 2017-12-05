import { Effect, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { combineHoundstoothEffects, effectsHaveConflicts } from '../settings'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects.default({
			houndstoothEffects: state.controls.selectedHoundstoothEffects,
		})

		Object.values(state.settings.availableEffects).forEach((effect: NamedEffect): void => {
			state.dom.effectToggles[effect.name].disabled = effectsHaveConflicts.default({
				effect,
				effectCheckingAgainst: combinedHoundstoothEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
