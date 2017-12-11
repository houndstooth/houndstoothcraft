import { NamedEffect } from '../pattern'
import { appState } from './appState'
import { attachControlHandlers, createEffectToggles, storeDomElements, storeMixedDownContext } from './dom'
import { executeSelectedEffects } from './execute'
import { buildSettingNamesToPathsMap } from './settings'

const startUp: (_: NamedEffect[]) => void =
	(allEffects: NamedEffect[]): void => {
		storeDomElements.default()
		appState.settings.availableEffects = allEffects
		buildSettingNamesToPathsMap.default()
		storeMixedDownContext.default()
		createEffectToggles.default(allEffects)
		attachControlHandlers.default()
		executeSelectedEffects.default()
	}

export default startUp
