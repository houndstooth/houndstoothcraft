// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcutsBase } from '../TypePathShortcutsBase'

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

const settingsPathShortcuts: TemplateSettingsStructure = buildSettingsPathShortcuts({
	basePath: templateSettings,
	settings: DEFAULT_TEMPLATE_SETTINGS,
})

// Shortcut types

type TemplateSettingsPathShortcut = 'templateSettings'

type TemplateSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	AssignmentModePathShortcuts: '_'
	BaseStripeDiagonalPathShortcuts: '_'
	BooleanPathShortcuts: '_'
	ColorPathShortcuts: '_'
	ColorSetPathShortcuts: '_'
	ColorsPathShortcuts: '_'
	ExecuteTexturePathShortcuts: '_'
	FramePathShortcuts: '_'
	GetStripePositionsPathShortcuts: '_'
	GetTileOriginAndSizePathShortcuts: '_'
	LayerPathShortcuts: '_'
	NumberPathShortcuts: '_'
	OffsetAddressPathShortcuts: '_'
	PxPathShortcuts: '_'
	RadianPathShortcuts: '_'
	StripeCountModePathShortcuts: '_'
	SupertilePathShortcuts: '_'
	TransformShapeColorIndicesPathShortcuts: '_'
	UnitPathShortcuts: '_'
	WeavePathShortcuts: '_',
}>

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
	TemplateSettingsTypePathShortcuts,
}
