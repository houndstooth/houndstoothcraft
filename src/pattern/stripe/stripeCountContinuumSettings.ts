// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface StripeCountContinuumSettings {
	readonly deltaStripeCount: number,
	readonly initialStripeCount: number,
	readonly [_: string]: any,
}

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettings>

const DEFAULT_DELTA_STRIPE_COUNT: number = 1
const DEFAULT_INITIAL_STRIPE_COUNT: number = 1

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

type StripeCountContinuumSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	NumberTypedSettingsNames: 'deltaStripeCount' | 'initialStripeCount',
}>

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsFunctions,
	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	StripeCountContinuumSettingsName,
	StripeCountContinuumSettingsNamesByType,
}
