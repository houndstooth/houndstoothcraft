// tslint:disable:no-unsafe-any

import { Effect, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { InputElement, makeId } from '../dom'
import { combineHoundstoothEffects } from '../execute'
import effectsHaveConflicts from './effectsHaveConflicts'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects.default({
			houndstoothEffects: state.controls.selectedHoundstoothEffects,
		})

		Object.values(state.settings.availableEffects).forEach((effect: NamedEffect): void => {
			const id: string = makeId.default(effect.name)
			const effectToggleToMaybeDisable: InputElement = documentWrapper.querySelector(`#${id}`)
			effectToggleToMaybeDisable.disabled = effectsHaveConflicts({
				effect,
				effectCheckingAgainst: combinedHoundstoothEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
