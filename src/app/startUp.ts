import { NamedEffect } from '../pattern'
import { appState } from './appState'
import { attachControlHandlers, createEffectToggles, storeDomElements } from './dom'
import { executeSelectedEffects } from './execute'
import { setupMixedDownContext } from './render'
import { buildSettingNamesToPathsMap } from './settings'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		storeDomElements.default()
		appState.settings.availableEffects = allEffects
		buildSettingNamesToPathsMap.default()
		setupMixedDownContext.default()
		createEffectToggles.default(allEffects)
		attachControlHandlers.default()
		executeSelectedEffects.default()
	}

export default startUp
