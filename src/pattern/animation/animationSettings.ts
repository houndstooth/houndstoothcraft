import { Bool, False, FunctionsOf, Rec, True } from '../types'

type AnimationSettingsSchema<R extends Bool> =
	Rec<'refreshCanvas', boolean, R>

interface AnimationSettings extends AnimationSettingsSchema<True>{}

type AnimationSettingsFunctions = FunctionsOf<AnimationSettingsSchema<False>>

export {
	AnimationSettings,
	AnimationSettingsFunctions,
	AnimationSettingsSchema,
}
