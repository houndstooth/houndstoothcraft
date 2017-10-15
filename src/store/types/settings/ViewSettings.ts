import { CanvasSize } from '../../../canvas'

type ViewSettings = {
	canvasSize?: CanvasSize,
	zoomOnCanvasCenter?: boolean,
	centerViewOnCenterOfTileAtHomeAddress?: boolean,
	zoom?: number,
	rotateViewAboutCanvasCenter?: number,
}

export default ViewSettings
