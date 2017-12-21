// tslint:disable:no-type-definitions-outside-types-modules

import { Layer } from '../../types'
import { Bool, False, FunctionsOf, Rec, True } from '../types'

type LayerSettingsSchema<R extends Bool> =
	Rec<'endLayer', Layer, R>

interface LayerSettings extends LayerSettingsSchema<True>{}

type LayerSettingFunctions = FunctionsOf<LayerSettingsSchema<False>>

export {
	LayerSettings,
	LayerSettingsSchema,
	LayerSettingFunctions,
}
