// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite } from '../../app'
import { SettingsNamesByTypeBase } from '../types'

interface AnimationSettings {
	readonly frameRate: number,
	readonly refreshCanvas: boolean,
	readonly [_: string]: any,
}

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

const DEFAULT_FRAME_RATE: number = 30
const DEFAULT_REFRESH_CANVAS: boolean = true

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	frameRate: DEFAULT_FRAME_RATE,
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
}

type AnimationSettingsName = 'animationSettings'

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
	NumberTypedSettingsNames: 'frameRate',
}>

export {
	AnimationSettings,
	AnimationSettingsFunctions,
	DEFAULT_ANIMATION_SETTINGS,
	AnimationSettingsName,
	AnimationSettingsNamesByType,
}
