import { Layer } from '../../types'
import { Bool, False, FunctionsOf, Rec, True } from '../types'

type LayerSettingsSchema<R extends Bool> =
	Rec<'endLayer', Layer, R>

interface LayerSettings extends LayerSettingsSchema<True>{}

type LayerSettingsFunctions = FunctionsOf<LayerSettingsSchema<False>>

export {
	LayerSettings,
	LayerSettingsSchema,
	LayerSettingsFunctions,
}
