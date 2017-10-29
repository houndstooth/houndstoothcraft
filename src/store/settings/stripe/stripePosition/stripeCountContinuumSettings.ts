// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../../../types'

interface StripeCountContinuumSettingsStructure {
	readonly deltaStripeCount: any,
	readonly initialStripeCount: any,
	readonly [_: string]: any,
}

interface StripeCountContinuumSettings extends StripeCountContinuumSettingsStructure {
	readonly deltaStripeCount: number,
	readonly initialStripeCount: number,
}

type StripeCountContinuumSettingsFunctions = FunctionsOf<StripeCountContinuumSettings>

const DEFAULT_DELTA_STRIPE_COUNT = 1
const DEFAULT_INITIAL_STRIPE_COUNT = 1

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}

type StripeCountContinuumSettingsName = 'stripeCountContinuumSettings'

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
