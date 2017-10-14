import { Color } from '../../render'
import { CanvasSize } from '../../canvas'
import { Assignment, TileOriginAndSize } from '../../components'
import StripePosition from '../../components/types/StripePosition'

type BasePattern = {
	viewSettings?: {
		canvasSize?: CanvasSize,
		zoomOnCanvasCenter?: boolean,
		centerViewOnCenterOfTileAtHomeAddress?: boolean,
		zoom?: number,
		rotateViewAboutCanvasCenter?: number,
	},
	gridSettings?: {
		gridSize?: number,
		includeNegativeQuadrants?: boolean,
	},
	tileSettings?: {
		tileSizeSetting?: number,
		getTileOriginAndSize?: (p?: any) => TileOriginAndSize,
	},
	colorSettings?: {
		colorSet?: Color[],
		assignment?: Assignment,
		opacity?: number,
		backgroundColor?: Color,
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountMode?: string,
			stripeCountSetting?: number,
			stripeCountContinuumSettings?: {
				initialStripeCount?: number,
				deltaStripeCount?: number,
			},
			getStripePositions?: (p?: any) => StripePosition[],
		},
		baseStripeDiagonal?: string,
	},
	textureSettings?: {
		renderTexture?: (p?: any) => void,
	},
	animationSettings?: {
		frameRate?: number,
	},
	layerSettings?: {
		startLayer?: number,
		endLayer?: number,
	},
}

export default BasePattern
