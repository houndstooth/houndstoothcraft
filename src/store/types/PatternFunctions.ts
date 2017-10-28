import { AnimationSettingsFunctions } from './settings/AnimationSettings'
import { ColorSettingsFunctions } from './settings/ColorSettings'
import { GridSettingsFunctions } from './settings/GridSettings'
import { LayerSettingsFunctions } from './settings/LayerSettings'
import { StripeSettingsFunctions } from './settings/StripeSettings'
import { TextureSettingsFunctions } from './settings/TextureSettings'
import { TileSettingsFunctions } from './settings/TileSettings'
import { ViewSettingsFunctions } from './settings/ViewSettings'

interface PatternFunctions {
	animationSettings?: Partial<AnimationSettingsFunctions>,
	colorSettings?: Partial<ColorSettingsFunctions>,
	gridSettings?: Partial<GridSettingsFunctions>,
	layerSettings?: Partial<LayerSettingsFunctions>,
	stripeSettings?: Partial<StripeSettingsFunctions>,
	textureSettings?: Partial<TextureSettingsFunctions>,
	tileSettings?: Partial<TileSettingsFunctions>,
	viewSettings?: Partial<ViewSettingsFunctions>,
}

export { PatternFunctions }
