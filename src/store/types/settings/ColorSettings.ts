// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ColorSet } from '../../../components'
import { AssignmentMode, Supertile, Weave } from '../../../components/types'
import { BLACK, TRANSPARENT } from '../../../constants'
import { FunctionsOf } from '../../../execute'
import { Color } from '../../../render'
import * as to from '../../../utilities/to'
import { SettingsStep } from '../SettingsStep'
import { ColorAssignmentSettings } from './color'

// Structure

interface ColorSettingsStructure {
	backgroundColor: any,
	colorAssignmentSettings: any,
	colorSet: any,
	flipGrain: any,
	opacity: any,
}

// Type

interface ColorSettings {
	backgroundColor: Color,
	colorAssignmentSettings: Partial<ColorAssignmentSettings>,
	colorSet: ColorSet,
	flipGrain: boolean,
	opacity: number,
}

// Functions of

type ColorSettingsFunctions = FunctionsOf<ColorSettings>

// Defaults

const DEFAULT_ASSIGNMENT_MODE: AssignmentMode = AssignmentMode.Weave
const DEFAULT_FLIP_GRAIN = false
const DEFAULT_OFFSET_ADDRESS: undefined = undefined
const DEFAULT_SUPERTILE: Supertile = to.Supertile([ [ [ 1, 0 ], [ 0, 0 ] ], [ [ 1, 1 ], [ 0, 1 ] ] ])
const DEFAULT_SWITCHEROO = false
const DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES: undefined = undefined
const DEFAULT_WEAVE: Weave = { rows: [ 1, 0 ], columns: [ 0, 1 ] }

const DEFAULT_COLOR_SET: ColorSet = to.ColorSet([ BLACK, TRANSPARENT ])
const DEFAULT_OPACITY = 1
const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_COLOR_ASSIGNMENT_SETTINGS: ColorAssignmentSettings = {
	assignmentMode: DEFAULT_ASSIGNMENT_MODE,
	flipGrain: DEFAULT_FLIP_GRAIN,
	offsetAddress: DEFAULT_OFFSET_ADDRESS,
	supertile: DEFAULT_SUPERTILE,
	switcheroo: DEFAULT_SWITCHEROO,
	transformShapeColorIndices: DEFAULT_TRANSFORM_SHAPE_COLOR_INDICES,
	weave: DEFAULT_WEAVE,
}

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignmentSettings: DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	colorSet: DEFAULT_COLOR_SET,
	flipGrain: DEFAULT_FLIP_GRAIN,
	opacity: DEFAULT_OPACITY,
}

// Shortcuts

const colorSettings: SettingsStep[] = to.SettingsPath([ 'colorSettings' ])

const settingsPathShortcuts: ColorSettingsStructure = {
	backgroundColor: to.SettingsPath([ 'colorSettings', 'backgroundColor' ]),
	colorAssignmentSettings: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings' ]),
	colorSet: to.SettingsPath([ 'colorSettings', 'colorSet' ]),
	flipGrain: to.SettingsPath([ 'colorSettings', 'colorAssignmentSettings', 'flipGrain' ]),
	opacity: to.SettingsPath([ 'colorSettings', 'opacity' ]),
}

// Shortcut types

type ColorSettingsPathShortcut = 'colorSettings'

type BooleanPathShortcuts = '_'
type ColorPathShortcuts = 'backgroundColor'
type ColorSetPathShortcuts = 'colorSet'
type ColorsPathShortcuts = '_'
type ExecuteTexturePathShortcuts = '_'
type FramePathShortcuts = '_'
type GetTileOriginAndSizePathShortcuts = '_'
type LayerPathShortcuts = '_'
type NumberPathShortcuts = '_'
type PxPathShortcuts = '_'
type RadianPathShortcuts = '_'
type UnitPathShortcuts = '_'

// Export

export {
	// Type

	ColorSettings,

	// Functions of

	ColorSettingsFunctions,

	// Defaults

	DEFAULT_COLOR_SETTINGS,

	// Shortcuts

	colorSettings,
	settingsPathShortcuts,

	// Shortcut types

	ColorSettingsPathShortcut,
	BooleanPathShortcuts,
	ColorPathShortcuts,
	ColorSetPathShortcuts,
	ColorsPathShortcuts,
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	UnitPathShortcuts,
}
