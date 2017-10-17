import { CanvasSize } from '../../../canvas'

type ViewSettings = {
	canvasSize?: CanvasSize,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	rotateViewAboutCanvasCenter?: number,
	zoom?: number,
	zoomOnCanvasCenter?: boolean,
}

export default ViewSettings
