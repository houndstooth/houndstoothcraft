// tslint:disable-next-line:no-reaching-imports
import { DEFAULT_ANIMATION_SETTINGS } from './animation/defaults'
import { DEFAULT_COLOR_SETTINGS } from './color'
import { DEFAULT_GRID_SETTINGS } from './grid'
import { DEFAULT_LAYER_SETTINGS } from './layer'
import { DEFAULT_STRIPE_SETTINGS } from './stripe'
import { DEFAULT_TEXTURE_SETTINGS } from './texture'
import { DEFAULT_TILE_SETTINGS } from './tile'
import { FullPatternBaseValues } from './types'
import { DEFAULT_VIEW_SETTINGS } from './view'

const DEFAULT_PATTERN_STATE: FullPatternBaseValues = {
	animationSettings: DEFAULT_ANIMATION_SETTINGS,
	colorSettings: DEFAULT_COLOR_SETTINGS,
	gridSettings: DEFAULT_GRID_SETTINGS,
	layerSettings: DEFAULT_LAYER_SETTINGS,
	stripeSettings: DEFAULT_STRIPE_SETTINGS,
	textureSettings: DEFAULT_TEXTURE_SETTINGS,
	tileSettings: DEFAULT_TILE_SETTINGS,
	viewSettings: DEFAULT_VIEW_SETTINGS,
}

export {
	DEFAULT_PATTERN_STATE,
}
