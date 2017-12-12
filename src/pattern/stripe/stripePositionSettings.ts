import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'
import {
	StripeCountContinuumSettingsFunctions,
	StripeCountContinuumSettingsSchema,
} from './stripeCountContinuumSettings'
import { GetStripePositions, StripeCountMode } from './types'

type StripePositionSettingsSchema<R extends Bool> =
	Rec<'getStripePositions', GetStripePositions, R> &
	Rec<'stripeCount', number, R> &
	Rec<'stripeCountContinuumSettings', StripeCountContinuumSettingsSchema<R>, R> &
	Rec<'stripeCountMode', StripeCountMode, R>

interface StripePositionSettings extends StripePositionSettingsSchema<True>{}

type StripePositionSettingsFunctions = Partial<Overwrite<FunctionsOf<StripePositionSettingsSchema<False>>, {
	stripeCountContinuumSettings: StripeCountContinuumSettingsFunctions,
}>>

export {
	StripePositionSettings,
	StripePositionSettingsSchema,
	StripePositionSettingsFunctions,
}
