// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface GridSettings {
	readonly includeNegativeQuadrants: boolean,
	readonly tileResolution: number,
	readonly [_: string]: any,
}

type GridSettingsFunctions = FunctionsOf<GridSettings>

const DEFAULT_TILE_RESOLUTION: number = 16
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS: boolean = false

const DEFAULT_GRID_SETTINGS: GridSettings = {
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
	tileResolution: DEFAULT_TILE_RESOLUTION,
}

type GridSettingsName = 'gridSettings'

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'tileResolution',
}>

export {
	GridSettings,
	GridSettingsFunctions,
	DEFAULT_GRID_SETTINGS,
	GridSettingsName,
	GridSettingsNamesByType,
}
