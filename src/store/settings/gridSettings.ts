// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

// Structure

interface GridSettingsStructure {
	readonly gridSize: any,
	readonly includeNegativeQuadrants: any,
	readonly [_: string]: any,
}

// Type

interface GridSettings extends GridSettingsStructure {
	readonly gridSize: number,
	readonly includeNegativeQuadrants: boolean,
}

// Functions of

type GridSettingsFunctions = FunctionsOf<GridSettings>

// Defaults

const DEFAULT_GRID_SIZE = 16
const DEFAULT_INCLUDE_NEGATIVE_QUADRANTS = false

const DEFAULT_GRID_SETTINGS: GridSettings = {
	gridSize: DEFAULT_GRID_SIZE,
	includeNegativeQuadrants: DEFAULT_INCLUDE_NEGATIVE_QUADRANTS,
}

// Settings name

type GridSettingsName = 'gridSettings'

// Settings names to paths map

const gridSettingsNamesToPathsMap: GridSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'gridSettings' ]),
	settings: DEFAULT_GRID_SETTINGS,
})

// Settings names by type

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'gridSize',
}>

// Export

export {
	GridSettings,
	GridSettingsFunctions,
	DEFAULT_GRID_SETTINGS,
	GridSettingsName,
	gridSettingsNamesToPathsMap,
	GridSettingsNamesByType,
}
