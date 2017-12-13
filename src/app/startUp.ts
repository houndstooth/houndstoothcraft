import { NamedEffect } from '../types'
import { attachControlHandlers, createEffectToggles, storeDomElements } from './dom'
import { executeSelectedEffects } from './execute'
import { setupMixedDownContext } from './render'
import { setupAvailableEffects } from './settings'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		storeDomElements.default()
		setupAvailableEffects.default(allEffects)
		setupMixedDownContext.default()
		createEffectToggles.default(allEffects)
		attachControlHandlers.default()
		executeSelectedEffects.default()
	}

export default startUp
