// tslint:disable:no-magic-numbers max-file-line-count no-any

import { BaseStripeDiagonal } from '../../../components'
import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcutsBase } from '../TypePathShortcutsBase'
import { StripePositionSettings } from './stripe'
import {
	DEFAULT_STRIPE_POSITION_SETTINGS,
	settingsPathShortcuts as stripePositionSettingsPathShortcuts,
	StripeCountContinuumSettingsPathShortcut,
	StripePositionSettingsFunctions,
	StripePositionSettingsPathShortcut,
	StripePositionSettingsTypePathShortcuts,
} from './stripe/StripePositionSettings'

// Structure

interface StripeSettingsStructure {
	baseStripeDiagonal: any,
	stripePositionSettings: any,
}

// Type

interface StripeSettings extends StripeSettingsStructure {
	baseStripeDiagonal: BaseStripeDiagonal,
	stripePositionSettings: Partial<StripePositionSettings>,
}

// Functions of

type StripeSettingsFunctions = Overwrite<FunctionsOf<StripeSettings>, {
	stripePositionSettings: Partial<StripePositionSettingsFunctions>,
}>

// Defaults

const DEFAULT_BASE_STRIPE_DIAGONAL: BaseStripeDiagonal = BaseStripeDiagonal.Minor

const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: DEFAULT_STRIPE_POSITION_SETTINGS,
}

// Shortcuts

const stripeSettings: SettingsPath = to.SettingsPath([ 'stripeSettings' ])

const settingsPathShortcuts: StripeSettingsStructure = {
	...buildSettingsPathShortcuts({
		basePath: stripeSettings,
		settings: DEFAULT_STRIPE_SETTINGS,
	}),
	...stripePositionSettingsPathShortcuts,
}

// Shortcut types

type StripeSettingsPathShortcut = 'stripeSettings'

type StripeSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	BaseStripeDiagonalPathShortcuts: 'baseStripeDiagonal',
}> | StripePositionSettingsTypePathShortcuts

// Export

export {
	// Type

	StripeSettings,

	// Functions of

	StripeSettingsFunctions,

	// Defaults

	DEFAULT_STRIPE_SETTINGS,

	// Shortcuts

	stripeSettings,
	settingsPathShortcuts,

	// Shortcut types

	StripeSettingsPathShortcut,
	StripeSettingsTypePathShortcuts,
	StripePositionSettingsPathShortcut,
	StripeCountContinuumSettingsPathShortcut,
}
