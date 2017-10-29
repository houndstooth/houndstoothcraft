// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../execute'
import { Layer } from '../../execute/types'
import * as to from '../../utilities/to'
import { buildSettingsPathShortcuts } from '../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../types'

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

// Shortcuts

const layerSettings: SettingsPath = to.SettingsPath([ 'layerSettings' ])

const layerSettingsPathShortcuts: LayerSettingsStructure = buildSettingsPathShortcuts({
	basePath: layerSettings,
	settings: DEFAULT_LAYER_SETTINGS,
})

// Shortcut types

type LayerSettingsPathShortcut = 'layerSettings'

type LayerSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	LayerPathShortcuts: 'startLayer' | 'endLayer',
}>

// Export

export {
	// Type

	LayerSettings,

	// Functions of

	LayerSettingsFunctions,

	// Defaults

	DEFAULT_LAYER_SETTINGS,

	// Shortcuts

	layerSettings,
	layerSettingsPathShortcuts,

	// Shortcut types

	LayerSettingsPathShortcut,
	LayerSettingsTypePathShortcuts,
}
