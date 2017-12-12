import { Color } from '../../types'
import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'
import { ColorAssignmentSettingsFunctions, ColorAssignmentSettingsSchema } from './colorAssignmentSettings'
import { ColorSet } from './types'

type ColorSettingsSchema<R extends Bool> =
	Rec<'backgroundColor', Color, R> &
	Rec<'colorAssignmentSettings', ColorAssignmentSettingsSchema<R>, R> &
	Rec<'colorSet', ColorSet, R> &
	Rec<'opacity', number, R>

interface ColorSettings extends ColorSettingsSchema<True>{}

type ColorSettingsFunctions = Partial<Overwrite<FunctionsOf<ColorSettingsSchema<False>>, {
	colorAssignmentSettings: ColorAssignmentSettingsFunctions,
}>>

export {
	ColorSettings,
	ColorSettingsSchema,
	ColorSettingsFunctions,
}
