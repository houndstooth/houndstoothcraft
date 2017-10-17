import * as settings from './settings'

interface BasePattern {
	animationSettings?: settings.AnimationSettings,
	colorSettings?: settings.ColorSettings,
	gridSettings?: settings.GridSettings,
	layerSettings?: settings.LayerSettings,
	stripeSettings?: settings.StripeSettings,
	textureSettings?: settings.TextureSettings,
	tileSettings?: settings.TileSettings,
	viewSettings?: settings.ViewSettings,
}

export default BasePattern
