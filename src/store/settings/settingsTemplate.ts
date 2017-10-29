// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

// Structure

interface TemplateSettingsStructure {
	readonly templateSetting: any,
	readonly [_: string]: any,
}

// Type

interface TemplateSettings extends TemplateSettingsStructure {
	readonly templateSetting: string,
}

// Functions of

type TemplateSettingsFunctions = FunctionsOf<TemplateSettings>

// Defaults

const DEFAULT_TEMPLATE_SETTING = ''

const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
	templateSetting: DEFAULT_TEMPLATE_SETTING,
}

// Settings names to paths map

const templateSettings: SettingsPath = to.SettingsPath([ 'templateSettings' ])

const templateSettingsNamesToPathsMap: TemplateSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: templateSettings,
	settings: DEFAULT_TEMPLATE_SETTINGS,
})

// Settings names by type

type TemplateSettingsName = 'templateSettings'

type TemplateSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	AssignmentModeTypedSettingsNames: '_',
	BaseStripeDiagonalTypedSettingsNames: '_',
	BooleanTypedSettingsNames: '_',
	ColorSetTypedSettingsNames: '_',
	ColorsTypedSettingsNames: '_',
	ColorTypedSettingsNames: '_',
	ExecuteTextureTypedSettingsNames: '_',
	FrameTypedSettingsNames: '_',
	GetStripePositionsTypedSettingsNames: '_',
	GetTileOriginAndSizeTypedSettingsNames: '_',
	LayerTypedSettingsNames: '_',
	NumberTypedSettingsNames: '_',
	OffsetAddressTypedSettingsNames: '_',
	PxTypedSettingsNames: '_',
	RadianTypedSettingsNames: '_',
	StripeCountModeTypedSettingsNames: '_',
	SupertileTypedSettingsNames: '_',
	TransformShapeColorIndicesTypedSettingsNames: '_',
	UnitTypedSettingsNames: '_',
	WeaveTypedSettingsNames: '_',
}>

// Export

export {
	// Type

	TemplateSettings,

	// Functions of

	TemplateSettingsFunctions,

	// Defaults

	DEFAULT_TEMPLATE_SETTINGS,

	// Settings names to paths map

	templateSettings,
	templateSettingsNamesToPathsMap,

	// Settings names by type

	TemplateSettingsName,
	TemplateSettingsNamesByType,
}
