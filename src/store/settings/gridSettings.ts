// tslint:disable:no-magic-numbers no-any

import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface GridSettings {
	readonly gridSize: number,
	readonly includeNegativeQuadrants: boolean,
	readonly [_: string]: any,
}

type GridSettingsStructure = { readonly [P in keyof GridSettings]: any }

type GridSettingsFunctions = FunctionsOf<GridSettings>

const DEFAULT_GRID_SIZE = 16
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS = false

const DEFAULT_GRID_SETTINGS: GridSettings = {
	gridSize: DEFAULT_GRID_SIZE,
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
}

type GridSettingsName = 'gridSettings'

const gridSettingsNamesToPathsMap: GridSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'gridSettings' ]),
	settings: DEFAULT_GRID_SETTINGS,
})

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'gridSize',
}>

export {
	GridSettings,
	GridSettingsFunctions,
	DEFAULT_GRID_SETTINGS,
	GridSettingsName,
	gridSettingsNamesToPathsMap,
	GridSettingsNamesByType,
}