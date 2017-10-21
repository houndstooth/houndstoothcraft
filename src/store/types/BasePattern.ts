import * as settings from './settings'

interface BasePattern {
	animationSettings: Partial<settings.AnimationSettings>,
	colorSettings: Partial<settings.ColorSettings>,
	gridSettings: Partial<settings.GridSettings>,
	layerSettings: Partial<settings.LayerSettings>,
	stripeSettings: Partial<settings.StripeSettings>,
	textureSettings: Partial<settings.TextureSettings>,
	tileSettings: Partial<settings.TileSettings>,
	viewSettings: Partial<settings.ViewSettings>,
}

export { BasePattern }
