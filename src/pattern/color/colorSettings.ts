// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import * as colorAssignmentSettings from './colorAssignmentSettings'
import { Color, ColorSet } from './types'

interface ColorSettings {
	readonly backgroundColor: Color,
	readonly colorAssignmentSettings: Partial<colorAssignmentSettings.ColorAssignmentSettings>,
	readonly colorSet: ColorSet,
	readonly opacity: number,
	readonly [_: string]: any
}

type ColorSettingsFunctions = Overwrite<FunctionsOf<ColorSettings>, {
	colorAssignmentSettings: colorAssignmentSettings.ColorAssignmentSettingsFunctions,
	[_: string]: any,
}>

type ColorSettingsName = 'colorSettings'

type ColorSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ColorSetTypedSettingsNames: 'colorSet',
	ColorTypedSettingsNames: 'backgroundColor',
	NumberTypedSettingsNames: 'opacity',
}> | colorAssignmentSettings.ColorAssignmentSettingsNamesByType

export {
	ColorSettings,
	ColorSettingsFunctions,
	ColorSettingsName,
	ColorSettingsNamesByType,
}
