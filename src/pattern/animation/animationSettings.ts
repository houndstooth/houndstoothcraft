// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface AnimationSettings {
	readonly refreshCanvas: boolean,
	readonly [_: string]: any,
}

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

const DEFAULT_REFRESH_CANVAS: boolean = true

const DEFAULT_ANIMATION_SETTINGS: AnimationSettings = {
	refreshCanvas: DEFAULT_REFRESH_CANVAS,
}

type AnimationSettingsName = 'animationSettings'

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
}>

export {
	AnimationSettings,
	AnimationSettingsFunctions,
	DEFAULT_ANIMATION_SETTINGS,
	AnimationSettingsName,
	AnimationSettingsNamesByType,
}
