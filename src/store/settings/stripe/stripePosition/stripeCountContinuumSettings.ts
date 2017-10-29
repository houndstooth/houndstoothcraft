// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../../execute'
import * as to from '../../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../../../types'

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

// Shortcuts

const stripeCountContinuumSettings: SettingsPath = to.SettingsPath([
	'stripeSettings',
	'stripePositionSettings',
	'stripeCountContinuumSettings',
])

const stripeCountContinuumSettingsPathShortcuts: StripeCountContinuumSettingsStructure = buildSettingsPathShortcuts({
	basePath: stripeCountContinuumSettings,
	settings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
})

// Shortcut types

type StripeCountContinuumSettingsPathShortcut = 'stripeCountContinuumSettings'

type StripeCountContinuumSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	NumberPathShortcuts: 'deltaStripeCount' | 'initialStripeCount',
}>

// Export

export {
	// Type

	StripeCountContinuumSettings,

	// Functions of

	StripeCountContinuumSettingsFunctions,

	// Defaults

	DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,

	// Shortcuts

	stripeCountContinuumSettings,
	stripeCountContinuumSettingsPathShortcuts,

	// Shortcut types

	StripeCountContinuumSettingsPathShortcut,
	StripeCountContinuumSettingsTypePathShortcuts,
}
