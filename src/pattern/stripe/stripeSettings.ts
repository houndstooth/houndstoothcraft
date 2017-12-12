// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import * as stripePositionSettings from './stripePositionSettings'
import { BaseStripeDiagonal } from './types'

interface StripeSettings {
	readonly baseStripeDiagonal: BaseStripeDiagonal,
	readonly stripePositionSettings: Partial<stripePositionSettings.StripePositionSettings>,
	readonly [_: string]: any,
}

type StripeSettingsFunctions = Overwrite<FunctionsOf<StripeSettings>, {
	stripePositionSettings: Partial<stripePositionSettings.StripePositionSettingsFunctions>,
	[_: string]: any,
}>

type StripeSettingsName = 'stripeSettings'

type StripeSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BaseStripeDiagonalTypedSettingsNames: 'baseStripeDiagonal',
}> | stripePositionSettings.StripePositionSettingsNamesByType

export {
	StripeSettings,
	StripeSettingsFunctions,
	StripeSettingsName,
	StripeSettingsNamesByType,
}
