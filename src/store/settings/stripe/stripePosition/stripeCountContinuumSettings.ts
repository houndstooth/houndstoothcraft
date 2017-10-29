// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../../../types'

// Structure

interface StripeCountContinuumSettingsStructure {
	readonly deltaStripeCount: any,
	readonly initialStripeCount: any,
	readonly [_: string]: any,
}

// Type

interface StripeCountContinuumSettings extends StripeCountContinuumSettingsStructure {
	readonly deltaStripeCount: number,
	readonly initialStripeCount: number,
}

// Functions of

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettings>

// Defaults

const DEFAULT_DELTA_STRIPE_COUNT = 1
const DEFAULT_INITIAL_STRIPE_COUNT = 1

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}

// Settings names to paths map

const stripeCountContinuumSettings: SettingsPath = to.SettingsPath([
	'stripeSettings',
	'stripePositionSettings',
	'stripeCountContinuumSettings',
])

// tslint:disable-next-line:max-line-length
const stripeCountContinuumSettingsNamesToPathsMap: StripeCountContinuumSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: stripeCountContinuumSettings,
	settings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
})

// Settings names by type

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

type StripeCountContinuumSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	NumberTypedSettingsNames: 'deltaStripeCount' | 'initialStripeCount',
}>

// Export

export {
	// Type

	StripeCountContinuumSettings,

	// Functions of

	StripeCountContinuumSettingsFunctions,

	// Defaults

	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,

	// Settings names to paths map

	stripeCountContinuumSettings,
	stripeCountContinuumSettingsNamesToPathsMap,

	// Settings names by type

	StripeCountContinuumSettingsName,
	StripeCountContinuumSettingsNamesByType,
}
