// tslint:disable:no-magic-numbers no-any

import { FunctionsOf, Overwrite, SettingsNamesByTypeBase } from '../types'

interface AnimationSettings {
	readonly refreshCanvas: boolean,
	readonly [_: string]: any,
}

type AnimationSettingsFunctions = FunctionsOf<AnimationSettings>

type AnimationSettingsName = 'animationSettings'

type AnimationSettingsNamesByType = Overwrite<SettingsNamesByTypeBase, {
	BooleanTypedSettingsNames: 'refreshCanvas',
}>

export {
	AnimationSettings,
	AnimationSettingsFunctions,
	AnimationSettingsName,
	AnimationSettingsNamesByType,
}
