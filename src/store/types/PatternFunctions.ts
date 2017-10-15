import { Color } from '../../render'
import { Units } from '../../components'

type PatternFunctions = {
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: number): number,
	},
	gridSettings?: {
		gridSize?(): number,
	},
	tileSettings?: {
		tileSizeSetting?(p: Units): Units,
	},
	colorSettings?: {
		colorSet?(): Color[],
		opacity?(): number,
		backgroundColor?(): Color,
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountSetting?(p: number): number,
			stripeCountContinuumSettings?: {
				initialStripeCount?(p: number): number,
				deltaStripeCount?(p: number): number,
			},
		},
	},
}

export default PatternFunctions
