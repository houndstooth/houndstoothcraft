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
	...animationSettings.animationSettingsNamesToPathsMap,
	...colorSettings.colorSettingsNamesToPathsMap,
	...gridSettings.gridSettingsNamesToPathsMap,
	...layerSettings.layerSettingsNamesToPathsMap,
	...stripeSettings.stripeSettingsNamesToPathsMap,
	...textureSettings.textureSettingsNamesToPathsMap,
	...tileSettings.tileSettingsNamesToPathsMap,
	...viewSettings.viewSettingsNamesToPathsMap,
}

export { settingNamesToPathsMap }
