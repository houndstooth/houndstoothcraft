// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import buildSettingsNamesToPathsMap from '../../app/store/buildSettingsNamesToPathsMap'
import * as to from '../../to'
import { SettingsNamesByTypeBase } from '../types'
import { Frame } from './types'

interface AnimationSettings {
	readonly endFrame: Frame,
	readonly frameRate: number,
	readonly refreshCanvas: boolean,
	readonly [_: string]: any,
}

type AnimationSettingsStructure = { readonly [P in keyof AnimationSettings]: any }

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

const DEFAULT_END_FRAME: Frame = to.Frame(10000)
const DEFAULT_FRAME_RATE: number = 30
const DEFAULT_REFRESH_CANVAS: boolean = true

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	endFrame: DEFAULT_END_FRAME,
	frameRate: DEFAULT_FRAME_RATE,
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
}

type AnimationSettingsName = 'animationSettings'

const animationSettingsNamesToPathsMap: AnimationSettingsStructure = buildSettingsNamesToPathsMap({
	basePath: to.SettingsPath([ 'animationSettings' ]),
	settings: DEFAULT_ANIMATION_SETTINGS,
})

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
	FrameTypedSettingsNames: 'endFrame',
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
