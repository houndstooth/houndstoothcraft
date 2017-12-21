// tslint:disable:no-type-definitions-outside-types-modules

import { Bool, False, FunctionsOf, Rec, True } from '../types'
import { ExecuteTexture } from './types'

// tslint:disable-next-line:no-unused-variable
type TextureSettingsSchema<R extends Bool> =
	Rec<'executeTexture', ExecuteTexture, False>

interface TextureSettings extends TextureSettingsSchema<True>{}

type TextureSettingFunctions = FunctionsOf<TextureSettingsSchema<False>>

export {
	TextureSettings,
	TextureSettingsSchema,
	TextureSettingFunctions,
}
