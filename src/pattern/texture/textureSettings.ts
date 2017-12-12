import { Bool, False, FunctionsOf, Rec, True } from '../types'
import { ExecuteTexture } from './types'

type TextureSettingsSchema<R extends Bool> =
	Rec<'executeTexture', ExecuteTexture, False>

interface TextureSettings extends TextureSettingsSchema<True>{}

type TextureSettingsFunctions = FunctionsOf<TextureSettingsSchema<False>>

export {
	TextureSettings,
	TextureSettingsSchema,
	TextureSettingsFunctions,
}
