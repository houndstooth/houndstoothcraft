import { Dimension } from '../../../page'
import { Radian } from '../../../space'

interface ViewSettings {
	canvasSize?: Dimension,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	rotateViewAboutCanvasCenter?: Radian,
	zoom?: number,
	zoomOnCanvasCenter?: boolean,
}

export { ViewSettings }
