// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ExecuteTexture } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

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

// Settings name

type TextureSettingsName = 'textureSettings'

// Settings names to paths map

const textureSettingsNamesToPathsMap: TextureSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'textureSettings' ]),
	settings: DEFAULT_TEXTURE_SETTINGS,
})

// Settings names by type

type TextureSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ExecuteTextureTypedSettingsNames: 'executeTexture',
}>

// Export

export {
	TextureSettings,
	TextureSettingsFunctions,
	DEFAULT_TEXTURE_SETTINGS,
	TextureSettingsName,
	textureSettingsNamesToPathsMap,
	TextureSettingsNamesByType,
}
