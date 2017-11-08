// tslint:disable:no-any

import { FullSettingsPath } from '../execute'

interface BuildWarningMessageParams extends FullSettingsPath, SettingOverride {
}

interface SettingOverride {
	readonly existingSetting: any,
	readonly overridingSetting: any,
}

interface ShouldWarnAboutConflictsParams extends SettingOverride {
	readonly warnAboutConflicts: boolean,
}

interface MaybeWarnAboutConflictsParams extends FullSettingsPath, ShouldWarnAboutConflictsParams {
}

export {
	BuildWarningMessageParams,
	MaybeWarnAboutConflictsParams,
	ShouldWarnAboutConflictsParams,
}
