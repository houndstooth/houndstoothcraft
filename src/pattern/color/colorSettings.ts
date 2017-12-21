// tslint:disable:no-type-definitions-outside-types-modules

import { Color } from '../../types'
import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'
import { ColorAssignmentSettingFunctions, ColorAssignmentSettingsSchema } from './colorAssignmentSettings'
import { ColorSet } from './types'

type ColorSettingsSchema<R extends Bool> =
	Rec<'backgroundColor', Color, R> &
	Rec<'colorAssignmentSettings', ColorAssignmentSettingsSchema<R>, R> &
	Rec<'colorSet', ColorSet, R> &
	Rec<'opacity', number, R>

interface ColorSettings extends ColorSettingsSchema<True>{}

type ColorSettingFunctions = Partial<Overwrite<FunctionsOf<ColorSettingsSchema<False>>, {
	colorAssignmentSettings: ColorAssignmentSettingFunctions,
}>>

export {
	ColorSettings,
	ColorSettingsSchema,
	ColorSettingFunctions,
}
