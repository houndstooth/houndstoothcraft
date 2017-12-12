// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface StripeCountContinuumSettings {
	readonly deltaStripeCount: number,
	readonly initialStripeCount: number,
	readonly [_: string]: any,
}

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettings>

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

type StripeCountContinuumSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	NumberTypedSettingsNames: 'deltaStripeCount' | 'initialStripeCount',
}>

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsFunctions,
	StripeCountContinuumSettingsName,
	StripeCountContinuumSettingsNamesByType,
}
