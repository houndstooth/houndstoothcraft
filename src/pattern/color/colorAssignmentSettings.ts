import { Bool, False, FunctionsOf, Rec, True } from '../types'
import { AssignmentMode, OffsetAddress, Supertile, TransformShapeColorIndices, Weave } from './types'

type ColorAssignmentSettingsSchema<R extends Bool> =
	Rec<'assignmentMode', AssignmentMode, R> &
	Rec<'flipGrain', boolean, R> &
	Rec<'offsetAddress', OffsetAddress, False> &
	Rec<'supertile', Supertile, R> &
	Rec<'switcheroo', boolean, R> &
	Rec<'transformShapeColorIndices', TransformShapeColorIndices, False> &
	Rec<'weave', Weave, R>

interface ColorAssignmentSettings extends ColorAssignmentSettingsSchema<True>{}

type ColorAssignmentSettingFunctions = FunctionsOf<ColorAssignmentSettingsSchema<False>>

export {
	ColorAssignmentSettings,
	ColorAssignmentSettingsSchema,
	ColorAssignmentSettingFunctions,
}
