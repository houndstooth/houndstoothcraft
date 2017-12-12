import { Bool, False, FunctionsOf, Rec, True } from '../types'

type GridSettingsSchema<R extends Bool> =
	Rec<'includeNegativeQuadrants', boolean, R> &
	Rec<'tileResolution', number, R>

interface GridSettings extends GridSettingsSchema<True>{}

type GridSettingsFunctions = FunctionsOf<GridSettingsSchema<False>>

export {
	GridSettings,
	GridSettingsSchema,
	GridSettingsFunctions,
}
