// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
import { to } from '../../utilities'
import { SettingsNamesByTypeBase } from '../types'
import { Layer } from './types'

interface LayerSettings {
	readonly endLayer: Layer,
	readonly [_: string]: any,
}

type LayerSettingsFunctions = FunctionsOf<LayerSettings>

const DEFAULT_END_LAYER: Layer = to.Layer(0)

const DEFAULT_LAYER_SETTINGS: LayerSettings = {
	endLayer: DEFAULT_END_LAYER,
}

type LayerSettingsName = 'layerSettings'

type LayerSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	LayerTypedSettingsNames: 'endLayer',
}>

export {
	LayerSettings,
	LayerSettingsFunctions,
	DEFAULT_LAYER_SETTINGS,
	LayerSettingsName,
	LayerSettingsNamesByType,
}
