import * as availableEffects from '../../availableEffects'
import { Effect, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { combineHoundstoothEffects } from '../execute'
import { makeId } from '../page'
import effectsHaveConflicts from './effectsHaveConflicts'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects.default({
			houndstoothEffects: state.selectedHoundstoothEffects,
		})

		Object.values(availableEffects.get()).forEach((effect: NamedEffect): void => {
			const effectToggleToMaybeDisable = documentWrapper.querySelector(`#${makeId.default(effect.name)}`)
			effectToggleToMaybeDisable.disabled = effectsHaveConflicts({
				effect,
				effectCheckingAgainst: combinedHoundstoothEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
