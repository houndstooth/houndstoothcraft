import { SettingsStep } from './types'
import {
	animationSettings,
	colorSettings,
	gridSettings,
	layerSettings,
	stripeSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './settings'

const settingsPathShortcuts: { [ index: string ]: SettingsStep[] } = {
	animationSettings: animationSettings.animationSettings, ...animationSettings.animationSettingsPathShortcuts,
	colorSettings: colorSettings.colorSettings, ...colorSettings.colorSettingsPathShortcuts,
	gridSettings: gridSettings.gridSettings, ...gridSettings.gridSettingsPathShortcuts,
	layerSettings: layerSettings.layerSettings, ...layerSettings.layerSettingsPathShortcuts,
	stripeSettings: stripeSettings.stripeSettings, ...stripeSettings.stripeSettingsPathShortcuts,
	textureSettings: textureSettings.textureSettings, ...textureSettings.textureSettingsPathShortcuts,
	tileSettings: tileSettings.tileSettings, ...tileSettings.tileSettingsPathShortcuts,
	viewSettings: viewSettings.viewSettings, ...viewSettings.viewSettingsPathShortcuts,
}

export { settingsPathShortcuts }
