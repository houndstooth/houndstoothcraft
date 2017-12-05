import { NamedEffect } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { addDescription } from '../dom'

const updateDescriptions: NullarySideEffector =
	(): void => {
		state.controls.selectedHoundstoothEffects.forEach((effect: NamedEffect): void => {
			addDescription.default(effect.description)
		})
	}

export default updateDescriptions
