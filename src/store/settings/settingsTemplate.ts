// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface TemplateSettingsStructure {
	readonly templateSetting: any,
	readonly [_: string]: any,
}

interface TemplateSettings extends TemplateSettingsStructure {
	readonly templateSetting: string,
}

type TemplateSettingsFunctions = FunctionsOf<TemplateSettings>

const DEFAULT_TEMPLATE_SETTING = ''

const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
	templateSetting: DEFAULT_TEMPLATE_SETTING,
}

type TemplateSettingsName = 'templateSettings'

const templateSettingsNamesToPathsMap: TemplateSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'templateSettings' ]),
	settings: DEFAULT_TEMPLATE_SETTINGS,
})

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

export {
	TemplateSettings,
	TemplateSettingsFunctions,
	DEFAULT_TEMPLATE_SETTINGS,
	TemplateSettingsName,
	templateSettingsNamesToPathsMap,
	TemplateSettingsNamesByType,
}
