// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ColorSet } from '../../components'
import { BLACK, TRANSPARENT } from '../../constants'
import { FunctionsOf } from '../../execute'
import { Color } from '../../render'
import * as to from '../../utilities/to'
import { buildSettingsPathShortcuts } from '../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../types'
import { colorAssignmentSettings } from './color'

// Structure

interface ColorSettingsStructure {
	backgroundColor: any,
	colorAssignmentSettings: any,
	colorSet: any,
	opacity: any,
	[_: string]: any,
}

// Type

interface ColorSettings extends ColorSettingsStructure {
	backgroundColor: Color,
	colorAssignmentSettings: Partial<colorAssignmentSettings.ColorAssignmentSettings>,
	colorSet: ColorSet,
	opacity: number,
}

// Functions of

type ColorSettingsFunctions = Overwrite<FunctionsOf<ColorSettings>, {
	colorAssignmentSettings: colorAssignmentSettings.ColorAssignmentSettingsFunctions,
	[_: string]: any,
}>

// Defaults

const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_COLOR_SET: ColorSet = to.ColorSet([ BLACK, TRANSPARENT ])
const DEFAULT_OPACITY = 1

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignmentSettings: colorAssignmentSettings.DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	colorSet: DEFAULT_COLOR_SET,
	opacity: DEFAULT_OPACITY,
}

// Shortcuts

const colorSettings: SettingsPath = to.SettingsPath([ 'colorSettings' ])

const colorSettingsPathShortcuts: ColorSettingsStructure = {
	...buildSettingsPathShortcuts({
		basePath: colorSettings,
		settings: DEFAULT_COLOR_SETTINGS,
	}),
	...colorAssignmentSettings.colorAssignmentSettingsPathShortcuts,
}

// Shortcut types

type ColorSettingsPathShortcut = 'colorSettings'

type ColorSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	ColorPathShortcuts: 'backgroundColor',
	ColorSetPathShortcuts: 'colorSet',
	NumberPathShortcuts: 'opacity',
}> | colorAssignmentSettings.ColorAssignmentSettingsTypePathShortcuts

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
	colorSettingsPathShortcuts,

	// Shortcut types

	ColorSettingsPathShortcut,
	ColorSettingsTypePathShortcuts,
}
