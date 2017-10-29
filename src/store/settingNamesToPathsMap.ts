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
import { SettingsPath } from './types'

const settingNamesToPathsMap: { [ index: string ]: SettingsPath } = {
	animationSettings: animationSettings.animationSettings, ...animationSettings.animationSettingsNamesToPathsMap,
	colorSettings: colorSettings.colorSettings, ...colorSettings.colorSettingsNamesToPathsMap,
	gridSettings: gridSettings.gridSettings, ...gridSettings.gridSettingsNamesToPathsMap,
	layerSettings: layerSettings.layerSettings, ...layerSettings.layerSettingsNamesToPathsMap,
	stripeSettings: stripeSettings.stripeSettings, ...stripeSettings.stripeSettingsNamesToPathsMap,
	textureSettings: textureSettings.textureSettings, ...textureSettings.textureSettingsNamesToPathsMap,
	tileSettings: tileSettings.tileSettings, ...tileSettings.tileSettingsNamesToPathsMap,
	viewSettings: viewSettings.viewSettings, ...viewSettings.viewSettingsNamesToPathsMap,
}

export { settingNamesToPathsMap }
