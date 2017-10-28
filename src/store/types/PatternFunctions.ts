import { Unit } from '../../components'
import { Radian } from '../../space'
import { AnimationSettingsFunctions } from './settings/AnimationSettings'
import { ColorSettingsFunctions } from './settings/ColorSettings'
import { GridSettingsFunctions } from './settings/GridSettings'

interface PatternFunctions {
	animationSettings?: Partial<AnimationSettingsFunctions>,
	colorSettings?: Partial<ColorSettingsFunctions>,
	gridSettings?: Partial<GridSettingsFunctions>,
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountContinuumSettings?: {
				deltaStripeCount?(p: number): number,
				initialStripeCount?(p: number): number,
			},
			stripeCount?(p: number): number,
		},
	},
	tileSettings?: {
		tileSize?(p: Unit): Unit,
	},
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: Radian): Radian,
	},
}

export { PatternFunctions }
