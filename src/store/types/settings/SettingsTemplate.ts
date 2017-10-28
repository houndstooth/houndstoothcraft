// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { SettingsPath } from '../SettingsPath'

// Structure

interface TemplateSettingsStructure {
	templateSetting: any,

	[_: string]: any
}

// Type

interface TemplateSettings extends TemplateSettingsStructure {
	templateSetting: string,
}

// Functions of

type TemplateSettingsFunctions = FunctionsOf<TemplateSettings>

// Defaults

const DEFAULT_TEMPLATE_SETTING = ''

const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
	templateSetting: DEFAULT_TEMPLATE_SETTING,
}

// Shortcuts

const templateSettings: SettingsPath = to.SettingsPath([ 'templateSettings' ])

const settingsPathShortcuts: TemplateSettingsStructure = {
	templateSetting: to.SettingsPath([ 'templateSettings', 'templateSetting' ]),
}

// Shortcut types

type TemplateSettingsPathShortcut = 'templateSettings'

namespace TypePathShortcuts {
	export type BooleanPathShortcuts = '_'
	export type ColorPathShortcuts = '_'
	export type ColorsPathShortcuts = '_'
	export type ColorSetPathShortcuts = '_'
	export type ExecuteTexturePathShortcuts = '_'
	export type FramePathShortcuts = '_'
	export type GetTileOriginAndSizePathShortcuts = '_'
	export type LayerPathShortcuts = '_'
	export type NumberPathShortcuts = '_'
	export type PxPathShortcuts = '_'
	export type RadianPathShortcuts = '_'
	export type UnitPathShortcuts = '_'
}

// Export

export {
	// Type

	TemplateSettings,

	// Functions of

	TemplateSettingsFunctions,

	// Defaults

	DEFAULT_TEMPLATE_SETTINGS,

	// Shortcuts

	templateSettings,
	settingsPathShortcuts,

	// Shortcut types

	TemplateSettingsPathShortcut,
	TypePathShortcuts,
}
