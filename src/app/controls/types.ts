// tslint:disable:no-any

import { NamedEffect, Pattern } from '../../pattern'
import { InputElement } from '../dom'
import { FullSettingsPath } from '../execute'
import { SettingsPath } from '../settings'

interface BuildEffectToggleClickHandlerParams {
	checkbox: InputElement,
	houndstoothEffect: NamedEffect
}

interface CheckSettingForConflict extends FullSettingsPath, SettingConflictCheck {
}

interface PatternsHaveConflictsParams {
	readonly pattern?: Pattern,
	readonly patternCheckingAgainst?: Pattern,
	readonly settingsPath?: SettingsPath,
}

interface SettingConflictCheck {
	readonly setting: any,
	readonly settingCheckingForConflict: any,
}

export {
	BuildEffectToggleClickHandlerParams,
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
}
