import { SettingsFunction } from '../app'

type CouldBeSettingsFunctionObject = Array<{
	settingName: string,
	// tslint:disable-next-line:no-any
	settingsFunction: SettingsFunction<any>,
	settingsPath: string[],
}>

interface ObjectOf<T> { [_: string]: T }

export {
	ObjectOf,
	CouldBeSettingsFunctionObject,
}
