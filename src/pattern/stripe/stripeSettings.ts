// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import buildSettingsNamesToPathsMap from '../../app/settings/buildSettingsNamesToPathsMap'
import * as to from '../../to'
import { SettingsNamesByTypeBase } from '../types'
import * as stripePositionSettings from './stripePositionSettings'
import { BaseStripeDiagonal } from './types'

interface StripeSettings {
	readonly baseStripeDiagonal: BaseStripeDiagonal,
	readonly stripePositionSettings: Partial<stripePositionSettings.StripePositionSettings>,
	readonly [_: string]: any,
}

type StripeSettingsStructure = { readonly [P in keyof StripeSettings]: any }

type StripeSettingsFunctions = Overwrite<FunctionsOf<StripeSettings>, {
	stripePositionSettings: Partial<stripePositionSettings.StripePositionSettingsFunctions>,
	[_: string]: any,
}>

const DEFAULT_BASE_STRIPE_DIAGONAL: BaseStripeDiagonal = BaseStripeDiagonal.Minor

const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: stripePositionSettings.DEFAULT_STRIPE_POSITION_SETTINGS,
}

type StripeSettingsName = 'stripeSettings'

const stripeSettingsNamesToPathsMap: StripeSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: to.SettingsPath([ 'stripeSettings' ]),
		settings: DEFAULT_STRIPE_SETTINGS,
	}),
	...stripePositionSettings.stripePositionSettingsNamesToPathsMap,
}

type StripeSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BaseStripeDiagonalTypedSettingsNames: 'baseStripeDiagonal',
}> | stripePositionSettings.StripePositionSettingsNamesByType

export {
	StripeSettings,
	StripeSettingsFunctions,
	DEFAULT_STRIPE_SETTINGS,
	StripeSettingsName,
	stripeSettingsNamesToPathsMap,
	StripeSettingsNamesByType,
}
