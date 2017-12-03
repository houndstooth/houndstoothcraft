// tslint:disable:no-unsafe-any

import * as availableEffects from '../../availableEffects'
import { Effect, NamedEffect } from '../../pattern'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'
import { combineHoundstoothEffects } from '../execute'
import { InputElement, makeId } from '../page'
import effectsHaveConflicts from './effectsHaveConflicts'

const enableOrDisableOtherEffectToggles: NullarySideEffector =
	(): void => {
		const combinedHoundstoothEffects: Effect = combineHoundstoothEffects.default({
			houndstoothEffects: state.selectedHoundstoothEffects,
		})

		Object.values(availableEffects.get()).forEach((effect: NamedEffect): void => {
			const id: string = makeId.default(effect.name)
			const effectToggleToMaybeDisable: InputElement = documentWrapper.querySelector(`#${id}`)
			effectToggleToMaybeDisable.disabled = effectsHaveConflicts({
				effect,
				effectCheckingAgainst: combinedHoundstoothEffects,
			})
		})
	}

export default enableOrDisableOtherEffectToggles
