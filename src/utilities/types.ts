import { SettingsFunction } from '../app'

type ConditionFunction = () => boolean

type NullaryVoidPromise = () => Promise<void>

type CouldBeSettingsFunctionObject = Array<{
	settingName: string,
	// tslint:disable-next-line:no-any
	settingsFunction: SettingsFunction<any>,
	settingsPath: string[],
}>

export {
	ConditionFunction,
	CouldBeSettingsFunctionObject,
	NullaryVoidPromise,
}
