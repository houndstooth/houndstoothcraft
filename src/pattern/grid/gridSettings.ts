// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import buildSettingsNamesToPathsMap from '../../app/settings/buildSettingsNamesToPathsMap'
import * as to from '../../to'
import { SettingsNamesByTypeBase } from '../types'

interface GridSettings {
	readonly includeNegativeQuadrants: boolean,
	readonly tileResolution: number,
	readonly [_: string]: any,
}

type GridSettingsStructure = { readonly [P in keyof GridSettings]: any }

type GridSettingsFunctions = FunctionsOf<GridSettings>

const DEFAULT_TILE_RESOLUTION: number = 16
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS: boolean = false

const DEFAULT_GRID_SETTINGS: GridSettings = {
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
	tileResolution: DEFAULT_TILE_RESOLUTION,
}

type GridSettingsName = 'gridSettings'

const gridSettingsNamesToPathsMap: GridSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'gridSettings' ]),
	settings: DEFAULT_GRID_SETTINGS,
})

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'tileResolution',
}>

export {
	GridSettings,
	GridSettingsFunctions,
	DEFAULT_GRID_SETTINGS,
	GridSettingsName,
	gridSettingsNamesToPathsMap,
	GridSettingsNamesByType,
}
