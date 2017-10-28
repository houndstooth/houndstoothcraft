// tslint:disable:no-magic-numbers max-file-line-count no-any

import { Frame } from '../../../animation'
import { FunctionsOf } from '../../../execute'
import * as to from '../../../utilities/to'
import { Overwrite } from '../Overwrite'
import { SettingsPath } from '../SettingsPath'
import { TypePathShortcuts } from '../TypePathShortcuts'

// Structure

interface AnimationSettingsStructure {
	endFrame: any
	frameRate: any
	refreshCanvas: any
	startFrame: any

	[_: string]: any
}

// Type

interface AnimationSettings extends AnimationSettingsStructure {
	endFrame: Frame
	frameRate: number
	refreshCanvas: boolean
	startFrame: Frame
}

// Functions of

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

// Defaults

const DEFAULT_END_FRAME = to.Frame(10000)
const DEFAULT_FRAME_RATE = 1.005
const DEFAULT_REFRESH_CANVAS = true
const DEFAULT_START_FRAME = to.Frame(0)

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	endFrame: DEFAULT_END_FRAME,
	frameRate: DEFAULT_FRAME_RATE,
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
	startFrame: DEFAULT_START_FRAME,
}

// Shortcuts

const animationSettings: SettingsPath = to.SettingsPath([ 'animationSettings' ])

const settingsPathShortcuts: AnimationSettingsStructure = {
	endFrame: to.SettingsPath([ 'animationSettings', 'endFrame' ]),
	frameRate: to.SettingsPath([ 'animationSettings', 'frameRate' ]),
	refreshCanvas: to.SettingsPath([ 'animationSettings', 'refreshCanvas' ]),
	startFrame: to.SettingsPath([ 'animationSettings', 'startFrame' ]),
}

// Shortcut types

type AnimationSettingsPathShortcut = 'animationSettings'

type AnimationSettingsTypePathShortcuts = Overwrite<TypePathShortcuts, {
	BooleanPathShortcuts: 'refreshCanvas'
	FramePathShortcuts: 'startFrame' | 'endFrame'
	NumberPathShortcuts: 'frameRate',
}>

// Export

export {
	// Type

	AnimationSettings,

	// Functions of

	AnimationSettingsFunctions,

	// Defaults

	DEFAULT_ANIMATION_SETTINGS,

	// Shortcuts

	animationSettings,
	settingsPathShortcuts,

	// Shortcut types

	AnimationSettingsPathShortcut,
	AnimationSettingsTypePathShortcuts,
}
