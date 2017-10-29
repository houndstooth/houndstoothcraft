// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ExecuteTexture } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

// Structure

interface TextureSettingsStructure {
	readonly executeTexture?: any,
	readonly [_: string]: any,
}

// Type

interface TextureSettings extends TextureSettingsStructure {
	readonly executeTexture?: ExecuteTexture,
}

// Functions of

type TextureSettingsFunctions = FunctionsOf<TextureSettings>

// Defaults

const DEFAULT_EXECUTE_TEXTURE: undefined = undefined

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	executeTexture: DEFAULT_EXECUTE_TEXTURE,
}

// Settings names to paths map

const textureSettings: SettingsPath = to.SettingsPath([ 'textureSettings' ])

const textureSettingsNamesToPathsMap: TextureSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: textureSettings,
	settings: DEFAULT_TEXTURE_SETTINGS,
})

// Settings names by type

type TextureSettingsName = 'textureSettings'

type TextureSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ExecuteTextureTypedSettingsNames: 'executeTexture',
}>

// Export

export {
	// Type

	TextureSettings,

	// Functions of

	TextureSettingsFunctions,

	// Defaults

	DEFAULT_TEXTURE_SETTINGS,

	// Settings names to paths map

	textureSettings,
	textureSettingsNamesToPathsMap,

	// Settings names by type

	TextureSettingsName,
	TextureSettingsNamesByType,
}
