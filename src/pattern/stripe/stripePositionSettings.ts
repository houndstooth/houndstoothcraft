// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import * as stripeCountContinuumSettings from './stripeCountContinuumSettings'
import { GetStripePositions, StripeCountMode } from './types'

interface StripePositionSettings {
	readonly getStripePositions: GetStripePositions,
	readonly stripeCount: number,
	readonly stripeCountContinuumSettings: Partial<stripeCountContinuumSettings.StripeCountContinuumSettings>,
	readonly stripeCountMode: StripeCountMode,
	readonly [_: string]: any,
}

type StripePositionSettingsFunctions = Overwrite<FunctionsOf<StripePositionSettings>, {
	stripeCountContinuumSettings: stripeCountContinuumSettings.StripeCountContinuumSettingsFunctions,
	[_: string]: any,
}>

type StripePositionSettingsName = 'stripePositionSettings'

type StripePositionSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	GetStripePositionsTypedSettingsNames: 'getStripePositions',
	NumberTypedSettingsNames: 'stripeCount',
	StripeCountModeTypedSettingsNames: 'stripeCountMode',
}> | stripeCountContinuumSettings.StripeCountContinuumSettingsNamesByType

export {
	StripePositionSettings,
	StripePositionSettingsFunctions,
	StripePositionSettingsName,
	StripePositionSettingsNamesByType,
}
