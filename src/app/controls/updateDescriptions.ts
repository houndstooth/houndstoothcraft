import { NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { addDescription } from '../dom'
import { state } from '../state'

const updateDescriptions: NullarySideEffector =
	(): void => {
		state.controls.selectedHoundstoothEffects.forEach((effect: NamedEffect): void => {
			addDescription.default(effect.description)
		})
	}

export default updateDescriptions
