// tslint:disable:no-magic-numbers max-file-line-count no-any

import { BaseStripeDiagonal } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'
import { stripePositionSettings } from './stripe'

// Structure

interface StripeSettingsStructure {
	readonly baseStripeDiagonal: any,
	readonly stripePositionSettings: any,
	readonly [_: string]: any,
}

// Type

interface StripeSettings extends StripeSettingsStructure {
	readonly baseStripeDiagonal: BaseStripeDiagonal,
	readonly stripePositionSettings: Partial<stripePositionSettings.StripePositionSettings>,
}

// Functions of

type StripeSettingsFunctions = Overwrite<FunctionsOf<StripeSettings>, {
	stripePositionSettings: Partial<stripePositionSettings.StripePositionSettingsFunctions>,
	[_: string]: any,
}>

// Defaults

const DEFAULT_BASE_STRIPE_DIAGONAL: BaseStripeDiagonal = BaseStripeDiagonal.Minor

const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: stripePositionSettings.DEFAULT_STRIPE_POSITION_SETTINGS,
}

// Settings name

type StripeSettingsName = 'stripeSettings'

// Settings names to paths map

const stripeSettingsNamesToPathsMap: StripeSettingsStructure = {
	...buildSettingsNamesToPathsMap({
		basePath: to.SettingsPath([ 'stripeSettings' ]),
		settings: DEFAULT_STRIPE_SETTINGS,
	}),
	...stripePositionSettings.stripePositionSettingsNamesToPathsMap,
}

// Settings names by type

type StripeSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BaseStripeDiagonalTypedSettingsNames: 'baseStripeDiagonal',
}> | stripePositionSettings.StripePositionSettingsNamesByType

// Export

export {
	StripeSettings,
	StripeSettingsFunctions,
	DEFAULT_STRIPE_SETTINGS,
	StripeSettingsName,
	stripeSettingsNamesToPathsMap,
	StripeSettingsNamesByType,
}
