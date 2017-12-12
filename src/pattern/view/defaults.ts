// tslint:disable:no-any

import { Radian } from '../stripe'
import { ViewSettings } from './viewSettings'

const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS: boolean = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER: Radian = 0 as any
const DEFAULT_ZOOM: number = 1
const DEFAULT_ZOOM_ON_CANVAS_CENTER: boolean = false

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	centerViewOnCenterOfTileAtHomeAddress: DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS,
	rotateViewAboutCanvasCenter: DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER,
	zoom: DEFAULT_ZOOM,
	zoomOnCanvasCenter: DEFAULT_ZOOM_ON_CANVAS_CENTER,
}

export {
	DEFAULT_VIEW_SETTINGS,
}
