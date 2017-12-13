import { NamedEffect } from '../../types'
import { appState } from '../appState'
import { createDescription } from '../dom'

const updateDescriptions: () => void =
	(): void => {
		appState.controls.selectedEffects.forEach((effect: NamedEffect): void => {
			createDescription.default(effect.description)
		})
	}

export default updateDescriptions
