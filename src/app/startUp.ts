import { NamedEffect } from '../types'
import { createOverrideNodes } from './controls'
import { attachControlHandlers, createEffectToggles, storeDomElements, updateOverrides } from './dom'
import { executeEffect } from './execute'
import { setupMixedDownContext } from './render'
import { setupAvailableEffects } from './setting'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		storeDomElements.default()
		createOverrideNodes.default()
		setupAvailableEffects.default(allEffects)
		setupMixedDownContext.default()
		createEffectToggles.default(allEffects)
		updateOverrides.default()
		attachControlHandlers.default()
		executeEffect.default()
	}

export default startUp
