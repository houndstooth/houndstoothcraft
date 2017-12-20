import { FullSettingPath, SettingPath } from '../../setting'

interface AppendOverrideParams {
	options: OverrideOptions,
	override: HTMLElement,
	settingPath: SettingPath
}

interface CreateOverrideParams extends FullSettingPath {
	options: OverrideOptions
}

interface CreateOverrideTextParams extends FullSettingPath {
	maybeMark: (_: FullSettingPath) => string,
}

interface OverrideOptions {
	grandparents: HTMLElement[],
	parent: HTMLElement,
}

export {
	OverrideOptions,
	AppendOverrideParams,
	CreateOverrideParams,
	CreateOverrideTextParams,
}
