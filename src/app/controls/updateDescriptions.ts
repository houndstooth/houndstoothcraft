import { NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { addDescription } from '../dom'

const updateDescriptions: NullarySideEffector =
	(): void => {
		appState.controls.selectedEffects.forEach((effect: NamedEffect): void => {
			addDescription.default(effect.description)
		})
	}

export default updateDescriptions
