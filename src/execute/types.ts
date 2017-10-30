import { Effect, SettingsPath, SettingsStep } from '../store'

interface ComposeMainHoundstooth {
	houndstoothEffects?: Effect[],
	houndstoothOverrides?: Effect,
	logComposedMainHoundstooth?: boolean,
}

type FunctionsOf<T> = { [P in keyof T]: (previous?: T[P]) => T[P] }

interface Layer extends Number {
	// tslint:disable-next-line:no-any
	_LayerBrand: any,
}

interface SettingsFunctionObject {
	readonly settingName: SettingsStep,
	readonly settingsFunction: <T>(p: T) => T,
	readonly settingsPath: SettingsPath,
}

export {
	ComposeMainHoundstooth,
	FunctionsOf,
	Layer,
	SettingsFunctionObject,
}
