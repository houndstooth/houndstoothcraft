// tslint:disable:no-magic-numbers no-any

import { ColorSet } from '../../components'
import { BLACK, TRANSPARENT } from '../../constants'
import { FunctionsOf } from '../../execute'
import { Color } from '../../render'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'
import { colorAssignmentSettings } from './color'

interface ColorSettings {
	readonly backgroundColor: Color,
	readonly colorAssignmentSettings: Partial<colorAssignmentSettings.ColorAssignmentSettings>,
	readonly colorSet: ColorSet,
	readonly opacity: number,
	readonly [_: string]: any
}

type ColorSettingsStructure = { readonly [P in keyof ColorSettings]: any }

type ColorSettingsFunctions = Overwrite<FunctionsOf<ColorSettings>, {
	colorAssignmentSettings: colorAssignmentSettings.ColorAssignmentSettingsFunctions,
	[_: string]: any,
}>

const DEFAULT_BACKGROUND_COLOR: Color = TRANSPARENT
const DEFAULT_COLOR_SET: ColorSet = to.ColorSet([ BLACK, TRANSPARENT ])
const DEFAULT_OPACITY: number = 1

const DEFAULT_COLOR_SETTINGS: ColorSettings = {
	backgroundColor: DEFAULT_BACKGROUND_COLOR,
	colorAssignmentSettings: colorAssignmentSettings.DEFAULT_COLOR_ASSIGNMENT_SETTINGS,
	colorSet: DEFAULT_COLOR_SET,
	opacity: DEFAULT_OPACITY,
}

type ColorSettingsName = 'colorSettings'

const colorSettingsNamesToPathsMap: ColorSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: to.SettingsPath([ 'colorSettings' ]),
		settings: DEFAULT_COLOR_SETTINGS,
	}),
	...colorAssignmentSettings.colorAssignmentSettingsNamesToPathsMap,
}

type ColorSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ColorSetTypedSettingsNames: 'colorSet',
	ColorTypedSettingsNames: 'backgroundColor',
	NumberTypedSettingsNames: 'opacity',
}> | colorAssignmentSettings.ColorAssignmentSettingsNamesByType

export {
	ColorSettings,
	ColorSettingsFunctions,
	DEFAULT_COLOR_SETTINGS,
	ColorSettingsName,
	colorSettingsNamesToPathsMap,
	ColorSettingsNamesByType,
}
