import { Color } from '../../render'

type PatternFunctions = {
	viewSettings?: {
		rotateViewAboutCanvasCenter?(p: number): number,
	},
	gridSettings?: {
		gridSize?(): number,
	},
	tileSettings?: {
		tileSizeSetting?(p: number): number,
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
