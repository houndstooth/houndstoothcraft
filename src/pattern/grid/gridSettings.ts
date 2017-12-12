// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface GridSettings {
	readonly includeNegativeQuadrants: boolean,
	readonly tileResolution: number,
	readonly [_: string]: any,
}

type GridSettingsFunctions = FunctionsOf<GridSettings>

type GridSettingsName = 'gridSettings'

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'tileResolution',
}>

export {
	GridSettings,
	GridSettingsFunctions,
	GridSettingsName,
	GridSettingsNamesByType,
}
