// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import { ExecuteTexture } from './types'

interface TextureSettings {
	readonly executeTexture?: ExecuteTexture,
	readonly [_: string]: any,
}

type TextureSettingsFunctions = FunctionsOf<TextureSettings>

const DEFAULT_EXECUTE_TEXTURE: undefined = undefined

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	executeTexture: DEFAULT_EXECUTE_TEXTURE,
}

type TextureSettingsName = 'textureSettings'

type TextureSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ExecuteTextureTypedSettingsNames: 'executeTexture',
}>

export {
	TextureSettings,
	TextureSettingsFunctions,
	DEFAULT_TEXTURE_SETTINGS,
	TextureSettingsName,
	TextureSettingsNamesByType,
}
