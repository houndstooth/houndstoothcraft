// tslint:disable:max-line-length

import * as to from '../utilities/to'
import { SettingsStep } from './types/SettingsStep'

import { animationSettings, settingsPathShortcuts as animationSettingsPathShortcuts } from './types/settings/AnimationSettings'
import { colorSettings, settingsPathShortcuts as colorSettingsPathShortcuts } from './types/settings/ColorSettings'
import { gridSettings, settingsPathShortcuts as gridSettingsPathShortcuts } from './types/settings/GridSettings'
import { layerSettings, settingsPathShortcuts as layerSettingsPathShortcuts } from './types/settings/LayerSettings'
import { settingsPathShortcuts as stripeSettingsPathShortcuts, stripeSettings } from './types/settings/StripeSettings'
import { settingsPathShortcuts as textureSettingsPathShortcuts, textureSettings } from './types/settings/TextureSettings'
import { settingsPathShortcuts as tileSettingsPathShortcuts, tileSettings } from './types/settings/TileSettings'

const viewSettings: SettingsStep[] = to.SettingsPath([ 'viewSettings' ])
const canvasSize: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'canvasSize' ])
const zoom: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'zoom' ])
const rotateViewAboutCanvasCenter: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'rotateViewAboutCanvasCenter' ])
const centerViewOnCenterOfTileAtHomeAddress: SettingsStep[] = to.SettingsPath([
	'viewSettings', 'centerViewOnCenterOfTileAtHomeAddress',
])
const zoomOnCanvasCenter: SettingsStep[] = to.SettingsPath([ 'viewSettings', 'zoomOnCanvasCenter' ])

const settingsPathShortcuts: { [ index: string ]: SettingsStep[] } = {
	animationSettings, ...animationSettingsPathShortcuts,
	colorSettings, ...colorSettingsPathShortcuts,
	canvasSize,
	centerViewOnCenterOfTileAtHomeAddress,
	gridSettings, ...gridSettingsPathShortcuts,
	layerSettings, ...layerSettingsPathShortcuts,
	rotateViewAboutCanvasCenter,
	stripeSettings, ...stripeSettingsPathShortcuts,
	textureSettings, ...textureSettingsPathShortcuts,
	tileSettings, ...tileSettingsPathShortcuts,
	viewSettings,
	zoom,
	zoomOnCanvasCenter,
}

export { settingsPathShortcuts }
