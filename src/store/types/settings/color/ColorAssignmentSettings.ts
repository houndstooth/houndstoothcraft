// tslint:disable:no-magic-numbers max-file-line-count no-any

import { AssignmentMode, OffsetAddress, Supertile, TransformShapeColorIndices, Weave } from '../../../../components'
import { FunctionsOf } from '../../../../execute/types'
import * as to from '../../../../utilities/to'
import { Overwrite } from '../../Overwrite'
import { TypePathShortcuts } from '../../TypePathShortcuts'

// Structure

interface ColorAssignmentSettingsStructure {
	assignmentMode: any,
	flipGrain: any,
	offsetAddress?: any,
	supertile: any,
	switcheroo: any,
	transformShapeColorIndices?: any,
	weave: any,
}

// Type

interface ColorAssignmentSettings {
	assignmentMode: AssignmentMode,
	flipGrain: boolean,
	offsetAddress?: OffsetAddress,
	supertile: Supertile,
	switcheroo: boolean,
	transformShapeColorIndices?: TransformShapeColorIndices,
	weave: Weave,
}

// Functions of

type ColorAssignmentSettingsFunctions = FunctionsOf<ColorAssignmentSettings>

// Defaults

const DEFAULT_ASSIGNMENT_MODE: AssignmentMode = AssignmentMode.Weave
const DEFAULT_FLIP_GRAIN = false
const DEFAULT_OFFSET_ADDRESS: undefined = undefined
const DEFAULT_SUPERTILE: Supertile = to.Supertile([ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ])
const DEFAULT_SWITCHEROO = false
const DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES: undefined = undefined
const DEFAULT_WEAVE: Weave = { rows: [ 1, 0 ], columns: [ 0, 1 ] }

const DEFAULT_COLOR_ASSIGNMENT_SETTINGS: ColorAssignmentSettings = {
	assignmentMode: DEFAULT_ASSIGNMENT_MODE,
	flipGrain: DEFAULT_FLIP_GRAIN,
	offsetAddress: DEFAULT_OFFSET_ADDRESS,
	supertile: DEFAULT_SUPERTILE,
	switcheroo: DEFAULT_SWITCHEROO,
	transformShapeColorIndices: DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES,
	weave: DEFAULT_WEAVE,
}

// Shortcuts

const colorAssignmentSettings = to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ])
const settingsPathShortcuts: ColorAssignmentSettingsStructure = {
	assignmentMode: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'assignmentMode' ]),
	flipGrain: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'flipGrain' ]),
	offsetAddress: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'offsetAddress' ]),
	supertile: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'supertile' ]),
	switcheroo: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'switcheroo' ]),
	transformShapeColorIndices: to.SettingsPath([
		'colorSettings', 'colorAssignmentSettings', 'transformShapeColorIndices',
	]),
	weave: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'weave' ]),
}

// Shortcut types

type ColorAssignmentSettingsPathShortcut = 'colorAssignmentSettings'

type ColorAssignmentSettingsTypePathShortcuts = Overwrite<TypePathShortcuts, {
	BooleanPathShortcuts: 'flipGrain' | 'switcheroo',
}>

export {
	// Type

	ColorAssignmentSettings,

	// Functions of

	ColorAssignmentSettingsFunctions,

	// Defaults

	DEFAULT_COLOR_ASSIGNMENT_SETTINGS,

	// Shortcuts

	colorAssignmentSettings,
	settingsPathShortcuts,

	// Shortcut types

	ColorAssignmentSettingsPathShortcut,
	ColorAssignmentSettingsTypePathShortcuts,
}
