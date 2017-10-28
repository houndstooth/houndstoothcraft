// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcuts } from '../TypePathShortcuts'

// Structure

interface GridSettingsStructure {
	gridSize: any,
	includeNegativeQuadrants: any,

	[_: string]: any
}

// Type

interface GridSettings extends GridSettingsStructure {
	gridSize: number,
	includeNegativeQuadrants: boolean,
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

// Shortcuts

const gridSettings: SettingsPath = to.SettingsPath([ 'gridSettings' ])

const settingsPathShortcuts: GridSettingsStructure = buildSettingsPathShortcuts({
	basePath: gridSettings,
	settings: DEFAULT_GRID_SETTINGS,
})

// Shortcut types

type GridSettingsPathShortcut = 'gridSettings'

type GridSettingsTypePathShortcuts = Overwrite<TypePathShortcuts, {
	BooleanPathShortcuts: 'includeNegativeQuadrants'
	NumberPathShortcuts: 'gridSize',
}>

// Export

export {
	// Type

	GridSettings,

	// Functions of

	GridSettingsFunctions,

	// Defaults

	DEFAULT_GRID_SETTINGS,

	// Shortcuts

	gridSettings,
	settingsPathShortcuts,

	// Shortcut types

	GridSettingsPathShortcut,
	GridSettingsTypePathShortcuts,
}
