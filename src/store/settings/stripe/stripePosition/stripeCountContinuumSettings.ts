// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../../../types'

interface StripeCountContinuumSettings {
	readonly deltaStripeCount: number,
	readonly initialStripeCount: number,
	readonly [_: string]: any,
}

type StripeCountContinuumSettingsStructure = { readonly [P in keyof StripeCountContinuumSettings]: any }

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettings>

const DEFAULT_DELTA_STRIPE_COUNT = 1
const DEFAULT_INITIAL_STRIPE_COUNT = 1

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

// tslint:disable-next-line:max-line-length
const stripeCountContinuumSettingsNamesToPathsMap: StripeCountContinuumSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([
		'stripeSettings',
		'stripePositionSettings',
		'stripeCountContinuumSettings',
	]),
	settings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
})

type StripeCountContinuumSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	NumberTypedSettingsNames: 'deltaStripeCount' | 'initialStripeCount',
}>

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsFunctions,
	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	StripeCountContinuumSettingsName,
	stripeCountContinuumSettingsNamesToPathsMap,
	StripeCountContinuumSettingsNamesByType,
}