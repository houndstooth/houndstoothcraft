import { SettingsStep } from './types'
import { animationSettings, animationSettingsPathShortcuts } from './settings/AnimationSettings'
import { colorSettings, colorSettingsPathShortcuts } from './settings/ColorSettings'
import { gridSettings, gridSettingsPathShortcuts } from './settings/GridSettings'
import { layerSettings, layerSettingsPathShortcuts } from './settings/LayerSettings'
import { stripeSettingsPathShortcuts, stripeSettings } from './settings/StripeSettings'
import { textureSettingsPathShortcuts, textureSettings, } from './settings/TextureSettings'
import { tileSettingsPathShortcuts, tileSettings } from './settings/TileSettings'
import { viewSettingsPathShortcuts, viewSettings } from './settings/ViewSettings'

const settingsPathShortcuts: { [ index: string ]: SettingsStep[] } = {
	animationSettings, ...animationSettingsPathShortcuts,
	colorSettings, ...colorSettingsPathShortcuts,
	gridSettings, ...gridSettingsPathShortcuts,
	layerSettings, ...layerSettingsPathShortcuts,
	stripeSettings, ...stripeSettingsPathShortcuts,
	textureSettings, ...textureSettingsPathShortcuts,
	tileSettings, ...tileSettingsPathShortcuts,
	viewSettings, ...viewSettingsPathShortcuts,
}

export { settingsPathShortcuts }
