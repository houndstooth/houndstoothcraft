// tslint:disable:no-magic-numbers no-any

import { Bool, False, FunctionsOf, Overwrite, Rec, True } from '../types'
import { StripePositionSettingsFunctions, StripePositionSettingsSchema } from './stripePositionSettings'
import { BaseStripeDiagonal } from './types'

type StripeSettingsSchema<R extends Bool> =
	Rec<'baseStripeDiagonal', BaseStripeDiagonal, R> &
	Rec<'stripePositionSettings', StripePositionSettingsSchema<R>, R>

interface StripeSettings extends StripeSettingsSchema<True>{}

type StripeSettingsFunctions = Partial<Overwrite<FunctionsOf<StripeSettingsSchema<False>>, {
	stripePositionSettings: StripePositionSettingsFunctions,
}>>

export {
	StripeSettings,
	StripeSettingsSchema,
	StripeSettingsFunctions,
}
