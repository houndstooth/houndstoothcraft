// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import { Layer } from './types'

interface LayerSettings {
	readonly endLayer: Layer,
	readonly [_: string]: any,
}

type LayerSettingsFunctions = FunctionsOf<LayerSettings>

type LayerSettingsName = 'layerSettings'

type LayerSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	LayerTypedSettingsNames: 'endLayer',
}>

export {
	LayerSettings,
	LayerSettingsFunctions,
	LayerSettingsName,
	LayerSettingsNamesByType,
}
