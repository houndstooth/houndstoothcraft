// tslint:disable:no-magic-numbers no-any

import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'
import { StripePositionSettingFunctions, StripePositionSettingsSchema } from './stripePositionSettings'
import { BaseStripeDiagonal } from './types'

type StripeSettingsSchema<R extends Bool> =
	Rec<'baseStripeDiagonal', BaseStripeDiagonal, R> &
	Rec<'stripePositionSettings', StripePositionSettingsSchema<R>, R>

interface StripeSettings extends StripeSettingsSchema<True>{}

type StripeSettingFunctions = Partial<Overwrite<FunctionsOf<StripeSettingsSchema<False>>, {
	stripePositionSettings: StripePositionSettingFunctions,
}>>

export {
	StripeSettings,
	StripeSettingsSchema,
	StripeSettingFunctions,
}
