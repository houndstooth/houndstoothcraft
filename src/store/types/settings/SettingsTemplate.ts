// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { SettingsPath } from '../SettingsPath'

// Structure

interface TemplateSettingsStructure {
	templateSetting: any,
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

type BooleanPathShortcuts = '_'
type ColorPathShortcuts = '_'
type ColorsPathShortcuts = '_'
type ColorSetPathShortcuts = '_'
type ExecuteTexturePathShortcuts = '_'
type FramePathShortcuts = '_'
type GetTileOriginAndSizePathShortcuts = '_'
type LayerPathShortcuts = '_'
type NumberPathShortcuts = '_'
type PxPathShortcuts = '_'
type RadianPathShortcuts = '_'
type UnitPathShortcuts = '_'

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
	BooleanPathShortcuts,
	ColorPathShortcuts,
	ColorsPathShortcuts,
	ColorSetPathShortcuts,
	ExecuteTexturePathShortcuts,
	FramePathShortcuts,
	GetTileOriginAndSizePathShortcuts,
	LayerPathShortcuts,
	NumberPathShortcuts,
	PxPathShortcuts,
	RadianPathShortcuts,
	UnitPathShortcuts,
}
