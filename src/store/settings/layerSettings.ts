// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import { Layer } from '../../execute/types'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

// Structure

interface LayerSettingsStructure {
	readonly endLayer: any,
	readonly startLayer: any,
	readonly [_: string]: any,
}

// Type

interface LayerSettings extends LayerSettingsStructure {
	readonly endLayer: Layer,
	readonly startLayer: Layer,
}

// Functions of

type LayerSettingsFunctions = FunctionsOf<LayerSettings>

// Defaults

const DEFAULT_START_LAYER: Layer = to.Layer(0)
const DEFAULT_END_LAYER: Layer = to.Layer(0)

const DEFAULT_LAYER_SETTINGS: LayerSettings = {
	endLayer: DEFAULT_END_LAYER,
	startLayer: DEFAULT_START_LAYER,
}

// Settings names to paths map

const layerSettings: SettingsPath = to.SettingsPath([ 'layerSettings' ])

const layerSettingsNamesToPathsMap: LayerSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: layerSettings,
	settings: DEFAULT_LAYER_SETTINGS,
})

// Settings names by type

type LayerSettingsName = 'layerSettings'

type LayerSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	LayerTypedSettingsNames: 'startLayer' | 'endLayer',
}>

// Export

export {
	// Type

	LayerSettings,

	// Functions of

	LayerSettingsFunctions,

	// Defaults

	DEFAULT_LAYER_SETTINGS,

	// Settings names to paths map

	layerSettings,
	layerSettingsNamesToPathsMap,

	// Settings names by type

	LayerSettingsName,
	LayerSettingsNamesByType,
}
