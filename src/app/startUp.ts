import { NamedEffect } from '../types'
import { appState } from './appState'
import { attachControlHandlers, createEffectToggles, storeDomElements } from './dom'
import { executeSelectedEffects } from './execute'
import { setupMixedDownContext } from './render'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		storeDomElements.default()
		appState.settings.availableEffects = allEffects
		setupMixedDownContext.default()
		createEffectToggles.default(allEffects)
		attachControlHandlers.default()
		executeSelectedEffects.default()
	}

export default startUp
