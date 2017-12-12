// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../../pattern'

interface TemplateSettings {
	readonly exampleSetting: string,
	readonly [_: string]: any,
}

type TemplateSettingsFunctions = FunctionsOf<TemplateSettings>

const DEFAULT_EXAMPLE_SETTING: string = ''

const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
	exampleSetting: DEFAULT_EXAMPLE_SETTING,
}

type TemplateSettingsName = 'templateSettings'

type TemplateSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	AssignmentModeTypedSettingsNames: '_',
	BaseStripeDiagonalTypedSettingsNames: '_',
	BooleanTypedSettingsNames: '_',
	ColorSetTypedSettingsNames: '_',
	ColorsTypedSettingsNames: '_',
	ColorTypedSettingsNames: '_',
	ExecuteTextureTypedSettingsNames: '_',
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

export {
	TemplateSettings,
	TemplateSettingsFunctions,
	DEFAULT_TEMPLATE_SETTINGS,
	TemplateSettingsName,
	TemplateSettingsNamesByType,
}
