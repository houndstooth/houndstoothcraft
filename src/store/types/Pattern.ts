import { Color } from '../../render'
import { CanvasSize } from '../../canvas'
import { Assignment } from '../../components'

type Pattern = {
	viewSettings?: {
		canvasSize?: CanvasSize | { (p: CanvasSize): CanvasSize },
		zoomOnCanvasCenter?: boolean | { (p: boolean): boolean },
		centerViewOnCenterOfTileAtHomeAddress?: boolean | { (p: boolean): boolean },
		zoom?: number | { (p: number): number },
		rotateViewAboutCanvasCenter?: number | { (p: number): number },
	},
	gridSettings?: {
		gridSize?: number | { (p: number): number },
		includeNegativeQuadrants?: boolean| { (p: boolean): boolean },
	},
	tileSettings?: {
		tileSizeSetting?: number | { (p: number): number },
	},
	colorSettings?: {
		colorSet?: Color[] | { (p: Color[]): Color[] },
		assignment?: Assignment | { (p: Assignment): Assignment},
		opacity?: number | { (p: number): number },
		backgroundColor?: Color | { (p: Color): Color },
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountSetting?: number | { (p: number): number },
			stripeCountContinuumSettings?: {
				initialStripeCount?: number | { (p: number): number },
				deltaStripeCount?: number | { (p: number): number },
			},
		},
		baseStripeDiagonal?: string | { (p: string): string },
	},
	textureSettings?: {
		renderTexture?: () => void | { (p: () => void): () => void },
	},
	animationSettings?: {
		frameRate?: number | { (p: number): number },
	},
	layerSettings?: {
		startLayer?: number | { (p: number): number },
		endLayer?: number | { (p: number): number },
	},
}

export default Pattern
