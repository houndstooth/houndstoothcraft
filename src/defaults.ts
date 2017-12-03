import { Px } from './app'
import {
	animationSettings,
	BasePattern,
	ColorSet,
	colorSettings,
	gridSettings,
	Houndstooth,
	layerSettings,
	PatternFunctions,
	stripeSettings,
	textureSettings,
	tileSettings,
	viewSettings,
} from './pattern'

const DEFAULT_BASE_PATTERN: BasePattern = {
	animationSettings: animationSettings.DEFAULT_ANIMATION_SETTINGS,
	colorSettings: colorSettings.DEFAULT_COLOR_SETTINGS,
	gridSettings: gridSettings.DEFAULT_GRID_SETTINGS,
	layerSettings: layerSettings.DEFAULT_LAYER_SETTINGS,
	stripeSettings: stripeSettings.DEFAULT_STRIPE_SETTINGS,
	textureSettings: textureSettings.DEFAULT_TEXTURE_SETTINGS,
	tileSettings: tileSettings.DEFAULT_TILE_SETTINGS,
	viewSettings: viewSettings.DEFAULT_VIEW_SETTINGS,
}

const DEFAULT_ANIMATIONS_PATTERN: PatternFunctions = {}
const DEFAULT_DESCRIPTION: string = 'This is what things look like when you don\'t have any effects on. Try adding one.'
const DEFAULT_LAYERS_PATTERN: PatternFunctions = {}
const DEFAULT_NAME: string = 'standard'

const DEFAULT_HOUNDSTOOTH: Houndstooth = {
	animationsPattern: DEFAULT_ANIMATIONS_PATTERN,
	basePattern: DEFAULT_BASE_PATTERN,
	description: DEFAULT_DESCRIPTION,
	layersPattern: DEFAULT_LAYERS_PATTERN,
	name: DEFAULT_NAME,
}

const DEFAULT_CANVAS_SIZE: Px = viewSettings.DEFAULT_CANVAS_SIZE
const DEFAULT_COLOR_SET: ColorSet = colorSettings.DEFAULT_COLOR_SETTINGS.colorSet

export {
	DEFAULT_ANIMATIONS_PATTERN,
	DEFAULT_BASE_PATTERN,
	DEFAULT_CANVAS_SIZE,
	DEFAULT_COLOR_SET,
	DEFAULT_LAYERS_PATTERN,
	DEFAULT_HOUNDSTOOTH,
}
