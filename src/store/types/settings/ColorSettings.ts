// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ColorSet } from '../../../components'
import { BLACK, TRANSPARENT } from '../../../constants'
import { FunctionsOf } from '../../../execute'
import { Color } from '../../../render'
import * as to from '../../../utilities/to'
import { SettingsStep } from '../SettingsStep'
import { ColorAssignmentSettings } from './color'
import {
	colorAssignmentSettings,
	ColorAssignmentSettingsPathShortcut,
	DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	settingsPathShortcuts as colorAssignmentSettingsPathShortcuts,
	TypePathShortcuts as ColorAssignmentSettingsTypePathShortcuts,
} from './color/ColorAssignmentSettings'

// Structure

interface ColorSettingsStructure {
	backgroundColor: any,
	colorAssignmentSettings: any,
	colorSet: any,
	opacity: any,

	[_: string]: any
}

// Type

interface ColorSettings {
	backgroundColor: Color,
	colorAssignmentSettings: Partial<ColorAssignmentSettings>,
	colorSet: ColorSet,
	opacity: number,
}

// Functions of

type ColorSettingsFunctions = FunctionsOf<ColorSettings>

// Defaults

const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_COLOR_SET: ColorSet = to.ColorSet([ BLACK, TRANSPARENT ])
const DEFAULT_OPACITY = 1

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignmentSettings: DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	colorSet: DEFAULT_COLOR_SET,
	opacity: DEFAULT_OPACITY,
}

// Shortcuts

const colorSettings: SettingsStep[] = to.SettingsPath([ 'colorSettings' ])

const settingsPathShortcuts: ColorSettingsStructure = {
	backgroundColor: to.SettingsPath([ 'colorSettings', 'backgroundColor' ]),
	colorAssignmentSettings,
	colorSet: to.SettingsPath([ 'colorSettings', 'colorSet' ]),
	opacity: to.SettingsPath([ 'colorSettings', 'opacity' ]),
	...colorAssignmentSettingsPathShortcuts,
}

// Shortcut types

type ColorSettingsPathShortcut = 'colorSettings'

namespace TypePathShortcuts {
	export type BooleanPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type ColorPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | 'backgroundColor'
	export type ColorSetPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | 'colorSet'
	export type ColorsPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type ExecuteTexturePathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type FramePathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type GetTileOriginAndSizePathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type LayerPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type NumberPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | 'opacity'
	export type PxPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type RadianPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
	export type UnitPathShortcuts = ColorAssignmentSettingsTypePathShortcuts.BooleanPathShortcuts | '_'
}

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
	ColorAssignmentSettingsPathShortcut,
	TypePathShortcuts,
}
