// tslint:disable:no-magic-numbers no-any

import { SettingsNamesByTypeBase } from '../../pattern'
import * as to from '../../to'
import { FunctionsOf } from '../execute'
import buildSettingsNamesToPathsMap from './buildSettingsNamesToPathsMap'
import { Overwrite } from './types'

interface TemplateSettings {
	readonly exampleSetting: string,
	readonly [_: string]: any,
}

type TemplateSettingsStructure = { readonly [P in keyof TemplateSettings]: any }

type TemplateSettingsFunctions = FunctionsOf<TemplateSettings>

const DEFAULT_EXAMPLE_SETTING: string = ''

const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
	exampleSetting: DEFAULT_EXAMPLE_SETTING,
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
