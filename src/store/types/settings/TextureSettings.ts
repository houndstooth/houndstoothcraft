// tslint:disable:no-magic-numbers max-file-line-count no-any

import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { buildSettingsPathShortcuts } from '../../buildSettingsPathShortcuts'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcuts } from '../TypePathShortcuts'
import { ExecuteTexture } from '../../../components'

// Structure

interface TextureSettingsStructure {
	executeTexture?: any,
}

// Type

interface TextureSettings extends TextureSettingsStructure {
	executeTexture?: ExecuteTexture,
}

// Functions of

type TextureSettingsFunctions = FunctionsOf<TextureSettings>

// Defaults

const DEFAULT_EXECUTE_TEXTURE: undefined = undefined

const DEFAULT_TEXTURE_SETTINGS: TextureSettings = {
	executeTexture: DEFAULT_EXECUTE_TEXTURE,
}

// Shortcuts

const textureSettings: SettingsPath = to.SettingsPath([ 'textureSettings' ])

const settingsPathShortcuts: TextureSettingsStructure = buildSettingsPathShortcuts({
	basePath: textureSettings,
	settings: DEFAULT_TEXTURE_SETTINGS,
})

// Shortcut types

type TextureSettingsPathShortcut = 'textureSettings'

type TextureSettingsTypePathShortcuts = Overwrite<TypePathShortcuts, {
	ExecuteTexturePathShortcuts: 'executeTexture'
}>

// Export

export {
	// Type

	TextureSettings,

	// Functions of

	TextureSettingsFunctions,

	// Defaults

	DEFAULT_TEXTURE_SETTINGS,

	// Shortcuts

	textureSettings,
	settingsPathShortcuts,

	// Shortcut types

	TextureSettingsPathShortcut,
	TextureSettingsTypePathShortcuts,
}
