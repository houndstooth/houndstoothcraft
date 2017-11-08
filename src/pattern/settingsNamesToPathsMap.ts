import { SettingsPath } from '../app/store/types'
import { animationSettings } from './animation'
import { colorSettings } from './color'
import { gridSettings } from './grid'
import { layerSettings } from './layer'
import { stripeSettings } from './stripe'
import { textureSettings } from './texture'
import { tileSettings } from './tile'
import { viewSettings } from './view'

const settingsNamesToPathsMap: { [ index: string ]: SettingsPath } = {
	...animationSettings.animationSettingsNamesToPathsMap,
	...colorSettings.colorSettingsNamesToPathsMap,
	...gridSettings.gridSettingsNamesToPathsMap,
	...layerSettings.layerSettingsNamesToPathsMap,
	...stripeSettings.stripeSettingsNamesToPathsMap,
	...textureSettings.textureSettingsNamesToPathsMap,
	...tileSettings.tileSettingsNamesToPathsMap,
	...viewSettings.viewSettingsNamesToPathsMap,
}

export { settingsNamesToPathsMap }
