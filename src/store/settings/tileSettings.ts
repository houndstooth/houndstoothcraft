// tslint:disable:no-magic-numbers max-file-line-count no-any

import { getStandardTileOriginAndSize, GetTileOriginAndSize, Unit } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsPathShortcuts } from '../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../types'

// Structure

interface TileSettingsStructure {
	readonly collapseSameColoredShapesWithinTile: any,
	readonly getTileOriginAndSize: any,
	readonly tileSize: any,
	readonly [_: string]: any,
}

// Type

interface TileSettings extends TileSettingsStructure {
	readonly collapseSameColoredShapesWithinTile: boolean,
	readonly getTileOriginAndSize: GetTileOriginAndSize,
	readonly tileSize: Unit,
}

// Functions of

type TileSettingsFunctions = FunctionsOf<TileSettings>

// Defaults

const DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE = true
const DEFAULT_GET_TILE_ORIGIN_AND_SIZE: GetTileOriginAndSize = getStandardTileOriginAndSize
const DEFAULT_TILE_SIZE: Unit = to.Unit(50)

const DEFAULT_TILE_SETTINGS: TileSettings = {
	collapseSameColoredShapesWithinTile: DEFAULT_COLLAPSE_SAME_COLORED_SHAPES_WITHIN_TILE,
	getTileOriginAndSize: DEFAULT_GET_TILE_ORIGIN_AND_SIZE,
	tileSize: DEFAULT_TILE_SIZE,
}

// Shortcuts

const tileSettings: SettingsPath = to.SettingsPath([ 'tileSettings' ])

const tileSettingsPathShortcuts: TileSettingsStructure = buildSettingsPathShortcuts({
	basePath: tileSettings,
	settings: DEFAULT_TILE_SETTINGS,
})

// Shortcut types

type TileSettingsPathShortcut = 'tileSettings'

type TileSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	BooleanPathShortcuts: 'collapseSameColoredShapesWithinTile',
	GetTileOriginAndSizePathShortcuts: 'getTileOriginAndSize',
	UnitPathShortcuts: 'tileSize',
}>

// Export

export {
	// Type

	TileSettings,

	// Functions of

	TileSettingsFunctions,

	// Defaults

	DEFAULT_TILE_SETTINGS,

	// Shortcuts

	tileSettings,
	tileSettingsPathShortcuts,

	// Shortcut types

	TileSettingsPathShortcut,
	TileSettingsTypePathShortcuts,
}
