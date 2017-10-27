import { SettingsStep } from '../store'

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
	Layer,
	SettingsFunctionObject,
}