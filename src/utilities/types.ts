import { SettingsFunction } from '../execute'

type NullarySideEffector = () => void

type NullaryVoidPromise = () => Promise<void>

type CouldBeSettingsFunctionObject = Array<{
	settingName: string,
	// tslint:disable-next-line:no-any
	settingsFunction: SettingsFunction<any>,
	settingsPath: string[],
}>

export {
	CouldBeSettingsFunctionObject,
	NullarySideEffector,
	NullaryVoidPromise,
}
