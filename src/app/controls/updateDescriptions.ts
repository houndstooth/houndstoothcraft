import { NamedEffect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { createDescription } from '../dom'

const updateDescriptions: NullarySideEffector =
	(): void => {
		appState.controls.selectedEffects.forEach((effect: NamedEffect): void => {
			createDescription.default(effect.description)
		})
	}

export default updateDescriptions
