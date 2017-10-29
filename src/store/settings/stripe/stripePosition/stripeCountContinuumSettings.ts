// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../../../types'

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

// Settings name

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

// Settings names to paths map

// tslint:disable-next-line:max-line-length
const stripeCountContinuumSettingsNamesToPathsMap: StripeCountContinuumSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([
		'stripeSettings',
		'stripePositionSettings',
		'stripeCountContinuumSettings',
	]),
	settings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
})

// Settings names by type

type StripeCountContinuumSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	NumberTypedSettingsNames: 'deltaStripeCount' | 'initialStripeCount',
}>

// Export

export {
	StripeCountContinuumSettings,
	StripeCountContinuumSettingsFunctions,
	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	StripeCountContinuumSettingsName,
	stripeCountContinuumSettingsNamesToPathsMap,
	StripeCountContinuumSettingsNamesByType,
}
