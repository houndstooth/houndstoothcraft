import * as settings from './settings'

type BasePattern = {
	viewSettings?: settings.ViewSettings,
	gridSettings?: settings.GridSettings,
	tileSettings?: settings.TileSettings,
	colorSettings?: settings.ColorSettings,
	stripeSettings?: settings.StripeSettings,
	textureSettings?: settings.TextureSettings,
	animationSettings?: settings.AnimationSettings,
	layerSettings?: settings.LayerSettings,
}

export default BasePattern
