// tslint:disable:no-type-definitions-outside-types-modules

import { Px } from '../../app'
import { Radian } from '../stripe'
import { Bool, False, FunctionsOf, Rec, True } from '../types'

type ViewSettingsSchema<R extends Bool> =
	Rec<'scroll', Px[], R> &
	Rec<'tilt', Radian, R> &
	Rec<'zoom', number, R>

interface ViewSettings extends ViewSettingsSchema<True>{}

type ViewSettingFunctions = FunctionsOf<ViewSettingsSchema<False>>

export {
	ViewSettings,
	ViewSettingsSchema,
	ViewSettingFunctions,
}
