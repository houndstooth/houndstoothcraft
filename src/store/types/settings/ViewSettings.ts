import { CanvasSize } from '../../../canvas'
import { Radian } from '../../../space'

type ViewSettings = {
	canvasSize?: CanvasSize,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	rotateViewAboutCanvasCenter?: Radian,
	zoom?: number,
	zoomOnCanvasCenter?: boolean,
}

export default ViewSettings
