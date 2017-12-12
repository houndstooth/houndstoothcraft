// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'
import { ExecuteTexture } from './types'

interface TextureSettings {
	readonly executeTexture?: ExecuteTexture,
	readonly [_: string]: any,
}

type TextureSettingsFunctions = FunctionsOf<TextureSettings>

type TextureSettingsName = 'textureSettings'

type TextureSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	ExecuteTextureTypedSettingsNames: 'executeTexture',
}>

export {
	TextureSettings,
	TextureSettingsFunctions,
	TextureSettingsName,
	TextureSettingsNamesByType,
}
