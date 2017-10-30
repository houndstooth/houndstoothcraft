// tslint:disable:no-magic-numbers no-any

import { FunctionsOf } from '../../execute'
import { Px } from '../../page'
import { Radian } from '../../space'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface ViewSettings {
	readonly canvasSize: Px,
	readonly centerViewOnCenterOfTileAtHomeAddress: boolean,
	readonly rotateViewAboutCanvasCenter: Radian,
	readonly zoom: number,
	readonly zoomOnCanvasCenter: boolean,
	readonly [_: string]: any,
}

type ViewSettingsStructure = { readonly [P in keyof ViewSettings]: any }

type ViewSettingsFunctions = FunctionsOf<ViewSettings>

const DEFAULT_CANVAS_SIZE: Px = to.Px(800)
const DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS = false
const DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER: Radian = to.Radian(0)
const DEFAULT_ZOOM = 1
const DEFAULT_ZOOM_ON_CANVAS_CENTER = false

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	canvasSize: DEFAULT_CANVAS_SIZE,
	centerViewOnCenterOfTileAtHomeAddress: DEFAULT_CENTER_VIEW_ON_CENTER_OF_TILE_AT_HOME_ADDRESS,
	rotateViewAboutCanvasCenter: DEFAULT_ROTATE_VIEW_ABOUT_CANVAS_CENTER,
	zoom: DEFAULT_ZOOM,
	zoomOnCanvasCenter: DEFAULT_ZOOM_ON_CANVAS_CENTER,
}

type ViewSettingsName = 'viewSettings'

const viewSettingsNamesToPathsMap: ViewSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'viewSettings' ]),
	settings: DEFAULT_VIEW_SETTINGS,
})

type ViewSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'centerViewOnCenterOfTileAtHomeAddress' | 'zoomOnCanvasCenter',
	NumberTypedSettingsNames: 'zoom',
	PxTypedSettingsNames: 'canvasSize',
	RadianTypedSettingsNames: 'rotateViewAboutCanvasCenter',
}>

export {
	ViewSettings,
	ViewSettingsFunctions,
	DEFAULT_VIEW_SETTINGS,
	DEFAULT_CANVAS_SIZE,
	ViewSettingsName,
	viewSettingsNamesToPathsMap,
	ViewSettingsNamesByType,
}
