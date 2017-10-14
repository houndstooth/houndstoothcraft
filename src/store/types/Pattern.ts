import { Color } from '../../render'
import { CanvasSize } from '../../canvas'
import { Assignment, TileOriginAndSize } from '../../components'
import StripePosition from '../../components/types/StripePosition'

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
		includeNegativeQuadrants?: boolean | { (p: boolean): boolean },
	},
	tileSettings?: {
		tileSizeSetting?: number | { (p: number): number },
		// eslint-disable-next-line max-len
		getTileOriginAndSize?: (p: any) => TileOriginAndSize | { (p: (p: any) => TileOriginAndSize): (p: any) => TileOriginAndSize },
	},
	colorSettings?: {
		colorSet?: Color[] | { (p: Color[]): Color[] },
		assignment?: Assignment | { (p: Assignment): Assignment },
		opacity?: number | { (p: number): number },
		backgroundColor?: Color | { (p: Color): Color },
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountMode?: string | { (p: string): string },
			stripeCountSetting?: number | { (p: number): number },
			stripeCountContinuumSettings?: {
				initialStripeCount?: number | { (p: number): number },
				deltaStripeCount?: number | { (p: number): number },
			},
			// eslint-disable-next-line max-len
			getStripePositions?: (p: any) => StripePosition[] | { (p: (p: any) => StripePosition[]): (p: any) => StripePosition[] },
		},
		baseStripeDiagonal?: string | { (p: string): string },
	},
	textureSettings?: {
		renderTexture?: (p: any) => void | { (p: (p: any) => void): (p: any) => void },
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
