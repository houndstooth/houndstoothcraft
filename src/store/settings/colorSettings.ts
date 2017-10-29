// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ColorSet } from '../../components'
import { BLACK, TRANSPARENT } from '../../constants'
import { FunctionsOf } from '../../execute'
import { Color } from '../../render'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'
import { colorAssignmentSettings } from './color'

// Structure

interface ColorSettingsStructure {
	readonly backgroundColor: any,
	readonly colorAssignmentSettings: any,
	readonly colorSet: any,
	readonly opacity: any,
	readonly [_: string]: any,
}

// Type

interface ColorSettings extends ColorSettingsStructure {
	readonly backgroundColor: Color,
	readonly colorAssignmentSettings: Partial<colorAssignmentSettings.ColorAssignmentSettings>,
	readonly colorSet: ColorSet,
	readonly opacity: number,
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

// Settings names to paths map

const colorSettings: SettingsPath = to.SettingsPath([ 'colorSettings' ])

const colorSettingsNamesToPathsMap: ColorSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: colorSettings,
		settings: DEFAULT_COLOR_SETTINGS,
	}),
	...colorAssignmentSettings.colorAssignmentSettingsNamesToPathsMap,
}

// Settings names by type

type ColorSettingsName = 'colorSettings'

type ColorSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ColorSetTypedSettingsNames: 'colorSet',
	ColorTypedSettingsNames: 'backgroundColor',
	NumberTypedSettingsNames: 'opacity',
}> | colorAssignmentSettings.ColorAssignmentSettingsNamesByType

// Export

export {
	// Type

	ColorSettings,

	// Functions of

	ColorSettingsFunctions,

	// Defaults

	DEFAULT_COLOR_SETTINGS,

	// Settings names to paths map

	colorSettings,
	colorSettingsNamesToPathsMap,

	// Settings names by type

	ColorSettingsName,
	ColorSettingsNamesByType,
}
