// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

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

// Settings names to paths map

const gridSettings: SettingsPath = to.SettingsPath([ 'gridSettings' ])

const gridSettingsNamesToPathsMap: GridSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: gridSettings,
	settings: DEFAULT_GRID_SETTINGS,
})

// Settings names by type

type GridSettingsName = 'gridSettings'

type GridSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'includeNegativeQuadrants',
	NumberTypedSettingsNames: 'gridSize',
}>

// Export

export {
	// Type

	GridSettings,

	// Functions of

	GridSettingsFunctions,

	// Defaults

	DEFAULT_GRID_SETTINGS,

	// Settings names to paths map

	gridSettings,
	gridSettingsNamesToPathsMap,

	// Settings names by type

	GridSettingsName,
	GridSettingsNamesByType,
}
