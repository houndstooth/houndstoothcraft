import { Bool, False, FunctionsOf, Rec, True } from '../types'

type StripeCountContinuumSettingsSchema<R extends Bool> =
	Rec<'deltaStripeCount', number, R> &
	Rec<'initialStripeCount', number, R>

interface StripeCountContinuumSettings extends StripeCountContinuumSettingsSchema<True>{}

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettingsSchema<False>>

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsSchema,
	StripeCountContinuumSettingsFunctions,
}
