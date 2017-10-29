// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ColorSet } from '../../components'
import { BLACK, TRANSPARENT } from '../../constants'
import { FunctionsOf } from '../../execute'
import { Color } from '../../render'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'
import { colorAssignmentSettings } from './color'

interface ColorSettingsStructure {
	readonly backgroundColor: any,
	readonly colorAssignmentSettings: any,
	readonly colorSet: any,
	readonly opacity: any,
	readonly [_: string]: any,
}

interface ColorSettings extends ColorSettingsStructure {
	readonly backgroundColor: Color,
	readonly colorAssignmentSettings: Partial<colorAssignmentSettings.ColorAssignmentSettings>,
	readonly colorSet: ColorSet,
	readonly opacity: number,
}

type ColorSettingsFunctions = Overwrite<FunctionsOf<ColorSettings>, {
	colorAssignmentSettings: colorAssignmentSettings.ColorAssignmentSettingsFunctions,
	[_: string]: any,
}>

const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_COLOR_SET: ColorSet = to.ColorSet([ BLACK, TRANSPARENT ])
const DEFAULT_OPACITY = 1

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignmentSettings: colorAssignmentSettings.DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	colorSet: DEFAULT_COLOR_SET,
	opacity: DEFAULT_OPACITY,
}

// Settings name

type ColorSettingsName = 'colorSettings'

// Settings names to paths map

const colorSettingsNamesToPathsMap: ColorSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: to.SettingsPath([ 'colorSettings' ]),
		settings: DEFAULT_COLOR_SETTINGS,
	}),
	...colorAssignmentSettings.colorAssignmentSettingsNamesToPathsMap,
}

// Settings names by type

type ColorSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ColorSetTypedSettingsNames: 'colorSet',
	ColorTypedSettingsNames: 'backgroundColor',
	NumberTypedSettingsNames: 'opacity',
}> | colorAssignmentSettings.ColorAssignmentSettingsNamesByType

// Export

export {
	ColorSettings,
	ColorSettingsFunctions,
	DEFAULT_COLOR_SETTINGS,
	ColorSettingsName,
	colorSettingsNamesToPathsMap,
	ColorSettingsNamesByType,
}
