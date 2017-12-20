import { Effect, Pattern } from '../../../types'
import { SettingPath } from '../types'

interface ComposePatternParams {
	patternDefaults: Pattern,
	patternEffects?: Pattern,
	patternOverrides?: Pattern,
	patternToCompose: Pattern,
}

// tslint:disable-next-line:no-any
type GetEffectSetting = (_: { concatenatedFullSettingPath: SettingPath, effect: Effect }) => any

export {
	ComposePatternParams,
	GetEffectSetting,
}
