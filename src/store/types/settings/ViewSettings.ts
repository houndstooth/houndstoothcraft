import { CanvasSize } from '../../../canvas'
import { Radian } from '../../../space'

interface ViewSettings {
	canvasSize?: CanvasSize,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	rotateViewAboutCanvasCenter?: Radian,
	zoom?: number,
	zoomOnCanvasCenter?: boolean,
}

export { ViewSettings }
