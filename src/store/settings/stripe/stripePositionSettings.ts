// tslint:disable:no-magic-numbers max-file-line-count no-any

import { GetStripePositions, standardStripePositions, StripeCountMode } from '../../../components'
import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../../types'
import { stripeCountContinuumSettings } from './stripePosition'

interface StripePositionSettingsStructure {
	readonly getStripePositions: any,
	readonly stripeCount: any,
	readonly stripeCountContinuumSettings: any,
	readonly stripeCountMode: any,
	readonly [_: string]: any,
}

interface StripePositionSettings extends StripePositionSettingsStructure {
	readonly getStripePositions: GetStripePositions,
	readonly stripeCount: number,
	readonly stripeCountContinuumSettings: Partial<stripeCountContinuumSettings.StripeCountContinuumSettings>,
	readonly stripeCountMode: StripeCountMode,
}

type StripePositionSettingsFunctions = Overwrite<FunctionsOf<StripePositionSettings>, {
	stripeCountContinuumSettings: stripeCountContinuumSettings.StripeCountContinuumSettingsFunctions,
	[_: string]: any,
}>

const DEFAULT_GET_STRIPE_POSITIONS: GetStripePositions = standardStripePositions
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_STRIPE_COUNT_MODE: StripeCountMode = StripeCountMode.Standard

const DEFAULT_STRIPE_POSITION_SETTINGS: StripePositionSettings = {
	getStripePositions: DEFAULT_GET_STRIPE_POSITIONS,
	stripeCount: DEFAULT_STRIPE_COUNT,
	stripeCountContinuumSettings: stripeCountContinuumSettings.DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
}

type StripePositionSettingsName = 'stripePositionSettings'

const stripePositionSettingsNamesToPathsMap: StripePositionSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ]),
		settings: DEFAULT_STRIPE_POSITION_SETTINGS,
	}),
	...stripeCountContinuumSettings.stripeCountContinuumSettingsNamesToPathsMap,
}

type StripePositionSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	GetStripePositionsTypedSettingsNames: 'getStripePositions',
	NumberTypedSettingsNames: 'stripeCount',
	StripeCountModeTypedSettingsNames: 'stripeCountMode',
}> | stripeCountContinuumSettings.StripeCountContinuumSettingsNamesByType

export {
	StripePositionSettings,
	StripePositionSettingsFunctions,
	DEFAULT_STRIPE_POSITION_SETTINGS,
	StripePositionSettingsName,
	stripePositionSettingsNamesToPathsMap,
	StripePositionSettingsNamesByType,
}
