// tslint:disable:no-type-definitions-outside-types-modules

import { Bool, False, FunctionsOf, Rec, True } from '../types'

type StripeCountContinuumSettingsSchema<R extends Bool> =
	Rec<'deltaStripeCount', number, R> &
	Rec<'initialStripeCount', number, R>

interface StripeCountContinuumSettings extends StripeCountContinuumSettingsSchema<True>{}

type StripeCountContinuumSettingFunctions = FunctionsOf<StripeCountContinuumSettingsSchema<False>>

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsSchema,
	StripeCountContinuumSettingFunctions,
}
