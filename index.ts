import * as effects from './effects'
import {
	appState,
	attachControlHandlers,
	buildSettingNamesToPathsMap,
	createEffectToggles,
	executeSelectedEffects,
	NamedEffect,
	storeDomElements,
	storeMixedDownContext,
} from './src'

storeDomElements.default()

const allEffects: NamedEffect[] = Object.values(effects)
appState.settings.availableEffects = allEffects
buildSettingNamesToPathsMap.default()
storeMixedDownContext.default()
createEffectToggles.default(allEffects)
attachControlHandlers.default()
executeSelectedEffects.default()
