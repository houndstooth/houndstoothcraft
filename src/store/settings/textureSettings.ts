// tslint:disable:no-magic-numbers max-file-line-count no-any

import { ExecuteTexture } from '../../components'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsPathShortcuts } from '../buildSettingsPathShortcuts'
import { Overwrite, SettingsPath, TypePathShortcutsBase } from '../types'

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

// Shortcuts

const textureSettings: SettingsPath = to.SettingsPath([ 'textureSettings' ])

const textureSettingsPathShortcuts: TextureSettingsStructure = buildSettingsPathShortcuts({
	basePath: textureSettings,
	settings: DEFAULT_TEXTURE_SETTINGS,
})

// Shortcut types

type TextureSettingsPathShortcut = 'textureSettings'

type TextureSettingsTypePathShortcuts = Overwrite<TypePathShortcutsBase, {
	ExecuteTexturePathShortcuts: 'executeTexture',
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
	textureSettingsPathShortcuts,

	// Shortcut types

	TextureSettingsPathShortcut,
	TextureSettingsTypePathShortcuts,
}
