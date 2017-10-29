// tslint:disable:no-magic-numbers max-file-line-count no-any

import { Frame } from '../../animation'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase, SettingsPath } from '../types'

// Structure

interface AnimationSettingsStructure {
	readonly endFrame: any,
	readonly frameRate: any,
	readonly refreshCanvas: any,
	readonly startFrame: any,
	readonly [_: string]: any,
}

// Type

interface AnimationSettings extends AnimationSettingsStructure {
	readonly endFrame: Frame,
	readonly frameRate: number,
	readonly refreshCanvas: boolean,
	readonly startFrame: Frame,
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

// Settings names to paths map

const animationSettings: SettingsPath = to.SettingsPath([ 'animationSettings' ])

const animationSettingsNamesToPathsMap: AnimationSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: animationSettings,
	settings: DEFAULT_ANIMATION_SETTINGS,
})

// Settings names by type

type AnimationSettingsName = 'animationSettings'

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
	FrameTypedSettingsNames: 'startFrame' | 'endFrame',
	NumberTypedSettingsNames: 'frameRate',
}>

// Export

export {
	// Type

	AnimationSettings,

	// Functions of

	AnimationSettingsFunctions,

	// Defaults

	DEFAULT_ANIMATION_SETTINGS,

	// Settings names to paths map

	animationSettings,
	animationSettingsNamesToPathsMap,

	// Settings names by type

	AnimationSettingsName,
	AnimationSettingsNamesByType,
}
