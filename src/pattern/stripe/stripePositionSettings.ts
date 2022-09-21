// tslint:disable:no-type-definitions-outside-types-modules

import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'

import {
	StripeCountContinuumSettingFunctions,
	StripeCountContinuumSettingsSchema,
} from './stripeCountContinuumSettings'
import { GetStripePositions, StripeCountMode } from './types'

type StripePositionSettingsSchema<R extends Bool> =
	Rec<'getStripePositions', GetStripePositions, R> &
	Rec<'stripeCount', number, R> &
	Rec<'stripeCountContinuumSettings', StripeCountContinuumSettingsSchema<R>, R> &
	Rec<'stripeCountMode', StripeCountMode, R>

interface StripePositionSettings extends StripePositionSettingsSchema<True>{}

type StripePositionSettingFunctions = Partial<Overwrite<FunctionsOf<StripePositionSettingsSchema<False>>, {
	stripeCountContinuumSettings: StripeCountContinuumSettingFunctions,
}>>

export {
	StripePositionSettings,
	StripePositionSettingsSchema,
	StripePositionSettingFunctions,
}
