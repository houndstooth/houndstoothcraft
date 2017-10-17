import { Color } from '../../render'
import { Units } from '../../components'

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
		rotateViewAboutCanvasCenter?(p: number): number,
	},
}

export default PatternFunctions
