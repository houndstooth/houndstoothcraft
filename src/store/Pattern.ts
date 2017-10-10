import { Color } from '../render'
import Assignment from './Assignment'

type Pattern = {
	viewSettings?: {
		canvasSize?: number | number[],
		zoomOnCanvasCenter?: boolean,
		centerViewOnCenterOfTileAtHomeAddress?: boolean,
		zoom?: number,
		rotateViewAboutCanvasCenter?: boolean,
	},
	gridSettings?: {
		gridSize?: number,
	},
	tileSettings?: {
		tileSizeSetting?: number,
	},
	colorSettings?: {
		colorSet?: Color[],
		assignment?: Assignment,
		opacity?: number,
		backgroundColor?: Color,
	},
	stripeSettings?: {
		stripePositionSettings?: {
			stripeCountSetting?: number,
		},
		baseStripeDiagonal?: string,
	},
	textureSettings?: {
		renderTexture?: () => void,
	},
	animationSettings?: {
		frameRate?: number,
	},
	layerSettings?: {
		startLayer?: number,
		endLayer?: number,
	},
}

export default Pattern
