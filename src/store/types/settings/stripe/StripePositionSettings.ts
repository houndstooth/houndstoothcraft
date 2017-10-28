// tslint:disable:no-magic-numbers max-file-line-count no-any

import { GetStripePositions, StripeCountMode } from '../../../../components'
import { standardStripePositions } from '../../../../components/standardStripePositions'
import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../../buildSettingsPathShortcuts'
import { Overwrite } from '../../Overwrite'
import { SettingsPath } from '../../SettingsPath'
import { TypePathShortcuts } from '../../TypePathShortcuts'
import { StripeCountContinuumSettings } from './stripePosition'
import {
	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	settingsPathShortcuts as stripeCountContinuumSettingsPathShortcuts,
	StripeCountContinuumSettingsFunctions,
	StripeCountContinuumSettingsPathShortcut,
	StripeCountContinuumSettingsTypePathShortcuts,
} from './stripePosition/StripeCountContinuumSettings'

// Structure

interface StripePositionSettingsStructure {
	getStripePositions: any,
	stripeCount: any,
	stripeCountContinuumSettings: any,
	stripeCountMode: any,
}

// Type

interface StripePositionSettings extends StripePositionSettingsStructure {
	getStripePositions: GetStripePositions,
	stripeCount: number,
	stripeCountContinuumSettings: Partial<StripeCountContinuumSettings>,
	stripeCountMode: StripeCountMode,
}

// Functions of

type StripePositionSettingsFunctions = Overwrite<FunctionsOf<StripePositionSettings>, {
	stripeCountContinuumSettings: StripeCountContinuumSettingsFunctions,
}>

// Defaults

const DEFAULT_GET_STRIPE_POSITIONS: GetStripePositions = standardStripePositions
const DEFAULT_STRIPE_COUNT = 4
const DEFAULT_STRIPE_COUNT_MODE: StripeCountMode = StripeCountMode.Standard

const DEFAULT_STRIPE_POSITION_SETTINGS: StripePositionSettings = {
	getStripePositions: DEFAULT_GET_STRIPE_POSITIONS,
	stripeCount: DEFAULT_STRIPE_COUNT,
	stripeCountContinuumSettings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
}

// Shortcuts

const stripePositionSettings: SettingsPath = to.SettingsPath([ 'stripeSettings', 'stripePositionSettings' ])

const settingsPathShortcuts: StripePositionSettingsStructure = {
	...buildSettingsPathShortcuts({
		basePath: stripePositionSettings,
		settings: DEFAULT_STRIPE_POSITION_SETTINGS,
	}),
	...stripeCountContinuumSettingsPathShortcuts,
}

// Shortcut types

type StripePositionSettingsPathShortcut = 'stripePositionSettings'

type StripePositionSettingsTypePathShortcuts = Overwrite<TypePathShortcuts, {
	GetStripePositionsPathShortcuts: 'getStripePositions'
	NumberPathShortcuts: 'stripeCount'
	StripeCountModePathShortcuts: 'stripeCountMode',
}> | StripeCountContinuumSettingsTypePathShortcuts

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
	settingsPathShortcuts,

	// Shortcut types

	StripePositionSettingsPathShortcut,
	StripePositionSettingsTypePathShortcuts,
	StripeCountContinuumSettingsPathShortcut,
}
