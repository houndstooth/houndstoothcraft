import { SettingsStep } from './types/SettingsStep'
import { animationSettings, animationSettingsPathShortcuts } from './types/settings/AnimationSettings'
import { colorSettings, colorSettingsPathShortcuts } from './types/settings/ColorSettings'
import { gridSettings, gridSettingsPathShortcuts } from './types/settings/GridSettings'
import { layerSettings, layerSettingsPathShortcuts } from './types/settings/LayerSettings'
import { stripeSettingsPathShortcuts, stripeSettings } from './types/settings/StripeSettings'
import { textureSettingsPathShortcuts, textureSettings, } from './types/settings/TextureSettings'
import { tileSettingsPathShortcuts, tileSettings } from './types/settings/TileSettings'
import { viewSettingsPathShortcuts, viewSettings } from './types/settings/ViewSettings'

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
