import { SettingsStep } from '../store'

type FunctionsOf<T> = { [P in keyof T]?: (previousLayerOrFrame?: number) => T[P] }

interface Layer extends Number {
	// tslint:disable-next-line:no-any
	_LayerBrand: any
}

interface SettingsFunctionObject {
	settingName: SettingsStep,
	settingsFunction: <T>(p: T) => T,
	settingsPath: SettingsStep[]
}

export {
	FunctionsOf,
	Layer,
	SettingsFunctionObject,
}
