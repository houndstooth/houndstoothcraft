import { Px } from '../../../page'
import { Radian } from '../../../space'

interface ViewSettings {
	canvasSize: Px,
	centerViewOnCenterOfTileAtHomeAddress: boolean,
	rotateViewAboutCanvasCenter: Radian,
	zoom: number,
	zoomOnCanvasCenter: boolean,
}

export { ViewSettings }
