// tslint:disable:max-file-line-count max-line-length

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U;

enum _SettingsPathBrand {}

type SettingsPath = _SettingsPathBrand & SettingsStep[]

enum _SettingsStepBrand {}

type SettingsStep = _SettingsStepBrand & string;

interface SettingNamesToPathsMap { [ index: string ]: SettingsPath }

interface BuildSettingNamesToPathsMapParams {
	// tslint:disable-next-line:no-any
	settings?: any,
	settingsPath?: SettingsPath,
}

export {
	SettingsPath,
	SettingsStep,
	SettingNamesToPathsMap,
	BuildSettingNamesToPathsMapParams,
	Overwrite,
}
