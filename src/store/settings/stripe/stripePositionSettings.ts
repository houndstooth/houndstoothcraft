// tslint:disable:no-magic-numbers max-file-line-count no-any

import { GetStripePositions, standardStripePositions, StripeCountMode } from '../../../components'
import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../../types'
import { stripeCountContinuumSettings } from './stripePosition'

// Structure

interface StripePositionSettingsStructure {
	getStripePositions: any,
	stripeCount: any,
	stripeCountContinuumSettings: any,
	stripeCountMode: any,
	[_: string]: any,
}

// Type

interface StripePositionSettings extends StripePositionSettingsStructure {
	getStripePositions: GetStripePositions,
	stripeCount: number,
	stripeCountContinuumSettings: Partial<stripeCountContinuumSettings.StripeCountContinuumSettings>,
	stripeCountMode: StripeCountMode,
}

// Functions of

type StripePositionSettingsFunctions = Overwrite<FunctionsOf<StripePositionSettings>, {
	stripeCountContinuumSettings: stripeCountContinuumSettings.StripeCountContinuumSettingsFunctions,
	[_: string]: any,
}>

// Defaults

const DEFAULT_GET_STRIPE_POSITIONS: GetStripePositions = standardStripePositions
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_STRIPE_COUNT_MODE: StripeCountMode = StripeCountMode.Standard

const DEFAULT_STRIPE_POSITION_SETTINGS: StripePositionSettings = {
	getStripePositions: DEFAULT_GET_STRIPE_POSITIONS,
	stripeCount: DEFAULT_STRIPE_COUNT,
	stripeCountContinuumSettings: stripeCountContinuumSettings.DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
}

// Shortcuts

const stripePositionSettings: SettingsPath = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])

const stripePositionSettingsPathShortcuts: StripePositionSettingsStructure = {
	...buildSettingsPathShortcuts({
		basePath: stripePositionSettings,
		settings: DEFAULT_STRIPE_POSITION_SETTINGS,
	}),
	...stripeCountContinuumSettings.stripeCountContinuumSettingsPathShortcuts,
}

// Shortcut types

type StripePositionSettingsPathShortcut = 'stripePositionSettings'

type StripePositionSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	GetStripePositionsPathShortcuts: 'getStripePositions',
	NumberPathShortcuts: 'stripeCount',
	StripeCountModePathShortcuts: 'stripeCountMode',
}> | stripeCountContinuumSettings.StripeCountContinuumSettingsTypePathShortcuts

// Export

export {
	// Type

	StripePositionSettings,

	// Functions of

	StripePositionSettingsFunctions,

	// Defaults

	DEFAULT_STRIPE_POSITION_SETTINGS,

	// Shortcuts

	stripePositionSettings,
	stripePositionSettingsPathShortcuts,

	// Shortcut types

	StripePositionSettingsPathShortcut,
	StripePositionSettingsTypePathShortcuts,
}
