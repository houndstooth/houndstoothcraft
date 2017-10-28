import { SettingsStep } from './types/SettingsStep'
import {
	animationSettings,
	settingsPathShortcuts as animationSettingsPathShortcuts,
} from './types/settings/AnimationSettings'
import { colorSettings, settingsPathShortcuts as colorSettingsPathShortcuts } from './types/settings/ColorSettings'
import { gridSettings, settingsPathShortcuts as gridSettingsPathShortcuts } from './types/settings/GridSettings'
import { layerSettings, settingsPathShortcuts as layerSettingsPathShortcuts } from './types/settings/LayerSettings'
import { settingsPathShortcuts as stripeSettingsPathShortcuts, stripeSettings } from './types/settings/StripeSettings'
import {
	settingsPathShortcuts as textureSettingsPathShortcuts,
	textureSettings,
} from './types/settings/TextureSettings'
import { settingsPathShortcuts as tileSettingsPathShortcuts, tileSettings } from './types/settings/TileSettings'
import { settingsPathShortcuts as viewSettingsPathShortcuts, viewSettings } from './types/settings/ViewSettings'

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
