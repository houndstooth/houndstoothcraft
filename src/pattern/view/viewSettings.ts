// tslint:disable:no-magic-numbers no-any

import { Radian } from '../stripe'
import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface ViewSettings {
	readonly centerViewOnCenterOfTileAtHomeAddress: boolean,
	readonly rotateViewAboutCanvasCenter: Radian,
	readonly zoom: number,
	readonly zoomOnCanvasCenter: boolean,
	readonly [_: string]: any,
}

type ViewSettingsFunctions = FunctionsOf<ViewSettings>

type ViewSettingsName = 'viewSettings'

type ViewSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'centerViewOnCenterOfTileAtHomeAddress' | 'zoomOnCanvasCenter',
	NumberTypedSettingsNames: 'zoom',
	PxTypedSettingsNames: 'canvasSize',
	RadianTypedSettingsNames: 'rotateViewAboutCanvasCenter',
}>

export {
	ViewSettings,
	ViewSettingsFunctions,
	ViewSettingsName,
	ViewSettingsNamesByType,
}
