import { Unit } from '../../components'
import { Radian } from '../../space'
import { AnimationSettingsFunctions } from './settings/AnimationSettings'
import { ColorSettingsFunctions } from './settings/ColorSettings'
import { GridSettingsFunctions } from './settings/GridSettings'
import { LayerSettingsFunctions } from './settings/LayerSettings'
import { StripeSettingsFunctions } from './settings/StripeSettings'
import { TextureSettingsFunctions } from './settings/TextureSettings'

interface PatternFunctions {
	animationSettings?: Partial<AnimationSettingsFunctions>,
	colorSettings?: Partial<ColorSettingsFunctions>,
	gridSettings?: Partial<GridSettingsFunctions>,
	layerSettings?: Partial<LayerSettingsFunctions>,
	stripeSettings?: Partial<StripeSettingsFunctions>,
	textureSettings?: Partial<TextureSettingsFunctions>,
	tileSettings?: {
		tileSize?(p: Unit): Unit,
	},
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: Radian): Radian,
	},
}

export { PatternFunctions }
