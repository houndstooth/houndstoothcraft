import { Radian } from '../../../space'
import { Dimension } from '../../../page'

interface ViewSettings {
	canvasSize?: Dimension,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	rotateViewAboutCanvasCenter?: Radian,
	zoom?: number,
	zoomOnCanvasCenter?: boolean,
}

export { ViewSettings }
