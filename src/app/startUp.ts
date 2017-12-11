import { NamedEffect } from '../pattern'
import { appState } from './appState'
import { setupMixedDownContext } from './canvas'
import { attachControlHandlers, createEffectToggles, storeDomElements } from './dom'
import { executeSelectedEffects } from './execute'
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
