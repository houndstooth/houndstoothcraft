// tslint:disable:no-any

import { Pattern } from '../../pattern'
import { FullSettingsPath } from '../execute'
import { SettingsPath } from '../settings'

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
	CheckSettingForConflict,
	PatternsHaveConflictsParams,
	SettingConflictCheck,
}
