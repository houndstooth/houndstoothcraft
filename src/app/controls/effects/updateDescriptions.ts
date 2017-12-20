import { NamedEffect } from '../../../types'
import { appState } from '../../appState'
import { createDescription } from '../../dom'

const updateDescriptions: () => void =
	(): void => {
		appState.controls.selectedEffects.forEach((effectName: string): void => {
			const effect: NamedEffect = appState.settings.availableEffects[effectName]
			createDescription.default(effect.description)
		})
	}

export default updateDescriptions
