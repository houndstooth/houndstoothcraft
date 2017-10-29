import { SettingsStep } from '../store'

type FunctionsOf<T> = { [P in keyof T]: (previous?: T[P]) => T[P] }

interface Layer extends Number {
	// tslint:disable-next-line:no-any
	_LayerBrand: any,
}

interface SettingsFunctionObject {
	readonly settingName: SettingsStep,
	readonly settingsFunction: <T>(p: T) => T,
	readonly settingsPath: SettingsStep[],
}

export {
	FunctionsOf,
	Layer,
	SettingsFunctionObject,
}
