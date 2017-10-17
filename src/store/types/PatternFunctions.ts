import { Color } from '../../render'
import { Units } from '../../components'
import { Radian } from '../../space'

type PatternFunctions = {
	colorSettings?: {
		backgroundColor?(): Color,
		colorSet?(): Color[],
		opacity?(): number,
	},
	gridSettings?: {
		gridSize?(): number,
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountContinuumSettings?: {
				deltaStripeCount?(p: number): number,
				initialStripeCount?(p: number): number,
			},
			stripeCountSetting?(p: number): number,
		},
	},
	tileSettings?: {
		tileSizeSetting?(p: Units): Units,
	},
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: Radian): Radian,
	},
}

export default PatternFunctions
