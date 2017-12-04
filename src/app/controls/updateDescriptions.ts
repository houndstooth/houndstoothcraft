import { NamedEffect } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import addDescription from './addDescription'

const updateDescriptions: NullarySideEffector =
	(): void => {
		state.selectedHoundstoothEffects.forEach((effect: NamedEffect): void => {
			addDescription(effect.description)
		})
	}

export default updateDescriptions
