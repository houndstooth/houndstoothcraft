// tslint:disable:no-magic-numbers no-any

import { Frame } from '../../animation'
import { FunctionsOf } from '../../execute'
import * as to from '../../utilities/to'
import { buildSettingsNamesToPathsMap } from '../buildSettingsNamesToPathsMap'
import { Overwrite, SettingsNamesByTypeBase } from '../types'

interface AnimationSettings {
	readonly endFrame: Frame,
	readonly frameRate: number,
	readonly refreshCanvas: boolean,
	readonly startFrame: Frame,
	readonly [_: string]: any,
}

type AnimationSettingsStructure = { readonly [P in keyof AnimationSettings]: any }

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

const DEFAULT_END_FRAME: Frame = to.Frame(10000)
const DEFAULT_FRAME_RATE: number = 1.005
const DEFAULT_REFRESH_CANVAS: boolean = true
const DEFAULT_START_FRAME: Frame = to.Frame(0)

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	endFrame: DEFAULT_END_FRAME,
	frameRate: DEFAULT_FRAME_RATE,
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
	startFrame: DEFAULT_START_FRAME,
}

type AnimationSettingsName = 'animationSettings'

const animationSettingsNamesToPathsMap: AnimationSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'animationSettings' ]),
	settings: DEFAULT_ANIMATION_SETTINGS,
})

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
	FrameTypedSettingsNames: 'startFrame' | 'endFrame',
	NumberTypedSettingsNames: 'frameRate',
}>

export {
	AnimationSettings,
	AnimationSettingsFunctions,
	DEFAULT_ANIMATION_SETTINGS,
	AnimationSettingsName,
	animationSettingsNamesToPathsMap,
	AnimationSettingsNamesByType,
}
