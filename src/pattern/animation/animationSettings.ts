// tslint:disable:no-type-definitions-outside-types-modules

import { Bool, False, FunctionsOf, Rec, True } from '../types'

type AnimationSettingsSchema<R extends Bool> =
	Rec<'refreshCanvas', boolean, R>

interface AnimationSettings extends AnimationSettingsSchema<True>{}

type AnimationSettingFunctions = FunctionsOf<AnimationSettingsSchema<False>>

export {
	AnimationSettings,
	AnimationSettingFunctions,
	AnimationSettingsSchema,
}
