import { SettingFunction } from '../app'

type CouldBeSettingFunctionObject = Array<{
	// tslint:disable-next-line:no-any
	settingFunction: SettingFunction<any>,
	settingName: string,
	settingPath: string[],
}>

interface ObjectOf<T> { [_: string]: T }

export {
	ObjectOf,
	CouldBeSettingFunctionObject,
}
